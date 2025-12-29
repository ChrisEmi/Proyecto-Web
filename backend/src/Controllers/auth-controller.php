<?php
namespace App\Controllers;
use PDO;
use Exception;
require_once __DIR__ . '/../../vendor/autoload.php';
use Firebase\JWT\JWT;
use App\Database\QuerysAuth;
use App\Core\AuthContext;

class AuthController {
    private function jwt($id, $correo) {
        $token = array(
            "data" => [
                "id_usuario" => $id,
                "correo" => $correo,
            ],
            "iat" => time(),
            "exp" => time() + (60 * 60 * 24) 
        );
        
        $secret = $_ENV['JWT_SECRET'];
        $jwt = JWT::encode($token, $secret, 'HS256'); 
        return $jwt;
    }

    public function login($pool) {
        try {
            $datos = json_decode(file_get_contents('php://input'), true);
            $correo = $datos['correo'] ?? null;
            $contrasena = $datos['contrasena'] ?? null;
            
            if (!$correo || !$contrasena) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "Correo y contrasena son requeridos"
                ]);
                return;
            }

            $usuarioModel = new QuerysAuth($pool);
            $usuario = $usuarioModel->buscarPorCorreo($correo);
            
            if ($usuario && password_verify($contrasena, $usuario['contrasena'])) {
                unset($usuario['contrasena']);
                $jwt = $this->jwt($usuario['id_usuario'], $correo);


                setcookie("token", $jwt, [
                    'expires' => time() + (60 * 60 * 24), 
                    'path' => '/',
                    'domain' => '', 
                    'httponly' => true,     
                    'samesite' => 'Lax' 
                ]);

                http_response_code(200);
                echo json_encode([
                    "status" => "success",
                    "usuario" => [
                        "id_usuario" => $usuario['id_usuario'],
                        "nombre_tipo" => $usuario['rol'],
                        "nombre" => $usuario['nombre'] ?? '',
                        "apellido_paterno" => $usuario['apellido_paterno'] ?? '',
                        "apellido_materno" => $usuario['apellido_materno'] ?? '',
                    ]
                ]);

            } else {
                http_response_code(401);
                echo json_encode([
                    "status" => "error",
                    "message" => "Credenciales invalidas"
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error interno del servidor: " . $e->getMessage()
            ]);
        }
    }

    public function registro($pool) {
        try {
            $usuarioModel = new QuerysAuth($pool);

            $datos = json_decode(file_get_contents('php://input'), true);
            $id_usuario = bin2hex(random_bytes(8));
            $datos_estudiante = [
                'id_usuario' => $id_usuario,
                'nombre' => $datos['nombre'],
                'apellido_paterno' => $datos['apellido_paterno'],
                'apellido_materno' => $datos['apellido_materno'] ?? null,
                'correo' => $datos['correo'],
                'contrasena' => $datos['contrasena'],
                'confirmar_contrasena' => $datos['confirmar_contrasena'],
                'contrasena_hashed' => password_hash($datos['contrasena'], PASSWORD_BCRYPT),
                'boleta' => $datos['boleta'],
            ];
            if($datos['contrasena'] !== $datos['confirmar_contrasena']){
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "Las contraseñas no coinciden"
                ]);
                return;
            }else{
                if ($datos_estudiante['nombre'] && $datos_estudiante['correo'] && $datos_estudiante['contrasena']) {
                    if (strlen($datos_estudiante['contrasena']) < 8) {
                        http_response_code(400);
                        echo json_encode([
                            "status" => "error",
                            "message" => "La contrasena debe tener al menos 8 caracteres"
                        ]);
                        return;
                    }

                    $usuarioCorreo = $usuarioModel->buscarPorCorreo($datos_estudiante['correo']);

                    if ($usuarioCorreo) {
                        http_response_code(400);
                        echo json_encode([
                            "status" => "error",
                            "message" => "El correo ya esta registrado"
                        ]);
                        return;
                    }
                    try {
                        $usuarioBoleta = $usuarioModel->buscarPorBoleta($datos_estudiante['boleta']);
                        if ($usuarioBoleta) {
                            http_response_code(400);
                            echo json_encode([
                                "status" => "error",
                                "message" => "Ya existe una cuenta con esa boleta"
                            ]);
                            return;
                        }
                        
                        if ($datos_estudiante['boleta']) {
                            $usuarioModel->crearUsuario($datos_estudiante);
                            $this->login($pool);
                        } else {
                            http_response_code(400);
                            echo json_encode([
                                "status" => "error",
                                "message" => "La boleta es requerida para el registro"
                            ]);
                            return;
                        }
                    } catch (Exception $e) {
                        http_response_code(500);
                        echo json_encode([
                            "status" => "error",
                            "message" => "Error al registrar usuario: " . $e->getMessage()
                        ]);
                    }
                } else {
                    http_response_code(400);
                    echo json_encode([
                        "status" => "error",
                        "message" => "Faltan datos requeridos (nombre, correo y contraseña)"
                    ]);
                }
            }
            
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error interno del servidor: " . $e->getMessage()
            ]);
        }
    }
    public function logout() {
        try {

            setcookie("token", "", [
                'expires' => time() - 3600,
                'path' => '/',
                'domain' => '',
                'secure' => true, 
                'httponly' => false,
                'samesite' => 'None'
            ]);

            if (isset($_COOKIE['token'])) {
                unset($_COOKIE['token']);
            }

            echo json_encode([
                "message" => "Sesion cerrada exitosamente",
                "timestamp" => date('Y-m-d H:i')
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error interno del servidor: " . $e->getMessage()
            ]);
        }
    }

    public function verificarTokenCookie($pool) {
        try {
            $usuarioModel = new QuerysAuth($pool);
            $token = $_COOKIE['token'] ?? null;
            if (!$token) {
                http_response_code(401);
                echo json_encode([
                    "status" => "error",
                    "message" => "Token no encontrado en cookies"
                ]);
                return;
            }
            $secret = $_ENV['JWT_SECRET'];

            try{
                $decoded = JWT::decode($token, new \Firebase\JWT\Key($secret, 'HS256'));
                $data = (array)($decoded->data ?? []);
                $idUsuario = $data['id_usuario'] ?? null;

                $usuarioRol = $usuarioModel->buscarRolporId($idUsuario);

                if ($usuarioRol) {
                    http_response_code(200);
                    echo json_encode([
                        "status" => "success",
                        "usuario" => $usuarioRol
                    ]);
                } else {
                    http_response_code(404);
                    echo json_encode([
                        "status" => "error",
                        "message" => "Error en la verificación del token: usuario no encontrado"
                    ]);
                }
            } catch (Exception $e) {
                http_response_code(401);
                echo json_encode([
                    "status" => "error",
                    "message" => "Token inválido: " . $e->getMessage()
                ]);
            }

        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error interno del servidor: " . $e->getMessage()
            ]);
        }
    }


    public function recuperarPassword($pool) {
        // Lógica de recuperación de contraseña
    }
}

?>