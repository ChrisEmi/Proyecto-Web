## Entorno local reproducible
Sigue estos pasos para dejar tu entorno local alineado con el equipo. Estas instrucciones asumen Windows y que se usará XAMPP para PHP durante el desarrollo.

1) Instalar XAMPP
- Descarga XAMPP desde: https://www.apachefriends.org/es/index.html
- Ejecuta el instalador y asegúrate de incluir Apache y MySQL.
- Inicia el XAMPP Control Panel y arranca Apache y MySQL.

2) Configurar VirtualHost para el proyecto
- EN TU MAQUINA
- Edita `C:\xampp\apache\conf\httpd.conf` y asegúrate de que la línea `Include conf/extra/httpd-vhosts.conf` no esté comentada.
- Edita `C:\xampp\apache\conf\extra\httpd-vhosts.conf` y añade un bloque como este (ajusta rutas si es necesario):

```xml
<VirtualHost *:80>
    ServerName proyecto-web.local
    ServerAlias www.proyecto-web.local
    DocumentRoot "DIRECCION REPOSITORIO CLONADO/backend/public"
    <Directory "DIRECCION REPOSITORIO CLONADO/backend/public">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    ErrorLog "logs/proyecto-web.local-error.log"
    CustomLog "logs/proyecto-web.local-access.log" combined
</VirtualHost>
```

- Añade en `C:\Windows\System32\drivers\etc\hosts` la línea:
```
127.0.0.1 proyecto-web.local
```
- Reinicia Apache desde el XAMPP Control Panel.

3) Composer (dependencias PHP - opcional)
- Instala Composer si planeas usar librerías adicionales (https://getcomposer.org/download/).
- En la carpeta `backend/` del repo ejecuta (solo si hay un composer.json):

```powershell
cd DIRECCION REPOSITORIO CLONADO\backend
composer install
```

4) Node / Frontend (Vite + React)
- Instala Node.js (recomendado LTS, p.ej. Node 18+).
- En la carpeta `frontend/` del repo ejecuta:

```powershell
cd C:\DIRECCION REPOSITORIO CLONADO\frontend
npm ci
npm run dev
```

5) Variables de entorno
- Crea un archivo `backend/.env` basado en `backend/.env.example` (si existe). Nunca subas `.env` al repositorio.
- Asegúrate de que `backend/.env` contiene las credenciales locales de tu SQL Server:

```env
DB_HOST="TU_SERVIDOR\SQLEXPRESS"
DB_PORT=1433
DB_NAME=ProyectoWeb
DB_USER=tu_usuario
DB_PASS=tu_contraseña
FRONTEND_URL=http://localhost:5173
```

6) Comprobaciones rápidas
- Abre en el navegador: http://proyecto-web.local/api/test
- Si ves una respuesta JSON, todo está funcionando correctamente.
- Si ves problemas revisa `C:\xampp\apache\logs\error.log` y el VirtualHost configurado.
- Para depurar la conexión a la base de datos, puedes revisar los logs o agregar `var_dump()` en el código temporalmente.

## Reglas rápidas de contribución
- Trabaja sobre ramas `feature/*` o `fix/*` basadas en `develop`.
- Abre Pull Requests hacia `develop`. Un revisor y CI aprobado son requeridos antes de merge.
- No subas credenciales ni el archivo `.env`.
