<?php
require_once __DIR__ . '/../Controllers/auth-controller.php';
use App\Controllers\AuthController;



function auth_routes($router) {
    $db = \App\Core\Database::getInstance();
    
    $router->post('/auth/login', function() use ($db) {
        $controller = new AuthController();
        $controller->login($db);
    });
    
    $router->post('/auth/registro', function() use ($db) {
        $controller = new AuthController();
        $controller->registro($db);
    });
    
    $router->post('/auth/logout', function() {
        $controller = new AuthController();
        $controller->logout();
    });

    $router->get('/auth/verificar-token', function() use ($db) {
        $controller = new AuthController();
        $controller->verificarTokenCookie($db);
    });
}