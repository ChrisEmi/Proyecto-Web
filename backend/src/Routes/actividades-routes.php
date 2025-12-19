<?php
namespace App\Routes;

require_once __DIR__ . '/../Controllers/actividades-controller.php';
use App\Controllers\ActividadesController;

require_once __DIR__ . '/../Middlewares/estudiante-middleware.php';
use App\Middlewares\EstudianteMiddleware;

require_once __DIR__ . '/../Middlewares/admin-middleware.php';
use App\Middlewares\AdminMiddleware;

function actividades_routes($router) {
    $db = \App\Core\Database::getInstance();

    // ==================== ACTIVIDADES (PÚBLICAS) ====================

    // Obtener todas las actividades
    $router->get('/actividades/obtener-todas', function() use ($db) {
        $controller = new ActividadesController();
        $controller->obtenerTodasLasActividades($db);
    });

    // ==================== ACTIVIDADES (ADMIN) ====================

    // Crear actividad deportiva
    $router->post('/actividades/crear/deportiva', function() use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db) {
            $controller = new ActividadesController();
            $controller->crearActividadDeportiva($db);
        });
    });

    // Crear actividad cultural
    $router->post('/actividades/crear/cultural', function() use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db) {
            $controller = new ActividadesController();
            $controller->crearActividadCultural($db);
        });
    });

    // Actualizar actividad deportiva
    $router->put('/actividades/actualizar/deportiva/{id_actividad}', function($id_actividad) use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db, $id_actividad) {
            $controller = new ActividadesController();
            $controller->actualizarActividad($db, $id_actividad, 1); // tipo 1 = deportiva
        });
    });

    // Actualizar actividad cultural
    $router->put('/actividades/actualizar/cultural/{id_actividad}', function($id_actividad) use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db, $id_actividad) {
            $controller = new ActividadesController();
            $controller->actualizarActividad($db, $id_actividad, 2); // tipo 2 = cultural
        });
    });

    // ==================== INSCRIPCIONES (ESTUDIANTE) ====================

    // Inscribirse a una actividad
    $router->post('/actividades/inscribir/{id_actividad}', function($id_actividad) use ($db) {
        $middleware = new EstudianteMiddleware();
        $middleware->handle(function() use ($db, $id_actividad) {
            $controller = new ActividadesController();
            $controller->inscribirUsuarioActividad($db, $id_actividad);
        });
    });

    // Desinscribirse de una actividad
    $router->put('/actividades/desinscribir/{id_actividad}', function($id_actividad) use ($db) {
        $middleware = new EstudianteMiddleware();
        $middleware->handle(function() use ($db, $id_actividad) {
            $controller = new ActividadesController();
            $controller->desinscribirUsuarioActividad($db, $id_actividad);
        });
    });

    // Verificar si el usuario está inscrito
    $router->get('/actividades/verificar-inscripcion/{id_actividad}', function($id_actividad) use ($db) {
        $middleware = new EstudianteMiddleware();
        $middleware->handle(function() use ($db, $id_actividad) {
            $controller = new ActividadesController();
            $controller->verificarInscripcionUsuario($db, $id_actividad);
        });
    });

    // Obtener inscripciones del usuario actual
    $router->get('/actividades/mis-inscripciones', function() use ($db) {
        $middleware = new EstudianteMiddleware();
        $middleware->handle(function() use ($db) {
            $controller = new ActividadesController();
            $controller->obtenerInscripcionesPorUsuario($db);
        });
    });

    // ==================== INSCRIPCIONES (ADMIN) ====================

    // Obtener inscripciones por actividad
    $router->get('/actividades/inscripciones/{id_actividad}', function($id_actividad) use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db, $id_actividad) {
            $controller = new ActividadesController();
            $controller->obtenerInscripcionesPorActividad($db, $id_actividad);
        });
    });
}
