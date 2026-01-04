<?php
namespace App\Controllers;
use PDO;
use Exception;
require_once __DIR__ . '/../../vendor/autoload.php';
use Firebase\JWT\JWT;
use App\Database\QuerysEventos;
use App\Database\QuerysAuth;
use App\Core\AuthContext;
use App\Services\CorreoService;

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
                "message" => "Evento creado exitosamente",
                "eventoCreado" => $datos
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => $e->getMessage(),
                "trace" => $e->getTraceAsString()
            ]);
        }
    }

    

    public function actualizarEvento($pool, $id_evento){
        try {
            $datos = json_decode(file_get_contents('php://input'), true);
            error_log("Datos recibidos en actualizarEvento: " . print_r($datos, true));

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
                "message" => "Error al actualizar el evento: " . $e->getMessage(),
                "trace" => $e->getTraceAsString()
            ]);
        }
    }

    public function obtenerEventos($pool, $ordenar_por, $direccion, $categoria){
        try {
            $eventoModel = new QuerysEventos($pool);
            $eventos = $eventoModel->obtenerEventosQuery($ordenar_por, $direccion, $categoria);
            

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

            try {
                $eventos = $eventoModel->obtenerEventoPorIdQuery($id_evento);
                $evento = $eventos[0] ?? null;
                $usuarioModel = new QuerysAuth($pool);
                $usuario = $usuarioModel->obtenerCorreoPorId($id_usuario);
                $res = $evento;
                
                if ($evento && $id_usuario && !empty($usuario['correo'])) {
                    $emailService = new CorreoService();
                    
                    // Formatear fechas
                    $fechaInicio = !empty($evento['fecha']) ? date('d \d\e F, Y', strtotime($evento['fecha'])) : '';
                    $fechaFinal = !empty($evento['fecha_final']) ? date('d \d\e F, Y', strtotime($evento['fecha_final'])) : '';
                    $horaEvento = !empty($evento['fecha']) ? date('H:i', strtotime($evento['fecha'])) : '';
                    
                    $resultadoEmail = $emailService->enviarNotificacionEvento(
                        $usuario['correo'], 
                        [
                            'nombre_usuario' => $usuario['nombre'] ?? 'Estudiante',
                            'titulo_evento' => $evento['titulo_evento'] ?? '',
                            'descripcion_evento' => $evento['descripcion'] ?? '',
                            'fecha_inicio' => $fechaInicio,
                            'fecha_final' => $fechaFinal,
                            'hora_evento' => $horaEvento,
                            'lugar_evento' => $evento['ubicacion'] ?? '',
                            'imagen_evento' => !empty($evento['imagenes']) ? $evento['imagenes'][0]['src'] : 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop',
                            'url_evento' => "http://localhost:5173/eventos/{$id_evento}"
                        ]
                    );
                    error_log("Resultado envío email: " . json_encode($resultadoEmail));
                    http_response_code(200);
                    echo json_encode([
                        "status" => "success",
                        "message" => "Inscripcion al evento exitosa",
                        "res" => $res

                    ]);
                    error_log("Destinatario: " . $usuario['correo']);
                }
            } catch (Exception $emailError) {
                error_log("Error al enviar email de confirmación: " . $emailError->getMessage());
                http_response_code(401);
                echo json_encode([
                    "status" => "error",
                    "message" => "Error al enviar email de confirmación" . $emailError->getMessage()
                ]);
            }

            
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
                "message" => "Inscripción al evento cancelada exitosamente"
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

    public function obtenerEventosPorOrganizador($pool, $ordenar_por, $direccion){
        $id_organizador = AuthContext::obtenerIdUsuario();

        try {

            $eventoModel = new QuerysEventos($pool);
            $eventos = $eventoModel->obtenerEventosPorOrganizadorQuery($id_organizador, $ordenar_por, $direccion);

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

    public function obtenerEventosPorUsuario($pool, $ordenar_por, $direccion){
        $id_usuario = AuthContext::obtenerIdUsuario();

        try {
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

    public function verificarInscripcion($pool, $id_evento){
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
            $inscripcion = $eventoModel->verificarInscripcionUsuarioEventoQuery($id_usuario, $id_evento);

            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "inscrito" => $inscripcion ? true : false
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al verificar la inscripcion del usuario al evento"
            ]);
        }
    }



    
}

?>