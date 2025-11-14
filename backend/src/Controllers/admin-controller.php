<?php
namespace App\Controllers;

use PDO;
use Exception;
use App\Database\QuerysAdmin;
use App\Database\QuerysAuth;
use App\Database\QuerysEventos;
use App\Core\AuthContext;

class AdminController {
    private function contrasenaAleatoria($longitud = 8) {
        $caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $contrasena = '';
        for ($i = 0; $i < $longitud; $i++) {
            $contrasena .= $caracteres[random_int(0, strlen($caracteres) - 1)];
        }
        return $contrasena;
    }


    public function obtenerUsuarios($pool, $rol, $ordenar_por = 'nombre', $direccion = 'ASC') {
        try {
            $query = new QuerysAdmin($pool);
            $usuarios = $query->obtenerUsuariosPorRol($rol, $ordenar_por, $direccion);

            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "usuarios" => $usuarios
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al obtener los usuarios: " . $e->getMessage()
            ]);
        }
    }

    public function crearOrganizador($pool) {
        try {
            $input = json_decode(file_get_contents("php://input"), true);
            $contrasena = $this->contrasenaAleatoria();
            $id_usuario = bin2hex(random_bytes(8));

            $usuarioModel = new QuerysAuth($pool);

            if ($usuarioModel->buscarPorCorreo($input['correo'])) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "El correo ya esta registrado"
                ]);
                return;
            }

            $datos = [
                'id_usuario' => $id_usuario,
                'nombre' => $input['nombre'],
                'apellido_paterno' => $input['apellido_paterno'],
                'apellido_materno' => $input['apellido_materno'] ?? null,
                'correo' => $input['correo'],
                'contrasena_hashed' => password_hash($contrasena, PASSWORD_BCRYPT),
                'empresa' => $input['empresa'] ?? null,
            ];

            $usuarioModel = new QuerysAdmin($pool);
            $usuarioModel->crearOrganizadorQuery($datos);
            
            http_response_code(201);
            echo json_encode([
                "status" => "success",
                "message" => "Organizador creado exitosamente",
                "id_usuario" => $id_usuario,
                "contrasena_temporal" => $contrasena
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al crear el usuario: " . $e->getMessage()
            ]);
        }
    }

    public function crearAdministrador($pool) {
        try {
            $input = json_decode(file_get_contents("php://input"), true);
            $contrasena = $this->contrasenaAleatoria();
            $id_usuario = bin2hex(random_bytes(8));

            $usuarioModel = new QuerysAuth($pool);

            if ($usuarioModel->buscarPorCorreo($input['correo'])) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "El correo ya esta registrado"
                ]);
                return;
            }

            $datos = [
                'id_usuario' => $id_usuario,
                'nombre' => $input['nombre'],
                'apellido_paterno' => $input['apellido_paterno'],
                'apellido_materno' => $input['apellido_materno'] ?? null,
                'correo' => $input['correo'],
                'contrasena_hashed' => password_hash($contrasena, PASSWORD_BCRYPT),
            ];

            $usuarioModel = new QuerysAdmin($pool);
            $usuarioModel->crearAdministradorQuery($datos);

            http_response_code(201);
            echo json_encode([
                "status" => "success",
                "message" => "Administrador creado exitosamente",
                "id_usuario" => $id_usuario,
                "contrasena_temporal" => $contrasena
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al crear el usuario: " . $e->getMessage()
            ]);
        }
    }

    public function verificarEvento($pool, $id_evento) {
        $id_admin = AuthContext::obtenerIdUsuario();

        try {
            $data = json_decode(file_get_contents("php://input"), true);
            $id_evento = $data['id_evento'] ?? null;

            if (!$id_evento) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "ID de evento no proporcionado"
                ]);
                return;
            }

            $eventoModel = new QuerysEventos($pool);
            $evento = $eventoModel->obtenerEventoPorIdQuery($id_evento);

            if (!$evento) {
                http_response_code(404);
                echo json_encode([
                    "status" => "error",
                    "message" => "Evento no encontrado"
                ]);
                return;
            }

            $eventoModel->actualizarEstadoEventoQuery($id_evento, $id_admin);
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Estado del evento actualizado"
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al verificar el evento: " . $e->getMessage()
            ]);
        }
    }
}


?>