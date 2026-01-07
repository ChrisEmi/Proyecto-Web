<?php

namespace App\Services;

class CorreoService
{
    private $resend;
    private string $templatesPath;

    public function __construct()
    {
        $this->resend = \Resend::client(getenv('RESEND_API_KEY'));
        $this->templatesPath = __DIR__ . '/../Templates/';
    }
    public function enviarNotificacionEvento(string $destinatario, array $datosEvento): array
    {
        $html = $this->renderTemplate('emails/notificacionEvento.html', [
            'nombre_usuario' => $datosEvento['nombre_usuario'] ?? 'Estudiante',
            'titulo_evento' => $datosEvento['titulo_evento'] ?? '',
            'descripcion' => $datosEvento['descripcion_evento'] ?? '',
            'fecha_inicio' => $datosEvento['fecha_inicio'] ?? '',
            'fecha_final' => $datosEvento['fecha_final'] ?? '',
            'hora_evento' => $datosEvento['hora_evento'] ?? '',
            'lugar_evento' => $datosEvento['lugar_evento'] ?? '',
            'imagen_evento' => $datosEvento['imagen_evento'] ?? 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop',
            'url_evento' => $datosEvento['url_evento'] ?? '#'
        ]);

        return $this->enviarEmail(
            $destinatario,
            "Te ha registrado en un nuevo evento",
            $html
        );
    }

    
    public function enviarEmail(string $destinatario, string $asunto, string $html): array
    {
        try {
            $from = getenv('EMAIL_FROM');
            if (empty($from)) {
                $from = 'ESCOMunidad <noreply@escomeventos.live>';
            }
            
            $result = $this->resend->emails->send([
                'from' => $from,
                'to' => $destinatario,
                'subject' => $asunto,
                'html' => $html
            ]);

            return [
                'success' => true,
                'message' => 'Email enviado correctamente',
                'id' => $result->id ?? null
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al enviar email: ' . $e->getMessage()
            ];
        }
    }
    private function renderTemplate(string $templateName, array $variables): string
    {
        $templatePath = $this->templatesPath . $templateName;
        
        if (!file_exists($templatePath)) {
            throw new \Exception("Plantilla no encontrada: {$templateName}");
        }

        $html = file_get_contents($templatePath);

        // Reemplazar placeholders {{variable}} con los valores
        foreach ($variables as $key => $value) {
            $html = str_replace("{{{$key}}}", htmlspecialchars($value, ENT_QUOTES, 'UTF-8'), $html);
        }

        return $html;
    }

    /**
     * Envía email de bienvenida al registrarse
     */
    public function enviarBienvenida(string $destinatario, array $datosUsuario): array
    {
        $html = $this->renderTemplate('emails/registroUsuario.html', [
            'nombre_usuario' => $datosUsuario['nombre_usuario'] ?? 'Usuario',
            'correo_usuario' => $datosUsuario['correo_usuario'] ?? $destinatario,
            'url_inicio' => $datosUsuario['url_inicio'] ?? 'http://localhost:5173/eventos'
        ]);

        return $this->enviarEmail(
            $destinatario,
            "¡Bienvenido a ESCOMunidad!",
            $html
        );
    }

    public function enviarNotificacionMasiva(array $destinatarios, array $datosEvento): array
    {
        $resultados = [];
        
        foreach ($destinatarios as $destinatario) {
            $datosEvento['nombreUsuario'] = $destinatario['nombre'] ?? 'Estudiante';
            $resultados[] = [
                'email' => $destinatario['email'],
                'resultado' => $this->enviarNotificacionEvento($destinatario['email'], $datosEvento)
            ];
        }

        return $resultados;
    }

    public function enviarRecuperacionContrasena(string $destinatario, array $datosUsuario): array
    {
        $html = $this->renderTemplate('emails/recuperacionContrasena.html', [
            'nombre_usuario' => $datosUsuario['nombre_usuario'] ?? 'Usuario',
            'url_recuperacion' => $datosUsuario['url_recuperacion'] ?? '#'
        ]);

        return $this->enviarEmail(
            $destinatario,
            "Recuperación de contraseña",
            $html
        );
    }

    public function enviarNotificacionInscripcionOrganizador(string $destinatario, array $datosInscripcion): array
    {
        $html = $this->renderTemplate('emails/notificacionEventoOrganizador.html', [
            'nombre_organizador' => $datosInscripcion['nombre_organizador'] ?? 'Organizador',
            'titulo_evento' => $datosInscripcion['titulo_evento'] ?? '',
            'nombre_inscrito' => $datosInscripcion['nombre_inscrito'] ?? '',
            'correo_inscrito' => $datosInscripcion['correo_inscrito'] ?? '',
            'fecha_inscripcion' => $datosInscripcion['fecha_inscripcion'] ?? date('d/m/Y H:i'),
            'hora_evento' => $datosInscripcion['hora_evento'] ?? '',
            'lugar_evento' => $datosInscripcion['lugar_evento'] ?? '',
            'url_evento' => $datosInscripcion['url_evento'] ?? '#'
        ]);

        return $this->enviarEmail(
            $destinatario,
            "Nueva inscripción en tu evento: " . ($datosInscripcion['titulo_evento'] ?? ''),
            $html
        );
    }

    public function enviarNotificacionesEventoProximo(array $destinatarios, array $datosEvento)
    {
        $fechaInicio = !empty($datosEvento['fecha_inicio']) ? new \DateTime($datosEvento['fecha_inicio']) : null;
        $dias_restantes = $fechaInicio ? $fechaInicio->diff(new \DateTime())->days : null;
        $fecha_formateada = $fechaInicio ? $fechaInicio->format('d \d\e F, Y') : '';

        $html = $this->renderTemplate('emails/notificacionEventoProximo.html', [
            'titulo_evento' => $datosEvento['titulo_evento'] ?? '',
            'dias_restantes' => $dias_restantes ?? '',
            'nombre_usuario' => $datosEvento['nombre'] ?? 'Estudiante',
            'descripcion' => $datosEvento['descripcion_evento'] ?? '',
            'fecha_evento' => $fecha_formateada,
            'hora_evento' => $datosEvento['hora_evento'] ?? '',
            'lugar_evento' => $datosEvento['lugar_evento'] ?? '',
            'imagen_evento' => $datosEvento['imagen_evento'] ?? 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop',
            'url_evento' => $datosEvento['url_evento'] ?? '#'
        ]);

        $resultados = [];

        foreach ($destinatarios as $destinatario) {
            $resultados[] = [
                'email' => $destinatario,
                'resultado' => $this->enviarEmail(
                    $destinatario,
                    "Recordatorio: Evento próximo - " . ($datosEvento['titulo_evento'] ?? ''),
                    $html
                )
            ];
        }

        return $resultados;

    }
}
