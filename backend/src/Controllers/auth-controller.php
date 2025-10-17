<?php
namespace App\Controllers;
use PDO;
use Exception;
require_once __DIR__ . '/../../vendor/autoload.php';
use Firebase\JWT\JWT;

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
        if (isset($_COOKIE['token'])) {
            http_response_code(401);
            echo json_encode(["message" => "Sesion ya iniciada", "token" => $_COOKIE['token']]);
            return;
        }
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
            
            $stmt = $pool->prepare("SELECT correo, contraseña AS contrasena, id_usuario FROM Usuario WHERE correo = :correo");
            $stmt->bindParam(':correo', $correo);
            $stmt->execute();
            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($usuario && password_verify($contrasena, $usuario['contrasena'])) {
                unset($usuario['contrasena']);
                $jwt = $this->jwt($usuario['id_usuario'], $correo);

                setcookie("token", $jwt, [
                    'expires' => time() + (60 * 60 * 24), 
                    'path' => '/',
                    'domain' => '', 
                    'secure' => false,    
                    'httponly' => true,     
                    'samesite' => 'Lax' 
                ]);


                echo json_encode([
                    "status" => "success",
                    "message" => "Login exitoso",
                    "usuario" => $usuario
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
        if (isset($_COOKIE['token'])) {
            http_response_code(401);
            echo json_encode(["message" => "Sesion ya iniciada", "token" => $_COOKIE['token']]);

        } else {
            try {
                $datos = json_decode(file_get_contents('php://input'), true);
                
                $nombre = $datos['nombre'] ?? null;
                $apellidos = $datos['apellidos'] ?? null;
                $correo = $datos['correo'] ?? null;
                $contrasena = $datos['contrasena'] ?? null;
                $boleta = $datos['boleta'] ?? null;
                
                if ($nombre && $correo && $contrasena) {
                    if (strlen($contrasena) < 8) {
                        http_response_code(400);
                        echo json_encode([
                            "status" => "error",
                            "message" => "La contrasena debe tener al menos 8 caracteres"
                        ]);
                        return;
                    }

                    $contrasena_hash = password_hash($contrasena, PASSWORD_BCRYPT);

                    $stmt = $pool->prepare("SELECT id_usuario FROM Usuario WHERE correo = :correo");
                    $stmt->bindParam(':correo', $correo);
                    $stmt->execute();
                    
                    if ($stmt->fetch()) {
                        http_response_code(400);
                        echo json_encode([
                            "status" => "error",
                            "message" => "El correo ya esta registrado"
                        ]);
                        return;
                    }

                    $id_usuario = bin2hex(random_bytes(8)); 
                    $pool->beginTransaction();
                    try {
                        if ($boleta) {
                            $stmt1 = $pool->prepare("INSERT INTO Usuario(id_usuario, nombre, apellido, correo, contraseña, id_tipo_usuario) VALUES (:id_usuario, :nombre, :apellido, :correo, :contrasena, 1)");
                            $stmt1->bindParam(':id_usuario', $id_usuario);
                            $stmt1->bindParam(':nombre', $nombre);
                            $stmt1->bindParam(':apellido', $apellidos);
                            $stmt1->bindParam(':correo', $correo);
                            $stmt1->bindParam(':contrasena', $contrasena_hash);
                            $stmt1->execute();
                            
                            $stmt2 = $pool->prepare("INSERT INTO Estudiante(id_usuario, boleta) VALUES (:id_usuario, :boleta)");
                            $stmt2->bindParam(':id_usuario', $id_usuario);
                            $stmt2->bindParam(':boleta', $boleta);
                            $stmt2->execute();
                            
                            $pool->commit();
                            
                            $this->login($pool);
                        }
                        else {
                                http_response_code(500);
                                echo json_encode([
                                    "status" => "error",
                                    "message" => "El registro solo es para estudiantes"
                                ]);

                        }
                    } catch (Exception $e) {
                        $pool->rollBack();
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
            } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error interno del servidor: " . $e->getMessage()
            ]);
        }
    }
    }
    public function logout() {
        try {

            setcookie("token", "", [
                'expires' => time() - 3600,
                'path' => '/',
                'domain' => '',
                'secure' => false, 
                'httponly' => true,
                'samesite' => 'Lax'
            ]);

            // Eliminar de la superglobal para el request actual
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
    public function recuperarPassword($pool) {
        // Lógica de recuperación de contraseña
    }
}

?>