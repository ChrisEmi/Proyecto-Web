<?php
namespace App\Middlewares;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/../../vendor/autoload.php';
use App\Core\Database;


class AdminMiddleware {
    private function esAdmin($id_usuario, $pool) {
        try {
            $stmt = $pool->prepare("SELECT COUNT(*) FROM Usuario WHERE id_usuario = :id_usuario AND id_tipo_usuario = (SELECT id_tipo_usuario FROM TipoUsuario WHERE nombre_tipo = 'Administrador')");
            $stmt->bindParam(':id_usuario', $id_usuario);
            $stmt->execute();
            return $stmt->fetchColumn() > 0;
        } catch (Exception $e) {
            return false;
        }
    }
    public function handle(callable $next): void {
        try {
            if (!isset($_COOKIE['token']) || empty($_COOKIE['token'])) {
                self::abort(401, 'Token no encontrado en cookies');
                return;
            }

            $token = $_COOKIE['token'];
            $secret = $_ENV['JWT_SECRET'];
            try {
                $decoded = JWT::decode($token, new Key($secret, 'HS256'));
            } catch (Exception $e) {
                self::abort(401, 'Token inválido: ' . $e->getMessage());
                return;
            }
            $data = (array)($decoded->data ?? []);
            $idUsuario = $data['id_usuario'] ?? null;
            $db = Database::getInstance();

            if (!$this->esAdmin($idUsuario, $db)) {
                self::abort(403, 'Acceso prohibido: se requiere rol Administrador');
                return;
            }
            $next();
        } catch (Exception $e) {
            self::abort(500, 'Error del servidor: ' . $e->getMessage());
        }
    }
    private static function abort(int $code, string $message): void {
        http_response_code($code);
        echo json_encode([
            'status' => 'error',
            'message' => $message
        ]);
        exit;
    }
}
?>
