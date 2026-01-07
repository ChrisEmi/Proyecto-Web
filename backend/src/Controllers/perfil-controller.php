<?php
namespace App\Controllers;
use App\Core\AuthContext;

class PerfilController {
    public function obtenerPerfilAlumno($pool){
        $id_usuario = AuthContext::obtenerIdUsuario();
        $perfilModel = new \App\Database\QuerysPerfil($pool);
        $perfil = $perfilModel->alumnoPerfil($id_usuario);
        
        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "perfil" => $perfil
        ]);
    }

    public function actualizarPerfilAlumno($pool){
        try {
            $id_usuario = AuthContext::obtenerIdUsuario();
            $data = json_decode(file_get_contents('php://input'), true);
            
            $perfilModel = new \App\Database\QuerysPerfil($pool);
            $perfilModel->actualizarAlumnoPerfil($data, $id_usuario);
            
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Perfil actualizado exitosamente"
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al actualizar el perfil: " . $e->getMessage()
            ]);
        }
    }

    public function obtenerPerfilOrganizador($pool){
        $id_usuario = AuthContext::obtenerIdUsuario();
        $perfilModel = new \App\Database\QuerysPerfil($pool);
        $perfil = $perfilModel->organizadorPerfil($id_usuario);
        
        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "perfil" => $perfil
        ]);
    }

    public function actualizarPerfilOrganizador($pool){
        try {
            $id_usuario = AuthContext::obtenerIdUsuario();
            $data = json_decode(file_get_contents('php://input'), true);
            
            $perfilModel = new \App\Database\QuerysPerfil($pool);
            $perfilModel->actualizarOrganizadorPerfil($data, $id_usuario);
            
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Perfil actualizado exitosamente"
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al actualizar el perfil: " . $e->getMessage()
            ]);
        }
    }

    public function obtenerPerfilAdmin($pool){
        $id_usuario = AuthContext::obtenerIdUsuario();
        $perfilModel = new \App\Database\QuerysPerfil($pool);
        $perfil = $perfilModel->adminPerfil($id_usuario);
        
        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "perfil" => $perfil
        ]);
    }

    public function actualizarPerfilAdmin($pool){
        try {
            $id_usuario = AuthContext::obtenerIdUsuario();
            $data = json_decode(file_get_contents('php://input'), true);
            
            $perfilModel = new \App\Database\QuerysPerfil($pool);
            $perfilModel->actualizarAdminPerfil($data, $id_usuario);
            
            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Perfil actualizado exitosamente"
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al actualizar el perfil: " . $e->getMessage()
            ]);
        }
    }

    public function cambiarConfiguracionNotificaciones($pool, int $preferencias){
        try {
            $id_usuario = AuthContext::obtenerIdUsuario();

            $perfilModel = new \App\Database\QuerysPerfil($pool);
            $perfilModel->cambiarPreferenciasNotificaciones($id_usuario, $preferencias);

            http_response_code(200);
            echo json_encode([
                "status" => "success",
                "message" => "Configuración de notificaciones actualizada exitosamente"
            ]);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al actualizar la configuración de notificaciones: " . $e->getMessage()
            ]);
        }
    }
}

?>