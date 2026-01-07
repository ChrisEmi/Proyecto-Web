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

    $router->post('/administrador/verificar-evento/{id_evento}', function($id_evento) use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db, $id_evento) {
            $controller = new AdminController();
            $controller->verificarEvento($db, $id_evento);
        });
    });

    $router->post('/administrador/eliminar-evento/{id_evento}', function($id_evento) use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db, $id_evento) {
            $controller = new AdminController();
            $controller->eliminarEvento($db, $id_evento);
        });
    });

    $router->get('/administrador/obtener-eventos/{ordenar_por}/{direccion}/{estado}', function($ordenar_por, $direccion, $estado) use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db, $ordenar_por, $direccion, $estado) {
            $controller = new AdminController();
            $controller->obtenerEventosAdmin($db, $ordenar_por, $direccion, $estado);
        });
    });

    $router->get('/administrador/obtener-eventos/{ordenar_por}/{direccion}/todos', function($ordenar_por, $direccion) use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db, $ordenar_por, $direccion) {
            $controller = new AdminController();
            $controller->obtenerEventosAdmin($db, $ordenar_por, $direccion, '');
        });
    });

    $router->post('/administrador/banear-usuario/{id_usuario}', function($id_usuario) use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db, $id_usuario) {
            $controller = new AdminController();
            $controller->banearDesbanearUsuario($db, $id_usuario);
        });
    });

    $router->get('/administrador/perfil-usuario/{id_usuario}', function($id_usuario) use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db, $id_usuario) {
            $controller = new AdminController();
            $controller->obtenerDatosPerfilAdmin($db, $id_usuario);
        });
    });

    $router->get('/administrador/eventos-usuario/{id_usuario}', function($id_usuario) use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db, $id_usuario) {
            $controller = new AdminController();
            $controller->obtenerInscripcionesUsuario($db, $id_usuario);
        });
    });
    
    $router->get('/administrador/eventos-organizador/{id_usuario}', function($id_usuario) use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db, $id_usuario) {
            $controller = new AdminController();
            $controller->obtenerEventosOrganizador($db, $id_usuario);
        });
    });


}