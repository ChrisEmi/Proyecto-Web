<?php

require_once __DIR__ . '/../Controllers/evento-controller.php';
use App\Controllers\EventoController;

require_once __DIR__ . '/../Middlewares/estudiante-middleware.php';
use App\Middlewares\EstudianteMiddleware;

require_once __DIR__ . '/../Middlewares/organizador-middleware.php';
use App\Middlewares\OrganizadorMiddleware;

require_once __DIR__ . '/../Controllers/admin-controller.php';
use App\Controllers\AdminController;


function evento_routes($router) {
    $db = \App\Core\Database::getInstance();

    $router->get('/evento/obtener', function() use ($db) {
        $controller = new EventoController();
        $controller->obtenerEventos($db, 'fecha', 'DESC');
    });

    $router->get('/evento/obtener/{ordenar_por}/{direccion}', function($ordenar_por, $direccion) use ($db) {
        $controller = new EventoController();
        $controller->obtenerEventos($db, $ordenar_por, $direccion);
    });

    $router->get('/evento/obtener/{id_evento}', function($id_evento) use ($db) {
        $controller = new EventoController();
        $controller->obtenerEventoPorId($db, $id_evento);
    });

    $router->post('/evento/crear', function() use ($db) {
        $middleware = new OrganizadorMiddleware();
        $middleware->handle(function() use ($db) {
            $controller = new EventoController();
            $controller->crearEvento($db);
        });
    });

    $router->put('/evento/actualizar/{id_evento}', function($id_evento) use ($db) {
        $middleware = new OrganizadorMiddleware();
        $middleware->handle(function() use ($db, $id_evento) {
            $controller = new EventoController();
            $controller->actualizarEvento($db, $id_evento);
        });
    });

    $router->get('/evento/obtener-por-usuario/{ordenar_por}/{direccion}', function($ordenar_por, $direccion) use ($db) {
        $middleware = new EstudianteMiddleware();
        $middleware->handle(function() use ($db, $ordenar_por, $direccion) {
            $controller = new EventoController();
            $controller->obtenerEventosPorUsuario($db, $ordenar_por, $direccion);
        });
    });

    $router->get('/evento/obtener-por-usuario', function() use ($db) {
        $middleware = new EstudianteMiddleware();
        $middleware->handle(function() use ($db) {
            $controller = new EventoController();
            $controller->obtenerEventosPorUsuario($db, 'fecha', 'DESC');
        });
    });

    $router->get('/evento/obtener-por-organizador/{ordenar_por}/{direccion}', function($ordenar_por, $direccion) use ($db) {
        $middleware = new OrganizadorMiddleware();
        $middleware->handle(function() use ($db, $ordenar_por, $direccion) {
            $controller = new EventoController();
            $controller->obtenerEventosPorOrganizador($db, $ordenar_por, $direccion);
        });
    });

    $router->get('/evento/obtener-por-organizador', function() use ($db) {
        $middleware = new OrganizadorMiddleware();
        $middleware->handle(function() use ($db) {
            $controller = new EventoController();
            $controller->obtenerEventosPorOrganizador($db, 'fecha', 'DESC');
        });
    });

    $router->post('/evento/inscripcion-usuario/{id_evento}', function($id_evento) use ($db) {
        $middleware = new EstudianteMiddleware();
        $middleware->handle(function() use ($db, $id_evento) {
            $controller = new EventoController();
            $controller->inscribirUsuarioEvento($db, $id_evento);
        });
    });

    $router->post('/evento/cancelar-inscripcion/{id_evento}', function($id_evento) use ($db) {
        $middleware = new EstudianteMiddleware();
        $middleware->handle(function() use ($db, $id_evento) {
            $controller = new EventoController();
            $controller->desinscribirUsuarioEvento($db, $id_evento);
        });
    });

    $router->get('/evento/inscripciones-por-evento/{id_evento}', function($id_evento) use ($db) {
        $middleware = new OrganizadorMiddleware();
        $middleware->handle(function() use ($db, $id_evento) {
            $controller = new EventoController();
            $controller->obtenerInscripcionesPorEvento($db, $id_evento);
        });
    });
    $router->post('/evento/eliminar-evento/{id_evento}', function($id_evento) use ($db) {
        $middleware = new OrganizadorMiddleware();
        $middleware->handle(function() use ($db, $id_evento) {
            $controller = new AdminController();
            $controller->eliminarEvento($db, $id_evento);
        });
    });


}