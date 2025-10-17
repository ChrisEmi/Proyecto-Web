<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Permitir envío de cookies desde el frontend (fetch/axios con credentials)
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

require_once __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../vendor/autoload.php';

$router = new \Bramus\Router\Router();

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

$router->get('/', function() {
    echo json_encode(["status" => "success", "message" => "API is running"]);
});


// Incluir las rutas de autenticación
require_once __DIR__ . '/../src/Routes/auth-routes.php';
auth_routes($router);


// require_once __DIR__ . '/../src/Routes/evento-routes.php';


// require_once __DIR__ . '/../src/Routes/admin-routes.php';

$router->run();

?>