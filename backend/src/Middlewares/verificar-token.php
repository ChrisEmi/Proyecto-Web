<?php
namespace App\Middlewares;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class VerificarToken {
    public static function verificarJWT($request) {
        $token = $request->getHeader('Authorization');
        if (!$token) {
            http_response_code(401);
            echo json_encode(["status" => "error", "message" => "Token no proporcionado"]);
            exit;
        }

        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
            $request->user = $decoded->data;
        } catch (\Exception $e) {
            http_response_code(401);
            echo json_encode(["status" => "error", "message" => "Token invalido"]);
            exit;
        }
    }
}

?>