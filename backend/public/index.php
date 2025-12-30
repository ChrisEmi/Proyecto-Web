<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

require_once __DIR__ . '/../vendor/autoload.php';

// Cargar variables de entorno PRIMERO
$envPath = __DIR__ . '/../.env';
if (is_readable($envPath)) {
    $envVars = parse_ini_file($envPath);
    if ($envVars) {
        foreach ($envVars as $name => $value) {
            putenv("$name=$value");
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$router = new \Bramus\Router\Router();
require_once __DIR__ . '/../src/Routes/auth-routes.php';
auth_routes($router);

require_once __DIR__ . '/../src/Routes/evento-routes.php';
evento_routes($router);

require_once __DIR__ . '/../src/Routes/admin-routes.php';
admin_routes($router);

require_once __DIR__ . '/../src/Routes/perfil-routes.php';
perfil_routes($router);

require_once __DIR__ . '/../src/Routes/actividades-routes.php';
\App\Routes\actividades_routes($router);

$router->run();

?>