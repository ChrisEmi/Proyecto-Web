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
                "message" => "Error al crear el evento"
            ]);
        }
    }

    public function actualizarEvento($pool){
        try {
            $datos = json_decode(file_get_contents('php://input'), true);

            $eventoModel = new QuerysEventos($pool);
            $eventoModel->actualizarEventoQuery($datos);
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

    public function obtenerEventos($pool){
        try {
            $ordenar_por = $_GET['ordenar_por'] ?? 'fecha';
            $direccion = $_GET['direccion'] ?? 'DESC';

            $eventoModel = new QuerysEventos($pool);
            $eventos = $eventoModel->obtenerEventosQuery($ordenar_por, $direccion);
            

            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "data" => $eventos
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al obtener los eventos"
            ]);
        }
    }

    
}

?>