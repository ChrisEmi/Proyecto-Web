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

    $router->post('/auth/generar-token-contrasena', function() use ($db) {
        $data = json_decode(file_get_contents('php://input'), true);
        $correo = $data['correo'] ?? '';
        $controller = new AuthController();
        $controller->recuperarContraseña($db, $correo);
    });

    $router->post('/auth/restablecer-contrasena', function() use ($db) {
        $data = json_decode(file_get_contents('php://input'), true);
        $token = $data['token'] ?? '';
        $nuevasContrasenas = [
            'nueva_contrasena' => $data['nueva_contrasena'] ?? '',
            'confirmar_contrasena' => $data['confirmar_contrasena'] ?? ''
        ];
        $controller = new AuthController();
        $controller->cambiarContrasena($db, $token, $nuevasContrasenas);
    });
}