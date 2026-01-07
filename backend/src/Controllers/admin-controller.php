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

    public function eliminarEvento($pool, $id_evento) {
        try {
            if (!$id_evento) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "ID de evento no proporcionado"
                ]);
                return;
            }

            $eventoModel = new QuerysAdmin($pool);
            $eventoModel->eliminarEventoQuery($id_evento);

            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Evento eliminado exitosamente"
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al eliminar el evento: " . $e->getMessage()
            ]);
        }
    }
    
    public function obtenerEventosAdmin($pool, $ordenar_por = 'fecha', $direccion = 'DESC', $estado = '') {

        try {
            $query = new QuerysAdmin($pool);
            $eventos = $query->obtenerEventosAdminQuery($ordenar_por, $direccion, $estado);
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "eventos" => $eventos
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al obtener los eventos: " . $e->getMessage()
            ]);
        }
    }

    public function banearDesbanearUsuario($pool, $id_usuario) {
        try {
            $input = json_decode(file_get_contents("php://input"), true);
            
            if (!isset($input['nuevo_estado'])) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "El nuevo estado es requerido"
                ]);
                return;
            }

            $nuevo_estado = $input['nuevo_estado'];
            
            // Validar que el estado sea válido
            if (!in_array($nuevo_estado, ['Activo', 'Baneado', 'Desactivado'])) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "Estado no válido. Debe ser 'Activo', 'Baneado' o 'Desactivado'"
                ]);
                return;
            }

            $query = new QuerysAdmin($pool);
            $query->banearDesbanearUsuarioQuery($id_usuario, $nuevo_estado);

            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => $nuevo_estado === 'Baneado' ? "Usuario baneado exitosamente" : "Usuario desbaneado exitosamente"
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al actualizar el estado del usuario: " . $e->getMessage()
            ]);
        }
    }

    public function obtenerDatosPerfilAdmin($pool, $id_usuario) {
        try {
            $query = new QuerysAdmin($pool);
            $perfil = $query->obtenerDatosPerfilAdminQuery($id_usuario);

            if (!$perfil) {
                http_response_code(404);
                echo json_encode([
                    "status" => "error",
                    "message" => "Usuario no encontrado"
                ]);
                return;
            }

            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "perfil" => $perfil
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al obtener el perfil del usuario: " . $e->getMessage()
            ]);
        }
    }

    public function obtenerInscripcionesUsuario($pool, $id_usuario) {
        try {
            $query = new QuerysAdmin($pool);
            $inscripciones = $query->obtenerEventosInscritosPorUsuarioQuery($id_usuario);

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

    public function obtenerEventosOrganizador($pool, $id_usuario) {
        try {
            $query = new QuerysAdmin($pool);
            $eventos = $query->obtenerEventosCreadosPorUsuarioQuery($id_usuario);

            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "eventos" => $eventos
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al obtener los eventos del organizador: " . $e->getMessage()
            ]);
        }
    }
}


?>