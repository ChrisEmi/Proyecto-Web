# Contribuir al Proyecto-Web

Gracias por colaborar en este repositorio. Aquí están las normas mínimas y, en especial, la sección para dejar un entorno local reproducible entre todos los desarrolladores.

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

3) Composer (dependencias PHP)
- Instala Composer (https://getcomposer.org/download/).
- En la carpeta `backend/` del repo ejecuta:

```powershell
cd DIRECCION REPOSITORIO CLONADO\backend
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'ed0feb545ba87161262f2d45a633e34f591ebb3381f2e0063c345ebea4d228dd0043083717770234ec00c5a9f9593792') { echo 'Installer verified'.PHP_EOL; } else { echo 'Installer corrupt'.PHP_EOL; unlink('composer-setup.php'); exit(1); }"
php composer-setup.php
php -r "unlink('composer-setup.php');"
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
- Asegúrate de que `backend/.env` contiene las credenciales locales (DB, JWT secret, etc.).

6) Comprobaciones rápidas
- Abre en el navegador: http://proyecto-web.local
- Si ves problemas revisa `C:\xampp\apache\logs\error.log` y el VirtualHost configurado.

## Reglas rápidas de contribución
- Trabaja sobre ramas `feature/*` o `fix/*` basadas en `develop`.
- Abre Pull Requests hacia `develop`. Un revisor y CI aprobado son requeridos antes de merge.
- No subas credenciales ni el archivo `.env`.

Gracias por colaborar — si algo no queda claro, abre un Issue usando las plantillas del repo.
