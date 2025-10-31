<?php
namespace App\Controllers;

use PDO;
use Exception;
require_once __DIR__ . '/../../vendor/autoload.php';


class AdminController {
    private function contrasenaAleatoria($longitud = 8) {
        $caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $contrasena = '';
        for ($i = 0; $i < $longitud; $i++) {
            $contrasena .= $caracteres[random_int(0, strlen($caracteres) - 1)];
        }
        return $contrasena;
    }


    public function obtenerUsuarios($pool) {
        try {
            $stmt = $pool->prepare(
                "SELECT u.id_usuario, u.nombre, u.correo, tu.nombre_tipo
                 FROM Usuario u
                 INNER JOIN TipoUsuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario"
            );
            $stmt->execute();
            $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "data" => $usuarios
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al obtener los usuarios: " . $e->getMessage()
            ]);
        }
    }

    public function crearUsuario($pool) {
        try {
            $datos = json_decode(file_get_contents("php://input"), true);
            $contrasena = $this->contrasenaAleatoria();
            $id_usuario = bin2hex(random_bytes(8));

            $stmt = $pool->prepare("SELECT id_usuario FROM Usuario WHERE correo = :correo");
            $stmt->bindParam(':correo', $datos['correo']);
            $stmt->execute();
            
            if ($stmt->fetch()) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "El correo ya esta registrado"
                ]);
                return;
            }

            $stmt = $pool->prepare(
                "INSERT INTO Usuario (id_usuario, nombre, apellido, correo, contraseña, id_tipo_usuario)
                 VALUES (:id_usuario, :nombre, :apellido, :correo, :contrasena, :id_tipo_usuario)"
            );
            $stmt->bindParam(':id_usuario', $id_usuario);
            $stmt->bindParam(':nombre', $datos['nombre']);
            $stmt->bindParam(':apellido', $datos['apellido']);
            $stmt->bindParam(':correo', $datos['correo']);
            $hashedPassword = password_hash($contrasena, PASSWORD_BCRYPT);
            $stmt->bindParam(':contrasena', $hashedPassword);
            $stmt->bindParam(':id_tipo_usuario', $datos['id_tipo_usuario']);
            $stmt->execute();
            
            http_response_code(201);
            echo json_encode([
                "status" => "success",
                "message" => "Usuario creado exitosamente",
                "id_usuario" => $id_usuario,
                "contrasena temporal" => $contrasena
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al crear el usuario: " . $e->getMessage()
            ]);
        }
    }
}


?>