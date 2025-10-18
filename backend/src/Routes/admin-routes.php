<?php

require_once __DIR__ . '/../Controllers/admin-controller.php';
use App\Controllers\AdminController;

require_once __DIR__ . '/../Middlewares/admin-middleware.php';
use App\Middlewares\AdminMiddleware;

function admin_routes($router) {
    $db = \App\Core\Database::getInstance();

    $router->get('/administrador/obtener-usuarios', function() use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db) {
            $controller = new AdminController();
            $controller->obtenerUsuarios($db);
        });
    });

    $router->post('/administrador/crear-usuario', function() use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db) {
            $controller = new AdminController();
            $controller->crearUsuario($db);
        });
    });


}