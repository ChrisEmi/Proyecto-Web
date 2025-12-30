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

    /**
     * Envía un email genérico
     */
    public function enviarEmail(string $destinatario, string $asunto, string $html): array
    {
        try {
            $result = $this->resend->emails->send([
                'from' => getenv('EMAIL_FROM') ?: 'ESCOMunidad <onboarding@resend.dev>',
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
}
