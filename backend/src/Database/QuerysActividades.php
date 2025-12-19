<?php
namespace App\Database;

use PDO;
use Exception;

class QuerysActividades
{
    private $pool; 

    public function __construct(PDO $pool)
    {
        $this->pool = $pool;
    }

    private function horariosPorActividad(array $actividades){ 
        if(empty($actividades)){
            return;
        }

        $ids_actividades = array_map(fn($actividad) => $actividad['id_actividad'], $actividades);
        $placeholders = implode(',', array_fill(0, count($ids_actividades), '?'));

        $sql_horarios = "SELECT id_actividad, dia_semana, hora_inicio, hora_fin 
            FROM HorarioActividad 
            WHERE id_actividad IN ($placeholders)"; 
        $stmt_horarios = $this->pool->prepare($sql_horarios);
        $stmt_horarios->execute($ids_actividades);
        $horarios = $stmt_horarios->fetchAll(PDO::FETCH_ASSOC);

        $horarios_por_actividad = [];
        foreach ($horarios as $horario) {
            $horarios_por_actividad[$horario['id_actividad']][] = [
                'dia_semana' => $horario['dia_semana'],
                'hora_inicio' => $horario['hora_inicio'],
                'hora_fin' => $horario['hora_fin']
            ];
        }

        return $actividades;
    }

    public function obtenerTodasLasActividades(){
        $sql = "SELECT * FROM Actividad";
        $stmt = $this->pool->prepare($sql);
        $stmt->execute();
        $actividades = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $actividades_con_horarios = $this->horariosPorActividad($actividades);

        return $actividades_con_horarios;
    }
        

    public function crearActividadDeportiva(array $data){
        $this->pool->beginTransaction();
        try {
            $sql = "INSERT INTO Actividad(id_tipo_actividad, titulo, descripcion, profesor, genero, icono) 
                    VALUES (1, :titulo, :descripcion, :profesor, :genero, :icono)";

            $stmt = $this->pool->prepare($sql);
            $stmt->bindParam(':titulo', $data['titulo']);
            $stmt->bindParam(':descripcion', $data['descripcion']);
            $stmt->bindParam(':profesor', $data['profesor']);
            $stmt->bindParam(':genero', $data['genero']);
            $stmt->bindParam(':icono', $data['icono']);
            $stmt->execute();

            if (!empty($data['horarios']) && is_array($data['horarios'])) {
                $sql_horario = "INSERT INTO HorarioActividad (id_actividad, dia_semana, hora_inicio, hora_fin) 
                                VALUES (:id_actividad, :dia_semana, CONVERT(TIME, :hora_inicio, 120), CONVERT(TIME, :hora_fin, 120))";
                $stmt_horario = $this->pool->prepare($sql_horario);
                $id_actividad = $this->pool->lastInsertId();

                foreach ($data['horarios'] as $horario) {
                    $stmt_horario->bindParam(':id_actividad', $id_actividad);
                    $stmt_horario->bindParam(':dia_semana', $horario['dia_semana']);
                    $stmt_horario->bindParam(':hora_inicio', $horario['hora_inicio']);
                    $stmt_horario->bindParam(':hora_fin', $horario['hora_fin']);
                    $stmt_horario->execute();
                }
            }
            $this->pool->commit();

        } catch (\Exception $e) {
            
            $this->pool->rollBack();
            throw new \Exception("Error al crear evento: " . $e->getMessage());
        }
    }

    public function crearActividadCultural(array $data){
        $this->pool->beginTransaction();
        try {
            $sql = "INSERT INTO Actividad(id_tipo_actividad, titulo, descripcion, profesor, genero, icono) 
                    VALUES (2, :titulo, :descripcion, :profesor, :genero, :icono)";

            $stmt = $this->pool->prepare($sql);
            $stmt->bindParam(':titulo', $data['titulo']);
            $stmt->bindParam(':descripcion', $data['descripcion']);
            $stmt->bindParam(':profesor', $data['profesor']);
            $stmt->bindParam(':genero', $data['genero']);
            $stmt->bindParam(':icono', $data['icono']);
            $stmt->execute();

            if (!empty($data['horarios']) && is_array($data['horarios'])) {
                $sql_horario = "INSERT INTO HorarioActividad (id_actividad, dia_semana, hora_inicio, hora_fin) 
                                VALUES (:id_actividad, :dia_semana, CONVERT(TIME, :hora_inicio, 120), CONVERT(TIME, :hora_fin, 120))";
                $stmt_horario = $this->pool->prepare($sql_horario);
                $id_actividad = $this->pool->lastInsertId();

                foreach ($data['horarios'] as $horario) {
                    $stmt_horario->bindParam(':id_actividad', $id_actividad);
                    $stmt_horario->bindParam(':dia_semana', $horario['dia_semana']);
                    $stmt_horario->bindParam(':hora_inicio', $horario['hora_inicio']);
                    $stmt_horario->bindParam(':hora_fin', $horario['hora_fin']);
                    $stmt_horario->execute();
                }
            }
            $this->pool->commit();

        } catch (\Exception $e) {
            
            $this->pool->rollBack();
            throw new \Exception("Error al crear evento: " . $e->getMessage());
        }
    }

    

    public function actualizarActividad(array $data, $tipo_actividad){
        $this->pool->beginTransaction();
        try {
            $sql = "UPDATE Actividad 
                    SET titulo = :titulo, descripcion = :descripcion, profesor = :profesor, genero = :genero, icono = :icono
                    WHERE id_actividad = :id_actividad AND id_tipo_actividad = :tipo_actividad";
            $stmt = $this->pool->prepare($sql);
            $stmt->bindParam(':titulo', $data['titulo']);
            $stmt->bindParam(':descripcion', $data['descripcion']);
            $stmt->bindParam(':profesor', $data['profesor']);
            $stmt->bindParam(':genero', $data['genero']);
            $stmt->bindParam(':icono', $data['icono']);
            $stmt->bindParam(':id_actividad', $data['id_actividad']);
            $stmt->bindParam(':tipo_actividad', $tipo_actividad);
            $stmt->execute();

            // Obtener los días que vienen en la actualización
            $dias_nuevos = [];
            if (!empty($data['horarios']) && is_array($data['horarios'])) {
                $dias_nuevos = array_map(fn($h) => $h['dia_semana'], $data['horarios']);
            }

            // Eliminar horarios que ya no están en la lista
            if (!empty($dias_nuevos)) {
                $placeholders = implode(',', array_fill(0, count($dias_nuevos), '?'));
                $sql_delete = "DELETE FROM HorarioActividad 
                               WHERE id_actividad = ? AND dia_semana NOT IN ($placeholders)";
                $stmt_delete = $this->pool->prepare($sql_delete);
                $params = array_merge([$data['id_actividad']], $dias_nuevos);
                $stmt_delete->execute($params);
            } else {
                // Si no hay horarios nuevos, eliminar todos los existentes
                $sql_delete_all = "DELETE FROM HorarioActividad WHERE id_actividad = :id_actividad";
                $stmt_delete_all = $this->pool->prepare($sql_delete_all);
                $stmt_delete_all->bindParam(':id_actividad', $data['id_actividad']);
                $stmt_delete_all->execute();
            }

            // Actualizar o crear horarios
            if (!empty($data['horarios']) && is_array($data['horarios'])) {
                foreach ($data['horarios'] as $horario) {
                    // Verificar si ya existe un horario para ese día
                    $sql_check = "SELECT id_horario FROM HorarioActividad 
                                  WHERE id_actividad = :id_actividad AND dia_semana = :dia_semana";
                    $stmt_check = $this->pool->prepare($sql_check);
                    $stmt_check->bindParam(':id_actividad', $data['id_actividad']);
                    $stmt_check->bindParam(':dia_semana', $horario['dia_semana']);
                    $stmt_check->execute();
                    $horario_existente = $stmt_check->fetch(PDO::FETCH_ASSOC);

                    if ($horario_existente) {
                        $sql_update = "UPDATE HorarioActividad 
                                       SET hora_inicio = CONVERT(TIME, :hora_inicio, 120), 
                                           hora_fin = CONVERT(TIME, :hora_fin, 120)
                                       WHERE id_horario = :id_horario";
                        $stmt_update = $this->pool->prepare($sql_update);
                        $stmt_update->bindParam(':hora_inicio', $horario['hora_inicio']);
                        $stmt_update->bindParam(':hora_fin', $horario['hora_fin']);
                        $stmt_update->bindParam(':id_horario', $horario_existente['id_horario']);
                        $stmt_update->execute();
                    } else {
                        $sql_insert = "INSERT INTO HorarioActividad (id_actividad, dia_semana, hora_inicio, hora_fin) 
                                       VALUES (:id_actividad, :dia_semana, CONVERT(TIME, :hora_inicio, 120), CONVERT(TIME, :hora_fin, 120))";
                        $stmt_insert = $this->pool->prepare($sql_insert);
                        $stmt_insert->bindParam(':id_actividad', $data['id_actividad']);
                        $stmt_insert->bindParam(':dia_semana', $horario['dia_semana']);
                        $stmt_insert->bindParam(':hora_inicio', $horario['hora_inicio']);
                        $stmt_insert->bindParam(':hora_fin', $horario['hora_fin']);
                        $stmt_insert->execute();
                    }
                }
            }

            $this->pool->commit();

        } catch (\Exception $e) {
            $this->pool->rollBack();
            throw new \Exception("Error al actualizar actividad: " . $e->getMessage());
        }
    }


    public function inscribirUsuarioActividadQuery($id_usuario, $id_actividad){
        // Verificar si ya existe una inscripción
        $sql_check = "SELECT id_inscripcion_actividad, estado FROM InscripcionActividad 
                      WHERE id_usuario = :id_usuario AND id_actividad = :id_actividad";
        $stmt_check = $this->pool->prepare($sql_check);
        $stmt_check->bindParam(':id_usuario', $id_usuario);
        $stmt_check->bindParam(':id_actividad', $id_actividad);
        $stmt_check->execute();
        $inscripcion_existente = $stmt_check->fetch(PDO::FETCH_ASSOC);

        if ($inscripcion_existente) {
            $sql = "UPDATE InscripcionActividad SET estado = :estado, fecha_inscripcion = GETDATE() 
                    WHERE id_usuario = :id_usuario AND id_actividad = :id_actividad";
            $stmt = $this->pool->prepare($sql);
            $estado = 'Inscrito';
            $stmt->bindParam(':estado', $estado);
            $stmt->bindParam(':id_usuario', $id_usuario);
            $stmt->bindParam(':id_actividad', $id_actividad);
            $stmt->execute();
        } else {
            // Si no existe, crear nueva inscripción
            $sql = "INSERT INTO InscripcionActividad (id_usuario, id_actividad, estado) 
                    VALUES (:id_usuario, :id_actividad, :estado)";
            $stmt = $this->pool->prepare($sql);
            $estado = 'Inscrito';
            $stmt->bindParam(':id_usuario', $id_usuario);
            $stmt->bindParam(':id_actividad', $id_actividad);
            $stmt->bindParam(':estado', $estado);
            $stmt->execute();
        }
    }

    public function desinscribirUsuarioActividadQuery($id_usuario, $id_actividad){
        $sql = "UPDATE InscripcionActividad SET estado = 'Cancelado' 
                WHERE id_usuario = :id_usuario AND id_actividad = :id_actividad";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->bindParam(':id_actividad', $id_actividad);
        $stmt->execute();
    }

    public function obtenerInscripcionesPorActividadQuery($id_actividad){
        $sql = "SELECT ie.*, u.nombre, u.apellido_paterno, u.apellido_materno, u.correo FROM InscripcionActividad ie
                INNER JOIN Usuario u ON ie.id_usuario = u.id_usuario
                WHERE ie.id_actividad = :id_actividad AND ie.estado = 'Activo'";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_actividad', $id_actividad);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obtenerInscripcionesPorUsuarioActividadQuery($id_usuario){
        $sql = "SELECT e.titulo_actividad, e.fecha FROM InscripcionActividad ie
                INNER JOIN Usuario u ON ie.id_usuario = u.id_usuario
                INNER JOIN Actividad e ON ie.id_actividad = e.id_actividad
                WHERE ie.id_usuario = :id_usuario ";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function verificarInscripcionUsuarioActividadQuery($id_usuario, $id_actividad){
        $sql = "SELECT * FROM InscripcionActividad 
                WHERE id_usuario = :id_usuario AND id_actividad = :id_actividad AND estado = 'Inscrito'";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->bindParam(':id_actividad', $id_actividad);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

}
    
    