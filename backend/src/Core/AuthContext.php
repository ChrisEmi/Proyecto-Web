<?php
namespace App\Core;

class AuthContext {
    private static $usuario = null;

    public static function setUsuario($usuario) {
        self::$usuario = $usuario;
    }

    public static function obtenerUsuario() {
        return self::$usuario;
    }

    public static function obtenerIdUsuario() {
        return self::$usuario['id_usuario'] ?? null;
    }
}

?>
