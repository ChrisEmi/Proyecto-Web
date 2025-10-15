# Proyecto Web - TDAW

## Qué hace la aplicación (según el documento)

- Gestiona usuarios: registro, inicio de sesión y roles (usuario/administrador).
- Permite crear, leer, actualizar y eliminar recursos principales (por ejemplo: entradas/artículos, categorías, comentarios).
- Proporciona una API REST en el backend (endpoints para usuarios y recursos) consumida por el frontend.
- Control de acceso: rutas protegidas para acciones de administración.
- Interfaz responsiva construida con componentes React.

## Cómo lo implementa (resumen técnico del documento)

- Backend (PHP):
  - Arquitectura MVC ligera con rutas que exponen una API REST.
  - Uso de PDO para acceder a la base de datos relacional (MySQL / MariaDB o PostgreSQL si se configura).
  - Endpoints principales: /api/auth (login/register), /api/users, /api/posts, /api/categories, /api/comments.
  - Autenticación: sesiones o tokens (el documento recomienda JWT; aquí se implementa JWT en PHP para las rutas protegidas).
  - Validación de entrada y manejo básico de errores con respuestas JSON estándar (status, message, data).

- Frontend (React + Vite):
  - Proyecto creado con Vite + React.
  - Páginas: Home (lista de recursos), Detalle (ver recurso), Admin (CRUD de recursos), Login/Register.
  - Gestión de estado ligera con Context API o hooks (useState/useEffect). Autorización mediante almacenamiento seguro del token (localStorage con precauciones).
  - Peticiones a la API usando fetch o axios.

## Requisitos

- PHP 8.0+ con extensiones: pdo, pdo_mysql (o pdo_pgsql si usa PostgreSQL), openssl (para JWT).
- Composer
- Node.js 18+ y npm o pnpm
- Base de datos: MySQL / MariaDB (recomendado) o PostgreSQL
- Git

## Estructura del repositorio (esperada)

- `backend/` - Código PHP (rutas, controladores, modelos, utilidades, composer.json).
- `backend/public/` - Punto de entrada público (index.php) y archivos públicos del backend.
- `frontend/` - Proyecto React + Vite.
- `database/` - Scripts SQL y/o migraciones.
- `docs/` - Documentación adicional y el PDF entregado.
- `.env.example` - Variables de entorno de ejemplo para backend y frontend.

## Instalación y ejecución (instrucciones concretas)

Siguientes instrucciones suponen que el repositorio tiene dos carpetas principales `backend/` y `frontend/`. Ajusta rutas si tu proyecto las tiene diferentes.

1) Clonar el repositorio

   git clone https://github.com/ChrisEmi/Proyecto-Web.git
   cd Proyecto-Web

2) Backend (PHP)

  a. Ir a la carpeta del backend:

     cd backend

  b. Instalar dependencias con Composer:

     composer install

  c. Copiar el ejemplo de variables de entorno y configurarlas (`.env`):

     # En PowerShell (Windows)
     Copy-Item .env.example .env

     # Editar `.env` con los datos de la base de datos y la clave JWT

     Ejemplo de variables importantes en `.env`:

     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_NAME=proyecto_db
     DB_USER=root
     DB_PASS=secret
     JWT_SECRET=clave_secreta_larga

  d. Crear la base de datos y ejecutar el script SQL de inicialización (si existe):

     # Ajusta según el motor; ejemplo MySQL desde PowerShell usando el cliente mysql
     mysql -u root -p < ..\database\schema.sql

  e. Iniciar servidor PHP para desarrollo (serve desde la carpeta public):

     # PowerShell: desde la carpeta backend/public
     php -S localhost:8000

     O usar un entorno como XAMPP / WAMP con DocumentRoot apuntando a `backend/public`.

3) Frontend (React + Vite)

  a. Abrir nueva terminal y situarse en la carpeta frontend:

     cd frontend

  b. Instalar dependencias:

     npm install

  c. Copiar variables de entorno y configurar API base en `.env` (Vite usa prefijos VITE_):

     # PowerShell
     Copy-Item .env.example .env

     Ejemplo en `frontend/.env`:

     VITE_API_BASE_URL=http://localhost:8000/api

  d. Ejecutar en modo desarrollo:

     npm run dev

  e. Abra el navegador en la URL que muestre Vite (por defecto http://localhost:5173).

## Endpoints (resumen esperado según el documento)

- POST /api/auth/register -> registrar usuario
- POST /api/auth/login -> iniciar sesión (devuelve JWT)
- GET /api/posts -> obtener lista de posts
- GET /api/posts/:id -> obtener detalle
- POST /api/posts -> crear post (protegido)
- PUT /api/posts/:id -> actualizar post (protegido)
- DELETE /api/posts/:id -> borrar post (protegido)
- GET /api/users -> (lista, protegido según rol)

## Consideraciones de seguridad

- Guardar `JWT_SECRET` seguro y no comprometido.
- En producción, usar HTTPS y habilitar cabeceras CORS correctamente en el backend.
- No guardar credenciales en el frontend; usar refresh tokens y mecanismos de expiración si el proyecto lo requiere.

## Despliegue

- Backend PHP: desplegar en un servidor con soporte PHP (Apache/Nginx + PHP-FPM) y configurar el virtual host apuntando a `backend/public`.
- Frontend: construir el proyecto con `npm run build` y servir los archivos estáticos en un CDN o directamente desde el servidor web (o integrar el build en `backend/public` si se desea).

## Autor y referencias

- Autor: J. A. O. R. (ver documento PDF entregado).
- Documento original: `proyectoFinal_TDAW-20261_JAOR.pdf` (incluir en `docs/`).

## Notas finales y supuestos

- Esta versión del README sigue la especificación del documento entregado: backend en PHP y frontend en React + Vite.
- Si quieres que incluya scripts concretos (por ejemplo `composer.json`, `package.json`, migraciones o snippets de configuración del servidor), envíame los archivos o dime qué prefieres y los añadiré.

