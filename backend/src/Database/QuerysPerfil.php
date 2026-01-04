<?php
namespace App\Database;
use PDO;
use Exception;

class QuerysPerfil{
    private $pool;

    public function __construct($pool){
        $this->pool = $pool;
    }

    public function alumnoPerfil($id_usuario){
        $sql = "SELECT * FROM VW_AlumnoPerfil WHERE id_usuario = :id_usuario";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function organizadorPerfil($id_usuario){
        $sql = "SELECT * FROM VW_OrganizadorPerfil WHERE id_usuario = :id_usuario";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function adminPerfil($id_usuario){
        $sql = "SELECT * FROM VW_AdminPerfil WHERE id_usuario = :id_usuario";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function actualizarAlumnoPerfil($data, $id_usuario){

        $this->pool->beginTransaction();

        try {
            $sql1 = "UPDATE Usuario SET nombre = :nombre, apellido_paterno = :apellido_paterno, apellido_materno = :apellido_materno, telefono = :telefono, foto_src = :foto_src WHERE id_usuario = :id_usuario";
            $stmt = $this->pool->prepare($sql1);
            $stmt->bindParam(':nombre', $data['nombre']);
            $stmt->bindParam(':apellido_paterno', $data['apellido_paterno']);
            $stmt->bindParam(':apellido_materno', $data['apellido_materno']);
            $stmt->bindParam(':telefono', $data['telefono']);
            $stmt->bindParam(':foto_src', $data['foto_src']);
            $stmt->bindParam(':id_usuario', $id_usuario);
            $stmt->execute();

            $sql2 = "UPDATE Estudiante SET carrera = :carrera, semestre = :semestre WHERE id_usuario = :id_usuario";
            $stmt = $this->pool->prepare($sql2);
            $stmt->bindParam(':carrera', $data['carrera']);
            $stmt->bindParam(':semestre', $data['semestre']);
            $stmt->bindParam(':id_usuario', $id_usuario);
            $stmt->execute();

            $this->pool->commit();

        } catch (Exception $e) {
            $this->pool->rollBack();
            throw $e;
        }
    }

    public function actualizarOrganizadorPerfil($data, $id_usuario){
        
        $this->pool->beginTransaction();

        try {
            $sql1 = "UPDATE Usuario SET nombre = :nombre, apellido_paterno = :apellido_paterno, apellido_materno = :apellido_materno, telefono = :telefono, foto_src = :foto_src WHERE id_usuario = :id_usuario";
            $stmt = $this->pool->prepare($sql1);
            $stmt->bindParam(':nombre', $data['nombre']);
            $stmt->bindParam(':apellido_paterno', $data['apellido_paterno']);
            $stmt->bindParam(':apellido_materno', $data['apellido_materno']);
            $stmt->bindParam(':telefono', $data['telefono']);
            $stmt->bindParam(':foto_src', $data['foto_src']);
            $stmt->bindParam(':id_usuario', $id_usuario);
            $stmt->execute();
            $this->pool->commit();

        } catch (Exception $e) {
            $this->pool->rollBack();
            throw $e;
        }
    }

    public function actualizarAdminPerfil($data, $id_usuario){
        
        $this->pool->beginTransaction();

        try {
            $sql1 = "UPDATE Usuario SET nombre = :nombre, apellido_paterno = :apellido_paterno, apellido_materno = :apellido_materno, telefono = :telefono, foto_src = :foto_src WHERE id_usuario = :id_usuario";
            $stmt = $this->pool->prepare($sql1);
            $stmt->bindParam(':nombre', $data['nombre']);
            $stmt->bindParam(':apellido_paterno', $data['apellido_paterno']);
            $stmt->bindParam(':apellido_materno', $data['apellido_materno']);
            $stmt->bindParam(':telefono', $data['telefono']);
            $stmt->bindParam(':foto_src', $data['foto_src']);
            $stmt->bindParam(':id_usuario', $id_usuario);
            $stmt->execute();
            $this->pool->commit();

        } catch (Exception $e) {
            $this->pool->rollBack();
            throw $e;
        }
    }

    public function verificarContrasena($id_usuario, $contrasenaActual) {
        
        $sql = "SELECT contrasena FROM Usuario WHERE id_usuario = :id_usuario";
        $stmt = $this->pool->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->execute();
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($resultado && password_verify($contrasenaActual, $resultado['contrasena'])) {
            return true;
        } else {
            return false;
        }
    }

}

?>