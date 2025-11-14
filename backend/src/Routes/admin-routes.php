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
            $controller->obtenerUsuarios($db, null, 'nombre', 'ASC');
        });
    });

    $router->get('/administrador/obtener-usuarios/todos/{ordenar_por}/{direccion}', function($ordenar_por, $direccion) use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db, $ordenar_por, $direccion) {
            $controller = new AdminController();
            $controller->obtenerUsuarios($db, null, $ordenar_por, $direccion);
        });
    });

    $router->get('/administrador/obtener-usuarios/{rol}/{ordenar_por}/{direccion}', function($rol, $ordenar_por, $direccion) use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db, $rol, $ordenar_por, $direccion) {
            $controller = new AdminController();
            $controller->obtenerUsuarios($db, $rol, $ordenar_por, $direccion);
        });
    });

    $router->post('/administrador/crear-organizador', function() use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db) {
            $controller = new AdminController();
            $controller->crearOrganizador($db);
        });
    });

    $router->post('/administrador/crear-administrador', function() use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db) {
            $controller = new AdminController();
            $controller->crearAdministrador($db);
        });
    });

    $router->post('/administrador/verificar-evento', function() use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db) {
            $controller = new AdminController();
            $controller->verificarEvento($db);
        });
    });


}