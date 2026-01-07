<?php
namespace App\Database;

use PDO;
use Exception;

class QuerysAuth
{
    private $pool; 

    public function __construct(PDO $pool)
    {
        $this->pool = $pool;
    }

    public function buscarPorCorreo(string $correo)
    {
        $sql = "SELECT u.correo, u.contraseña AS contrasena, u.id_usuario, u.nombre, u.apellido_paterno, u.apellido_materno, tu.nombre_tipo AS rol, u.estado, u.recuperacion_token, u.recuperacion_exp
                FROM Usuario u
                INNER JOIN TipoUsuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario 
                WHERE u.correo = :correo";

        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':correo', $correo);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function buscarPorBoleta(string $boleta){
        $stmtB = $this->pool->prepare("SELECT * FROM Estudiante WHERE boleta = :boleta");
        $stmtB->bindParam(':boleta', $boleta);
        $stmtB->execute();
        return $stmtB->fetch(PDO::FETCH_ASSOC);
    }

    public function crearUsuario(array $data)
    {
        $sql1 = "INSERT INTO Usuario(id_usuario, nombre, apellido_paterno, apellido_materno, correo, contraseña, id_tipo_usuario) VALUES (:id_usuario, :nombre, :apellido_paterno, :apellido_materno, :correo, :contrasena, 1)";
        $sql2 = "INSERT INTO Estudiante(boleta, id_usuario) VALUES (:boleta, :id_usuario)";

        $this->pool->beginTransaction();
        try {
            $stmt1 = $this->pool->prepare($sql1);
            $stmt1->bindParam(':id_usuario', $data['id_usuario']);
            $stmt1->bindParam(':nombre', $data['nombre']);
            $stmt1->bindParam(':apellido_paterno', $data['apellido_paterno']);
            $stmt1->bindParam(':apellido_materno', $data['apellido_materno']);
            $stmt1->bindParam(':correo', $data['correo']);
            $stmt1->bindParam(':contrasena', $data['contrasena_hashed']);
            $stmt1->execute();

            $stmt2 = $this->pool->prepare($sql2);
            $stmt2->bindParam(':boleta', $data['boleta']);
            $stmt2->bindParam(':id_usuario', $data['id_usuario']);
            $stmt2->execute();

            $this->pool->commit();

        } catch (\Exception $e) {
            $this->pool->rollBack();
            throw new \Exception("Error al crear usuario: " . $e->getMessage());
        }
    }

    public function buscarRolporId(string $id_usuario)
    {
        $sql = "SELECT tu.nombre_tipo, u.nombre, u.apellido_paterno, u.foto_src
                FROM Usuario u
                INNER JOIN TipoUsuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario 
                WHERE u.id_usuario = :id_usuario";

        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function obtenerCorreoPorId(string $id_usuario)
    {
        $sql = "SELECT correo, nombre, apellido_paterno, config_notificacion FROM Usuario WHERE id_usuario = :id_usuario";

        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    

    public function tokenRecuperarContrasena($id_usuario, $token) {
        $fecha_expiracion = date('Y-m-d H:i:s', strtotime('+1 hour'));
        
        $sql = "UPDATE Usuario SET recuperacion_token = :token, recuperacion_exp = :fecha_expiracion WHERE id_usuario = :id_usuario";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':token', $token);
        $stmt->bindParam(':fecha_expiracion', $fecha_expiracion);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        return $stmt->rowCount();
    }

    

    public function cambiarContrasena($id_usuario, $nuevaContrasena) {
        $hashedPassword = password_hash($nuevaContrasena, PASSWORD_BCRYPT);

        $sql = "UPDATE Usuario SET contraseña = :contrasena WHERE id_usuario = :id_usuario";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':contrasena', $hashedPassword);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        return $stmt->rowCount();
    }
    
    public function buscarPorTokenRecuperacion($token) {
        $sql = "SELECT id_usuario, nombre, correo, recuperacion_token, recuperacion_exp
                FROM Usuario 
                WHERE recuperacion_token = :token";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':token', $token);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    public function limpiarTokenRecuperacion($id_usuario) {
        $sql = "UPDATE Usuario SET recuperacion_token = NULL, recuperacion_exp = NULL WHERE id_usuario = :id_usuario";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        return $stmt->rowCount();
    }

    public function buscarPorId($id_usuario) {
        $sql = "SELECT id_usuario, correo, contraseña AS contrasena, nombre, apellido_paterno
                FROM Usuario 
                WHERE id_usuario = :id_usuario";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

}