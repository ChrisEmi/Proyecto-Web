<?php
require_once __DIR__ . '/../Middlewares/estudiante-middleware.php';
use App\Middlewares\EstudianteMiddleware;
require_once __DIR__ . '/../Middlewares/organizador-middleware.php';
use App\Middlewares\OrganizadorMiddleware;
require_once __DIR__ . '/../Middlewares/admin-middleware.php';
use App\Middlewares\AdminMiddleware;
require_once __DIR__ . '/../Controllers/perfil-controller.php';
use App\Controllers\PerfilController;

function perfil_routes($router) {
    $db = \App\Core\Database::getInstance();

    $router->get('/perfil/alumno/obtener', function() use ($db) {
        $middleware = new EstudianteMiddleware();
        $middleware->handle(function() use ($db) {
            $controller = new PerfilController();
            $controller->obtenerPerfilAlumno($db);
        });
    });

    $router->put('/perfil/alumno/actualizar', function() use ($db) {
        $middleware = new EstudianteMiddleware();
        $middleware->handle(function() use ($db) {
            $controller = new PerfilController();
            $controller->actualizarPerfilAlumno($db);
        });
    });

    $router->get('/perfil/organizador/obtener', function() use ($db) {
        $middleware = new OrganizadorMiddleware();
        $middleware->handle(function() use ($db) {
            $controller = new PerfilController();
            $controller->obtenerPerfilOrganizador($db);
        });
    });

    $router->put('/perfil/organizador/actualizar', function() use ($db) {
        $middleware = new OrganizadorMiddleware();
        $middleware->handle(function() use ($db) {
            $controller = new PerfilController();
            $controller->actualizarPerfilOrganizador($db);
        });
    });

    $router->get('/perfil/admin/obtener', function() use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db) {
            $controller = new PerfilController();
            $controller->obtenerPerfilAdmin($db);
        });
    });

    $router->put('/perfil/admin/actualizar', function() use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db) {
            $controller = new PerfilController();
            $controller->actualizarPerfilAdmin($db);
        });
    });

    $router->put('/perfil/cambiar-preferencias-organizador/{preferencias}', function($preferencias) use ($db) {
        $middleware = new OrganizadorMiddleware();
        $middleware->handle(function() use ($db, $preferencias) {
            $controller = new PerfilController();
            $controller->cambiarConfiguracionNotificaciones($db, (int)$preferencias);
        });
    });

    $router->put('/perfil/cambiar-preferencias-alumno/{preferencias}', function($preferencias) use ($db) {
        $middleware = new EstudianteMiddleware();
        $middleware->handle(function() use ($db, $preferencias) {
            $controller = new PerfilController();
            $controller->cambiarConfiguracionNotificaciones($db, (int)$preferencias);
        });
    });

    $router->put('/perfil/cambiar-preferencias-admin/{preferencias}', function($preferencias) use ($db) {
        $middleware = new AdminMiddleware();
        $middleware->handle(function() use ($db, $preferencias) {
            $controller = new PerfilController();
            $controller->cambiarConfiguracionNotificaciones($db, (int)$preferencias);
        });
    });
}
    
?>