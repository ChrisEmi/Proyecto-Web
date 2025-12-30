<?php
require_once __DIR__ . '/../vendor/autoload.php';

// Cargar .env
$envPath = __DIR__ . '/../.env';
if (is_readable($envPath)) {
    $envVars = parse_ini_file($envPath);
    foreach ($envVars as $name => $value) {
        putenv("$name=$value");
    }
}

use App\Services\CorreoService;

echo "Probando envío con plantilla...\n\n";

try {
    $emailService = new CorreoService();
    $resultado = $emailService->enviarNotificacionEvento('christopheremic@gmail.com', [
        'nombre_usuario' => 'Christian',
        'titulo_evento' => 'Hackathon ESCOM 2025',
        'descripcion' => 'Participa en el evento de programación más grande de ESCOM.',
        'fecha_inicio' => '15 de Enero, 2025',
        'fecha_final' => '16 de Enero, 2025',
        'hora_evento' => '9:00 AM - 6:00 PM',
        'lugar_evento' => 'Auditorio Principal ESCOM',
        'imagen_evento' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop',
        'url_evento' => 'http://localhost:5173/eventos/test123'
    ]);
    
    print_r($resultado);
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
}
