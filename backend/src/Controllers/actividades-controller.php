<?php
namespace App\Controllers;

use PDO;
use Exception;
require_once __DIR__ . '/../../vendor/autoload.php';
use App\Database\QuerysActividades;
use App\Core\AuthContext;

class ActividadesController {

    // ==================== ACTIVIDADES ====================

    public function obtenerTodasLasActividades($pool){
        try {
            $actividadModel = new QuerysActividades($pool);
            $actividades = $actividadModel->obtenerTodasLasActividades();
            
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "actividades" => $actividades
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al obtener las actividades: " . $e->getMessage()
            ]);
        }
    }

    public function crearActividadDeportiva($pool){
        try {
            $datos = json_decode(file_get_contents('php://input'), true);
            
            $actividadModel = new QuerysActividades($pool);
            $actividadModel->crearActividadDeportiva($datos);
            
            http_response_code(201);
            echo json_encode([
                "status" => "success",
                "message" => "Actividad deportiva creada exitosamente"
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al crear la actividad deportiva: " . $e->getMessage()
            ]);
        }
    }

    public function crearActividadCultural($pool){
        try {
            $datos = json_decode(file_get_contents('php://input'), true);
            
            $actividadModel = new QuerysActividades($pool);
            $actividadModel->crearActividadCultural($datos);
            
            http_response_code(201);
            echo json_encode([
                "status" => "success",
                "message" => "Actividad cultural creada exitosamente"
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al crear la actividad cultural: " . $e->getMessage()
            ]);
        }
    }

    public function actualizarActividad($pool, $id_actividad, $tipo_actividad){
        try {
            $datos = json_decode(file_get_contents('php://input'), true);
            $datos['id_actividad'] = $id_actividad;
            
            $actividadModel = new QuerysActividades($pool);
            $actividadModel->actualizarActividad($datos, $tipo_actividad);
            
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Actividad actualizada exitosamente"
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al actualizar la actividad: " . $e->getMessage()
            ]);
        }
    }

    // ==================== INSCRIPCIONES ====================

    public function inscribirUsuarioActividad($pool, $id_actividad){
        $id_usuario = AuthContext::obtenerIdUsuario();
        try {
            $actividadModel = new QuerysActividades($pool);
            $actividadModel->inscribirUsuarioActividadQuery($id_usuario, $id_actividad);
            
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Inscripción realizada exitosamente"
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al inscribirse en la actividad: " . $e->getMessage()
            ]);
        }
    }

    public function desinscribirUsuarioActividad($pool, $id_actividad){
        $id_usuario = AuthContext::obtenerIdUsuario();
        try {
            $actividadModel = new QuerysActividades($pool);
            $actividadModel->desinscribirUsuarioActividadQuery($id_usuario, $id_actividad);
            
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Desinscripción realizada exitosamente"
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al desinscribirse de la actividad: " . $e->getMessage()
            ]);
        }
    }

    public function obtenerInscripcionesPorActividad($pool, $id_actividad){
        try {
            $actividadModel = new QuerysActividades($pool);
            $inscripciones = $actividadModel->obtenerInscripcionesPorActividadQuery($id_actividad);
            
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "inscripciones" => $inscripciones
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al obtener las inscripciones: " . $e->getMessage()
            ]);
        }
    }

    public function obtenerInscripcionesPorUsuario($pool){
        $id_usuario = AuthContext::obtenerIdUsuario();
        try {
            $actividadModel = new QuerysActividades($pool);
            $inscripciones = $actividadModel->obtenerInscripcionesPorUsuarioActividadQuery($id_usuario);
            
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "inscripciones" => $inscripciones
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al obtener las inscripciones del usuario: " . $e->getMessage()
            ]);
        }
    }

    public function verificarInscripcionUsuario($pool, $id_actividad){
        $id_usuario = AuthContext::obtenerIdUsuario();
        try {
            $actividadModel = new QuerysActividades($pool);
            $inscripcion = $actividadModel->verificarInscripcionUsuarioActividadQuery($id_usuario, $id_actividad);
            
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "inscrito" => $inscripcion ? true : false,
                "inscripcion" => $inscripcion
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al verificar la inscripción: " . $e->getMessage()
            ]);
        }
    }
}
