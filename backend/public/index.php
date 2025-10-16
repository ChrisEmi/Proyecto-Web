<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../src/Core/database.php';
require __DIR__ . '/../vendor/autoload.php';

use App\Core\Database;

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

$conn = Database::getInstance();

$router->get('/', function() {
    echo json_encode(["status" => "success", "message" => "API is running"]);
});

$router->run();

?>