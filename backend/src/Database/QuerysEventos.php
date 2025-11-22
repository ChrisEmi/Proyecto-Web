<?php
namespace App\Database;

use PDO;
use Exception;

class QuerysEventos
{
    private $pool; 

    public function __construct(PDO $pool)
    {
        $this->pool = $pool;
    }

    private function imagenesTagsPorEvento(array $eventos) {
        if(empty($eventos)){
            return;
        }

        $ids_eventos = array_map(fn($evento) => $evento['id_evento'], $eventos);
        $placeholders = implode(',', array_fill(0, count($ids_eventos), '?'));

        $sql_tags = "SELECT id_evento, nombre_tag 
            FROM TagsEvento et
            INNER JOIN Tag t ON et.id_tag = t.id_tag
            WHERE et.id_evento IN ($placeholders)";
        $stmt_tags = $this->pool->prepare($sql_tags);
        $stmt_tags->execute($ids_eventos);
        $tags = $stmt_tags->fetchAll(PDO::FETCH_ASSOC);

        $sql_imagenes = "SELECT id_evento, src, descripcion 
            FROM EventoImagen 
            WHERE id_evento IN ($placeholders)";
        $stmt_imagenes = $this->pool->prepare($sql_imagenes);
        $stmt_imagenes->execute($ids_eventos);
        $imagenes = $stmt_imagenes->fetchAll(PDO::FETCH_ASSOC);

        $tags_por_evento = [];
        foreach ($tags as $tag) {
            $tags_por_evento[$tag['id_evento']][] = $tag['nombre_tag'];
        }


        $imagenes_por_evento = [];
        foreach ($imagenes as $imagen) {
            $imagenes_por_evento[$imagen['id_evento']][] = [
                'src' => $imagen['src'],
                'descripcion' => $imagen['descripcion']
            ];
        }

        foreach ($eventos as &$evento) {
            $evento_id = $evento['id_evento'];
            $evento['tags'] = $tags_por_evento[$evento_id] ?? [];
            $evento['imagenes'] = $imagenes_por_evento[$evento_id] ?? [];
        }

        return $eventos;
        
    }

    public function crearEventoQuery(array $data){
        $this->pool->beginTransaction();
        
        try {
            $sql = "INSERT INTO Evento(id_evento, titulo_evento, descripcion, fecha, ubicacion, id_categoria, cupo, id_organizador) 
                    VALUES (:id_evento, :titulo_evento, :descripcion, CONVERT(DATETIME, :fecha, 120), :ubicacion, :id_categoria, :cupo, :id_organizador)";

            $stmt = $this->pool->prepare($sql);
            $stmt->bindParam(':id_evento', $data['id_evento']);
            $stmt->bindParam(':titulo_evento', $data['titulo_evento']);
            $stmt->bindParam(':descripcion', $data['descripcion']);
            $stmt->bindParam(':fecha', $data['fecha']);
            $stmt->bindParam(':ubicacion', $data['ubicacion']);
            $stmt->bindParam(':id_categoria', $data['id_categoria'], \PDO::PARAM_INT);
            $stmt->bindParam(':cupo', $data['cupo'], \PDO::PARAM_INT);
            $stmt->bindParam(':id_organizador', $data['id_organizador']);
            $stmt->execute();

            if (!empty($data['tags']) && is_array($data['tags'])) {
                $sql_tags = "INSERT INTO TagsEvento (id_evento, id_tag) VALUES (:id_evento, :id_tag)";
                $stmt_tags = $this->pool->prepare($sql_tags);

                foreach ($data['tags'] as $nombre_tag) {
                    $id_tag = $this->crearTagSiNoExiste($nombre_tag);
                    $stmt_tags->bindParam(':id_evento', $data['id_evento']);
                    $stmt_tags->bindParam(':id_tag', $id_tag);
                    $stmt_tags->execute();
                }
            }

            
            if (!empty($data['imagenes']) && is_array($data['imagenes'])) {
                $sql_imgs = "INSERT INTO EventoImagen (id_evento, src, descripcion) VALUES (:id_evento, :src, :descripcion)";
                $stmt_imgs = $this->pool->prepare($sql_imgs);
                
                foreach ($data['imagenes'] as $imagen) {
                    $stmt_imgs->bindParam(':id_evento', $data['id_evento']);
                    $stmt_imgs->bindParam(':src', $imagen['src']);
                    $stmt_imgs->bindParam(':descripcion', $imagen['descripcion']);
                    $stmt_imgs->execute();
                }
            }
            $this->pool->commit();

        } catch (\Exception $e) {
            
            $this->pool->rollBack();
            throw new \Exception("Error al crear evento: " . $e->getMessage());
        }
    }

    

    public function actualizarEventoQuery(array $data, string $id_evento){
        $this->pool->beginTransaction();

        try {
            $sql = "UPDATE Evento 
                    SET titulo_evento = :titulo_evento, descripcion = :descripcion, fecha = :fecha, 
                        estado = :estado, ubicacion = :ubicacion, cupo = :cupo, id_categoria = :id_categoria
                    WHERE id_evento = :id_evento";

            $stmt = $this->pool->prepare($sql);
            $stmt->bindParam(':id_evento', $id_evento);
            $stmt->bindParam(':titulo_evento', $data['titulo_evento']);
            $stmt->bindParam(':descripcion', $data['descripcion']);
            $stmt->bindParam(':fecha', $data['fecha']);
            $stmt->bindParam(':estado', $data['estado']);
            $stmt->bindParam(':ubicacion', $data['ubicacion']);
            $stmt->bindParam(':cupo', $data['cupo']);
            $stmt->bindParam(':id_categoria', $data['id_categoria']);
            $stmt->execute();


            $stmt_del_tags = $this->pool->prepare("DELETE FROM TagsEvento WHERE id_evento = :id_evento");
            $stmt_del_tags->bindParam(':id_evento', $data['id_evento']);
            $stmt_del_tags->execute();

            if (!empty($data['tags']) && is_array($data['tags'])) {
                $sql_tags = "INSERT INTO TagsEvento (id_evento, id_tag) VALUES (:id_evento, :id_tag)";
                $stmt_tags = $this->pool->prepare($sql_tags);

                foreach ($data['tags'] as $nombre_tag) {
                    $id_tag = $this->crearTagSiNoExiste($nombre_tag);
                    $stmt_tags->bindParam(':id_evento', $data['id_evento']);
                    $stmt_tags->bindParam(':id_tag', $id_tag);
                    $stmt_tags->execute();
                }
            }
            
            
            $stmt_del_imgs = $this->pool->prepare("DELETE FROM EventoImagen WHERE id_evento = :id_evento");
            $stmt_del_imgs->bindParam(':id_evento', $data['id_evento']);
            $stmt_del_imgs->execute();

            if (!empty($data['imagenes']) && is_array($data['imagenes'])) {
                $sql_imgs = "INSERT INTO EventoImagen (id_evento, src, descripcion) VALUES (:id_evento, :src, :descripcion)";
                $stmt_imgs = $this->pool->prepare($sql_imgs);
                
                foreach ($data['imagenes'] as $imagen) {
                    $stmt_imgs->bindParam(':id_evento', $data['id_evento']);
                    $stmt_imgs->bindParam(':src', $imagen['src']);
                    $stmt_imgs->bindParam(':descripcion', $imagen['descripcion']);
                    $stmt_imgs->execute();
                }
            }
            $this->pool->commit();

        } catch (\Exception $e) {
            $this->pool->rollBack();
            throw new \Exception("Error al actualizar evento: " . $e->getMessage());
        }
    }

    public function obtenerEventosQuery($ordenar_por = 'fecha', $direccion = 'DESC'){
        $columnas_validas = [
            'titulo' => 'e.titulo_evento', 
            'fecha' => 'e.fecha',
            'organizador' => 'o.empresa',
            'categoria' => 'c.nombre_categoria',
            'ubicacion' => 'e.ubicacion',
            'fecha_creacion' => 'e.fecha_creacion'
        ];
        $direcciones_validas = (strtoupper($direccion) === 'ASC') ? 'ASC' : 'DESC';

        $sql = "SELECT e.*, o.empresa, c.nombre_categoria FROM Evento e
                INNER JOIN Organizador o ON e.id_organizador = o.id_usuario
                INNER JOIN Categoria c ON e.id_categoria = c.id_categoria";
        $sql .= " ORDER BY " . $columnas_validas[$ordenar_por] . " " . $direcciones_validas;

        $stmt = $this->pool->prepare($sql);
        $stmt->execute();
        $eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $res = $this->imagenesTagsPorEvento($eventos);

        return $res;
    }

    public function obtenerEventoPorIdQuery($id_evento){
        $sql = "SELECT e.*, o.empresa, c.nombre_categoria FROM Evento e
                INNER JOIN Organizador o ON e.id_organizador = o.id_usuario
                INNER JOIN Categoria c ON e.id_categoria = c.id_categoria
                WHERE e.id_evento = :id_evento";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_evento', $id_evento);
        $stmt->execute();
        $evento = $stmt->fetch(PDO::FETCH_ASSOC);

        $res = $this->imagenesTagsPorEvento([$evento]);

        return $res;
    }

    public function obtenerEventosPorUsuarioQuery($id_usuario, $ordenar_por = 'fecha', $direccion = 'DESC'){
        $columnas_validas = [
            'titulo' => 'e.titulo_evento', 
            'fecha' => 'e.fecha',
            'organizador' => 'o.empresa',
            'categoria' => 'c.nombre_categoria',
            'ubicacion' => 'e.ubicacion'
        ];
        $direcciones_validas = (strtoupper($direccion) === 'ASC') ? 'ASC' : 'DESC';

        $sql = "SELECT e.id_evento, e.titulo_evento, e.fecha, e.ubicacion, ie.fecha_inscripcion AS fecha_inscripcion, o.empresa, c.nombre_categoria, ie.estado FROM Evento e
                INNER JOIN InscripcionEvento ie ON e.id_evento = ie.id_evento
                INNER JOIN Organizador o ON e.id_organizador = o.id_usuario
                INNER JOIN Categoria c ON e.id_categoria = c.id_categoria
                WHERE ie.id_usuario = :id_usuario AND ie.estado = 'Inscrito'";
        $sql .= " ORDER BY " . $columnas_validas[$ordenar_por] . " " . $direcciones_validas;
    
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        $eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $res = $this->imagenesTagsPorEvento($eventos);

        return $res;
    }

    public function obtenerEventosPorOrganizadorQuery($id_usuario, $ordenar_por = 'fecha', $direccion = 'DESC'){
        $columnas_validas = [
            'titulo' => 'e.titulo_evento', 
            'fecha' => 'e.fecha',
            'fecha_creacion' => 'e.fecha_creacion',
            'organizador' => 'o.empresa',
            'categoria' => 'c.nombre_categoria',
            'ubicacion' => 'e.ubicacion'
        ];
        $direcciones_validas = (strtoupper($direccion) === 'ASC') ? 'ASC' : 'DESC';

        $sql = "SELECT e.*, o.empresa, c.nombre_categoria FROM Evento e
                INNER JOIN Organizador o ON e.id_organizador = o.id_usuario
                INNER JOIN Categoria c ON e.id_categoria = c.id_categoria
                WHERE e.id_organizador = :id_usuario";
        $sql .= " ORDER BY " . $columnas_validas[$ordenar_por] . " " . $direcciones_validas;
    
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        $eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $res = $this->imagenesTagsPorEvento($eventos);

        return $res;
    }

    public function actualizarEstadoEventoQuery($id_evento, $id_admin){
        $sql = "UPDATE Evento SET estado = 'Verificado', id_admin = :id_admin WHERE id_evento = :id_evento";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_evento', $id_evento);
        $stmt->bindParam(':id_admin', $id_admin);
        $stmt->execute();
    }

    private function crearTagSiNoExiste($nombre_tag){
        $sql_check = "SELECT id_tag FROM Tag WHERE nombre_tag = :nombre_tag";
        $stmt_check = $this->pool->prepare($sql_check);
        $stmt_check->bindParam(':nombre_tag', $nombre_tag);
        $stmt_check->execute();
        $tag = $stmt_check->fetch(PDO::FETCH_ASSOC);

        if ($tag) {
            return $tag['id_tag'];
        }

        $sql_insert = "INSERT INTO Tag (nombre_tag) VALUES (:nombre_tag)";
        $stmt_insert = $this->pool->prepare($sql_insert);
        $stmt_insert->bindParam(':nombre_tag', $nombre_tag);
        $stmt_insert->execute();

        return $this->pool->lastInsertId();
    }

    public function inscribirUsuarioEventoQuery($id_usuario, $id_evento){
        $sql = "INSERT INTO InscripcionEvento (id_usuario, id_evento) 
                VALUES (:id_usuario, :id_evento)";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->bindParam(':id_evento', $id_evento);
        $stmt->execute();
    }

    public function desinscribirUsuarioEventoQuery($id_usuario, $id_evento){
        $sql = "UPDATE InscripcionEvento SET estado = 'Cancelado' 
                WHERE id_usuario = :id_usuario AND id_evento = :id_evento";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->bindParam(':id_evento', $id_evento);
        $stmt->execute();
    }

    public function obtenerInscripcionesPorEventoQuery($id_evento){
        $sql = "SELECT ie.*, u.nombre, u.apellido_paterno, u.apellido_materno, u.correo FROM InscripcionEvento ie
                INNER JOIN Usuario u ON ie.id_usuario = u.id_usuario
                WHERE ie.id_evento = :id_evento AND ie.estado = 'Activo'";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_evento', $id_evento);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obtenerInscripcionesPorUsuarioQuery($id_usuario){
        $sql = "SELECT e.titulo_evento, e.fecha FROM InscripcionEvento ie
                INNER JOIN Usuario u ON ie.id_usuario = u.id_usuario
                INNER JOIN Evento e ON ie.id_evento = e.id_evento
                WHERE ie.id_usuario = :id_usuario ";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}