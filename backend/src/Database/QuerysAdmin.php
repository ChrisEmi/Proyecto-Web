<?php
namespace App\Database;

use PDO;
use Exception;

class QuerysAdmin
{
    private $pool; 

    public function __construct(PDO $pool)
    {
        $this->pool = $pool;
    }

    public function obtenerUsuariosPorRol(string $rol){
        $stmt = $this->pool->prepare(
            "SELECT u.id_usuario, u.nombre, u.correo, tu.nombre_tipo, u.estado, u.apellido_paterno
             FROM Usuario u
             INNER JOIN TipoUsuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario
             WHERE tu.nombre_tipo IN (:rol)"
        );
        $stmt->bindParam(':rol', $rol);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function crearOrganizadorQuery(array $data){
        $sql1 = "INSERT INTO Usuario(id_usuario, nombre, apellido_paterno, apellido_materno, correo, contraseña, id_tipo_usuario) VALUES (:id_usuario, :nombre, :apellido_paterno, :apellido_materno, :correo, :contrasena, 2)";
        $sql2 = "INSERT INTO Organizador(id_usuario, empresa) VALUES (:id_usuario, :empresa)";

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
            $stmt2->bindParam(':id_usuario', $data['id_usuario']);
            $stmt2->bindParam(':empresa', $data['empresa'] ?? null);
            $stmt2->execute();

            $this->pool->commit();

        } catch (\Exception $e) {
            $this->pool->rollBack();
            throw new \Exception("Error al crear usuario: " . $e->getMessage());
        }
    }

    public function crearAdministradorQuery(array $data){
        $sql1 = "INSERT INTO Usuario(id_usuario, nombre, apellido_paterno, apellido_materno, correo, contraseña, id_tipo_usuario) VALUES (:id_usuario, :nombre, :apellido_paterno, :apellido_materno, :correo, :contrasena, 3)";

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

            $this->pool->commit();

        } catch (\Exception $e) {
            $this->pool->rollBack();
            throw new \Exception("Error al crear usuario: " . $e->getMessage());
        }
    }
}