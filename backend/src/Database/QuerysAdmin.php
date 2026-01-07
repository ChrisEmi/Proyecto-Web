<?php
namespace App\Database;

use PDO;
use Exception;

class QuerysAdmin
{
    private $pool; 

    public function __construct(PDO $pool)
    {
        $this->pool = $pool;
    }

    private function imagenesTagsPorEvento(array $eventos) {
        if(empty($eventos)){
            return [];
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

    public function obtenerUsuariosPorRol($rol = '', $ordenar_por = 'nombre', $direccion = 'ASC'){
        $columnas_validas = [
            'nombre' => 'u.nombre',
            'apellido_paterno' => 'u.apellido_paterno',
        ];
        $roles_validos = ['Estudiante', 'Organizador', 'Administrador'];
        $direcciones_validas = (strtoupper($direccion) === 'ASC') ? 'ASC' : 'DESC';

        $sql = "SELECT u.id_usuario, u.nombre, u.correo, tu.nombre_tipo, u.estado, u.apellido_paterno, u.apellido_materno, u.fecha_creacion
             FROM Usuario u
             INNER JOIN TipoUsuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario";
        
        $usarFiltroRol = $rol && in_array($rol, $roles_validos);
        
        if ($usarFiltroRol) {
            $sql .= " WHERE tu.nombre_tipo = :rol";
        }
        
        $sql .= " ORDER BY " . $columnas_validas[$ordenar_por] . " " . $direcciones_validas;
        
        $stmt = $this->pool->prepare($sql);
        if ($usarFiltroRol) {
            $stmt->bindParam(':rol', $rol);
        }
        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function crearOrganizadorQuery(array $data){
        $sql1 = "INSERT INTO Usuario(id_usuario, nombre, apellido_paterno, apellido_materno, correo, contraseña, id_tipo_usuario) VALUES (:id_usuario, :nombre, :apellido_paterno, :apellido_materno, :correo, :contrasena, 2)";
        $sql2 = "INSERT INTO Organizador(id_usuario, empresa) VALUES (:id_usuario, :empresa)";

        $this->pool->beginTransaction();
        try {
            $stmt1 = $this->pool->prepare($sql1);
            $stmt1->bindParam(':id_usuario', $data['id_usuario']);
            $stmt1->bindParam(':nombre', $data['nombre']);
            $stmt1->bindParam(':apellido_paterno', $data['apellido_paterno']);
            $stmt1->bindParam(':apellido_materno', $data['apellido_materno']);
            $stmt1->bindParam(':correo', $data['correo']);
            $stmt1->bindParam(':contrasena', $data['contrasena_hashed']);
            $stmt1->execute();

            $empresa = $data['empresa'] ?? null;
            $stmt2 = $this->pool->prepare($sql2);
            $stmt2->bindParam(':id_usuario', $data['id_usuario']);
            $stmt2->bindParam(':empresa', $empresa);
            $stmt2->execute();

            $this->pool->commit();

        } catch (\Exception $e) {
            $this->pool->rollBack();
            throw new \Exception("Error al crear usuario: " . $e->getMessage());
        }
    }

    public function crearAdministradorQuery(array $data){
        $sql1 = "INSERT INTO Usuario(id_usuario, nombre, apellido_paterno, apellido_materno, correo, contraseña, id_tipo_usuario) VALUES (:id_usuario, :nombre, :apellido_paterno, :apellido_materno, :correo, :contrasena, 3)";

        $this->pool->beginTransaction();
        try {
            $stmt1 = $this->pool->prepare($sql1);
            $stmt1->bindParam(':id_usuario', $data['id_usuario']);
            $stmt1->bindParam(':nombre', $data['nombre']);
            $stmt1->bindParam(':apellido_paterno', $data['apellido_paterno']);
            $stmt1->bindParam(':apellido_materno', $data['apellido_materno']);
            $stmt1->bindParam(':correo', $data['correo']);
            $stmt1->bindParam(':contrasena', $data['contrasena_hashed']);
            $stmt1->execute();

            $this->pool->commit();

        } catch (\Exception $e) {
            $this->pool->rollBack();
            throw new \Exception("Error al crear usuario: " . $e->getMessage());
        }
    }

    public function eliminarEventoQuery($id_evento){
        $this->pool->beginTransaction();
        
        try {
            $sql1 = "DELETE FROM InscripcionEvento WHERE id_evento = :id_evento";
            $stmt1 = $this->pool->prepare($sql1);
            $stmt1->bindParam(':id_evento', $id_evento, PDO::PARAM_STR);
            $stmt1->execute();
            error_log("InscripcionEvento eliminadas: " . $stmt1->rowCount());

            $sql3 = "DELETE FROM TagsEvento WHERE id_evento = :id_evento";
            $stmt3 = $this->pool->prepare($sql3);
            $stmt3->bindParam(':id_evento', $id_evento, PDO::PARAM_STR);
            $stmt3->execute();
            error_log("TagsEvento eliminados: " . $stmt3->rowCount());

            $sql4 = "DELETE FROM EventoImagen WHERE id_evento = :id_evento";
            $stmt4 = $this->pool->prepare($sql4);
            $stmt4->bindParam(':id_evento', $id_evento, PDO::PARAM_STR);
            $stmt4->execute();
            error_log("EventoImagen eliminadas: " . $stmt4->rowCount());

            $sql5 = "DELETE FROM Evento WHERE id_evento = :id_evento";
            $stmt5 = $this->pool->prepare($sql5);
            $stmt5->bindParam(':id_evento', $id_evento, PDO::PARAM_STR);
            $stmt5->execute();
            $rowsDeleted = $stmt5->rowCount();
            error_log("Evento eliminado: " . $rowsDeleted);

            if ($rowsDeleted === 0) {
                throw new \Exception("No se encontró el evento con ID: " . $id_evento);
            }

            $this->pool->commit();
        } catch (\Exception $e) {
            $this->pool->rollBack();
            throw new \Exception("Error al eliminar evento: " . $e->getMessage());
        }
    }
    public function obtenerInscripcionesPorUsuarioQuery($id_usuario){
        $sql = "SELECT ie.*, e.titulo_evento, e.fecha_evento, e.hora_evento, e.ubicacion_evento
                FROM InscripcionEvento ie
                INNER JOIN Evento e ON ie.id_evento = e.id_evento
                WHERE ie.id_usuario = :id_usuario
                ORDER BY e.fecha_evento";

        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obtenerEventosPorUsuarioQuery($id_usuario){
        $sql = "SELECT e.*, c.nombre_categoria 
                FROM Evento e
                INNER JOIN Categoria c ON e.id_categoria = c.id_categoria
                WHERE e.id_organizador = :id_usuario
                ORDER BY e.fecha DESC";

        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        $eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $res = $this->imagenesTagsPorEvento($eventos);

        return $res;
    }

    public function banearDesbanearUsuarioQuery($id_usuario, $nuevo_estado){
        $sql = "UPDATE Usuario SET estado = :nuevo_estado WHERE id_usuario = :id_usuario";

        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':nuevo_estado', $nuevo_estado);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
    }

    public function obtenerEventosAdminQuery($ordenar_por = 'fecha', $direccion = 'DESC', $estado = ''){
        $columnas_validas = [
            'titulo' => 'e.titulo_evento', 
            'fecha' => 'e.fecha',
            'organizador' => 'o.empresa',
            'categoria' => 'c.nombre_categoria',
            'ubicacion' => 'e.ubicacion',
            'fecha_creacion' => 'e.fecha_creacion'
        ];
        $direcciones_validas = (strtoupper($direccion) === 'ASC') ? 'ASC' : 'DESC';
        if ($estado === 'Verificado') {
            $estadoFiltro = " WHERE e.estado = 'Verificado'";
        } elseif ($estado === 'Pendiente de revision') {
            $estadoFiltro = " WHERE e.estado = 'Pendiente de revision'";
        } elseif ($estado === 'Pasado') {
            $estadoFiltro = " WHERE e.estado = 'Pasado'";
            
        } else {
            $estadoFiltro = '';
        }

        $sql = "SELECT e.*, o.empresa, c.nombre_categoria FROM Evento e
                INNER JOIN Organizador o ON e.id_organizador = o.id_usuario
                INNER JOIN Categoria c ON e.id_categoria = c.id_categoria";
        if ($estado) {
            $sql .= $estadoFiltro;
        }
        $sql .= " ORDER BY " . $columnas_validas[$ordenar_por] . " " . $direcciones_validas;

        $stmt = $this->pool->prepare($sql);
        $stmt->execute();
        $eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $res = $this->imagenesTagsPorEvento($eventos);

        return $res;
    }
    


    public function obtenerDatosPerfilAdminQuery($id_usuario){
        $sql = "SELECT u.id_usuario, u.nombre, u.apellido_paterno, u.apellido_materno, u.correo, tu.nombre_tipo, u.estado
             FROM Usuario u
             INNER JOIN TipoUsuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario
             WHERE u.id_usuario = :id_usuario";

        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function obtenerEventosInscritosPorUsuarioQuery($id_usuario){
        $sql = "SELECT e.*, c.nombre_categoria, ie.fecha_inscripcion 
                FROM InscripcionEvento ie
                INNER JOIN Evento e ON ie.id_evento = e.id_evento
                INNER JOIN Categoria c ON e.id_categoria = c.id_categoria
                WHERE ie.id_usuario = :id_usuario
                ORDER BY ie.fecha_inscripcion DESC";

        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        $eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $res = $this->imagenesTagsPorEvento($eventos);

        return $res;
    }

    public function obtenerEventosCreadosPorUsuarioQuery($id_usuario){
        $sql = "SELECT e.*, c.nombre_categoria 
                FROM Evento e
                INNER JOIN Categoria c ON e.id_categoria = c.id_categoria
                WHERE e.id_organizador = :id_usuario
                ORDER BY e.fecha DESC";

        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        $eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $res = $this->imagenesTagsPorEvento($eventos);

        return $res;
    }

    
}