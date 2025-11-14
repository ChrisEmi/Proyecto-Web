<?php
namespace App\Controllers;
use PDO;
use Exception;
require_once __DIR__ . '/../../vendor/autoload.php';
use Firebase\JWT\JWT;
use App\Database\QuerysEventos;
use App\Core\AuthContext;

class EventoController {
    public function crearEvento($pool){
        $id_organizador = AuthContext::obtenerIdUsuario();
        try {
            $datos = json_decode(file_get_contents('php://input'), true);
            $datos['id_organizador'] = $id_organizador;
            $datos['id_evento'] = bin2hex(random_bytes(8));

            $eventoModel = new QuerysEventos($pool);
            $eventoModel->crearEventoQuery($datos);
            http_response_code(201);
            echo json_encode([
                "status" => "success",
                "message" => "Evento creado exitosamente"
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => $e->getMessage()
            ]);
        }
    }

    

    public function actualizarEvento($pool, $id_evento){
        try {
            $datos = json_decode(file_get_contents('php://input'), true);

            $eventoModel = new QuerysEventos($pool);
            $eventoModel->actualizarEventoQuery($datos, $id_evento);
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Evento actualizado exitosamente"
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al actualizar el evento"
            ]);
        }
    }

    public function obtenerEventos($pool, $ordenar_por, $direccion){
        try {
            $eventoModel = new QuerysEventos($pool);
            $eventos = $eventoModel->obtenerEventosQuery($ordenar_por, $direccion);
            

            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "eventos" => $eventos
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al obtener los eventos"
            ]);
        }
    }

    public function inscribirUsuarioEvento($pool, $id_evento){
        $id_usuario = AuthContext::obtenerIdUsuario();
        try {
            if (!$id_evento) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "ID del evento es requerido"
                ]);
                return;
            }

            $eventoModel = new QuerysEventos($pool);
            $eventoModel->inscribirUsuarioEventoQuery($id_usuario, $id_evento);
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Inscripcion al evento exitosa"
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al inscribir al usuario al evento"
            ]);
        }
    }

    public function desinscribirUsuarioEvento($pool, $id_evento){
        $id_usuario = AuthContext::obtenerIdUsuario();
        try {
            if (!$id_evento) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "ID del evento es requerido"
                ]);
                return;
            }

            $eventoModel = new QuerysEventos($pool);
            $eventoModel->desinscribirUsuarioEventoQuery($id_usuario, $id_evento);
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Desinscripcion del evento exitosa"
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al desinscribir al usuario del evento"
            ]);
        }
    }

    public function obtenerEventoPorId($pool, $id_evento){
        try {
            $eventoModel = new QuerysEventos($pool);
            $evento = $eventoModel->obtenerEventoPorIdQuery($id_evento);

            if ($evento) {
                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "evento" => $evento
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "status" => "error",
                    "message" => "Evento no encontrado"
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al obtener el evento"
            ]);
        }
    }

    public function obtenerEventosPorOrganizador($pool){
        $id_organizador = AuthContext::obtenerIdUsuario();

        try {
            $ordenar_por = $_GET['ordenar_por'] ?? 'fecha';
            $direccion = $_GET['direccion'] ?? 'DESC';

            $eventoModel = new QuerysEventos($pool);
            $eventos = $eventoModel->obtenerEventosPorOrganizadorQuery($id_organizador, $ordenar_por, $direccion);

            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "data" => $eventos
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al obtener los eventos del organizador"
            ]);
        }
    }

    public function obtenerEventosPorUsuario($pool){
        $id_usuario = AuthContext::obtenerIdUsuario();

        try {
            $ordenar_por = $_GET['ordenar_por'] ?? 'fecha';
            $direccion = $_GET['direccion'] ?? 'DESC';

            $eventoModel = new QuerysEventos($pool);
            $eventos = $eventoModel->obtenerEventosPorUsuarioQuery($id_usuario, $ordenar_por, $direccion);

            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "eventos" => $eventos
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al obtener los eventos del organizador"
            ]);
        }
    }

    public function obtenerInscripcionesPorEvento($pool, $id_evento){
        try {
            $datos = json_decode(file_get_contents('php://input'), true);
            $id_evento = $datos['id_evento'];

            if (!$id_evento) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "ID del evento es requerido"
                ]);
                return;
            }

            $eventoModel = new QuerysEventos($pool);
            $inscripciones = $eventoModel->obtenerInscripcionesPorEventoQuery($id_evento);

            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "inscripciones" => $inscripciones
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al obtener las inscripciones del evento"
            ]);
        }
    }

    public function obtenerInscripcionesPorUsuario($pool){
        $id_usuario = AuthContext::obtenerIdUsuario();
        try {
            $eventoModel = new QuerysEventos($pool);
            $inscripciones = $eventoModel->obtenerInscripcionesPorUsuarioQuery($id_usuario);

            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "data" => $inscripciones
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al obtener las inscripciones del evento"
            ]);
        }
    }



    
}

?>