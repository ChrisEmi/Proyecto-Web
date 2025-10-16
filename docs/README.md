# Proyecto Web - Sistema de Gestión de Eventos Universitarios

## Descripción del Proyecto

Sistema web para la gestión integral de eventos universitarios que permite a estudiantes, organizadores y administradores crear, gestionar y participar en eventos académicos, culturales y deportivos.

### Funcionalidades Principales

- **Gestión de Usuarios**: Registro, autenticación y autorización con tres roles (Estudiante, Organizador, Administrador).
- **Gestión de Eventos**: Creación, edición, eliminación y visualización de eventos con categorías, ubicaciones y fechas.
- **Inscripción a Eventos**: Los estudiantes pueden inscribirse, cancelar inscripciones y ver su historial.
- **Panel de Administración**: Control total de usuarios, eventos y configuraciones del sistema.
- **Interfaz Responsiva**: Diseño adaptable construido con React y Tailwind CSS.

## Arquitectura del Sistema (3 Capas)

Siguiendo el estándar de arquitectura de tres capas:

1. **Capa de Presentación** (Frontend)
   - Framework: React 18 con Vite
   - Estilos: Tailwind CSS
   - Routing: React Router DOM
   - HTTP Client: Axios

2. **Capa de Lógica de Negocio** (Backend - Controladores)
   - Framework: Laravel 12 (PHP 8.2)
   - Patrón: MVC (Model-View-Controller)
   - API: RESTful con respuestas JSON

3. **Capa de Acceso a Datos** (Backend - Modelos)
   - ORM: Eloquent (Laravel)
   - Base de Datos: SQL Server
   - Drivers: `sqlsrv` y `pdo_sqlsrv`

## Tecnologías Utilizadas

### Backend
- **PHP**: 8.2.12 (Thread Safe)
- **Framework**: Laravel 12
- **Base de Datos**: Microsoft SQL Server
- **Autenticación**: Laravel Sanctum (para tokens de API)
- **Servidor Web**: Apache (XAMPP)

### Frontend
- **JavaScript**: ES6+
- **Framework**: React 18
- **Build Tool**: Vite
- **CSS Framework**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM v6

## Requisitos del Sistema

- **PHP** 8.2+ con extensiones:
  - `pdo`
  - `pdo_sqlsrv`
  - `sqlsrv`
  - `openssl`
  - `mbstring`
  - `fileinfo`
- **Composer** 2.x
- **Node.js** 18+ y npm
- **SQL Server** (cualquier versión compatible con el driver ODBC 17)
- **Microsoft ODBC Driver 17 for SQL Server**
- **Apache** 2.4+ (incluido en XAMPP)
- **Git**

## Estructura del Proyecto

```
Proyecto-Web/
├── backend/              # API Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/  # Lógica de negocio
│   │   └── Models/       # Modelos Eloquent (acceso a datos)
│   ├── database/
│   │   └── migrations/   # Control de versiones de BD
│   ├── routes/
│   │   └── api.php       # Definición de endpoints
│   ├── public/           # Punto de entrada
│   ├── .env              # Variables de entorno (no versionado)
│   └── composer.json
├── frontend/             # Aplicación React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/     # Llamadas a la API
│   │   └── App.jsx
│   ├── public/
│   ├── .env              # Variables de entorno (no versionado)
│   └── package.json
├── docs/                 # Documentación
│   ├── schema.sql        # Script de base de datos
│   └── schema.md         # Documentación del esquema
└── .gitignore
```

## Instalación y Configuración

### 1. Clonar el Repositorio

```powershell
git clone https://github.com/ChrisEmi/Proyecto-Web.git
cd Proyecto-Web
```

### 2. Configuración del Backend (Laravel)

#### a. Instalar dependencias

```powershell
cd backend
composer install
```

#### b. Configurar variables de entorno

Copia el archivo de ejemplo y configúralo:

```powershell
Copy-Item .env.example .env
```

Edita el archivo `.env` con tus credenciales de base de datos:

```env
DB_CONNECTION=sqlsrv
DB_HOST="TU_SERVIDOR\SQLEXPRESS"
DB_PORT=1433
DB_DATABASE=ProyectoWeb
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña

# Configuración de sesiones
SESSION_DRIVER=file

# URL del frontend para CORS
FRONTEND_URL=http://localhost:5173
```

#### c. Generar la clave de aplicación

```powershell
php artisan key:generate
```

#### d. Crear la base de datos

Ejecuta el script SQL ubicado en `docs/schema.sql` en tu gestor de SQL Server (SSMS o similar).

#### e. Configurar el Virtual Host de Apache

Edita `C:\xampp\apache\conf\extra\httpd-vhosts.conf` y agrega:

```apache
<VirtualHost *:80>
    ServerName proyecto-web.local
    DocumentRoot "C:/Users/TU_USUARIO/Documents/GitHub/Proyecto-Web/backend/public"
    
    <Directory "C:/Users/TU_USUARIO/Documents/GitHub/Proyecto-Web/backend/public">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

Edita `C:\Windows\System32\drivers\etc\hosts` (como administrador) y agrega:

```
127.0.0.1    proyecto-web.local
```

Reinicia Apache.

#### f. Verificar la conexión a la base de datos

```powershell
php artisan tinker --execute="DB::connection()->getPdo()"
```

Si no aparece ningún error, la conexión es exitosa.

### 3. Configuración del Frontend (React)

#### a. Instalar dependencias

```powershell
cd ..\frontend
npm install
```

#### b. Configurar variables de entorno

Copia el archivo de ejemplo:

```powershell
Copy-Item .env.example .env
```

Edita el archivo `.env`:

```env
VITE_API_BASE_URL=http://proyecto-web.local/api
```

#### c. Ejecutar en modo desarrollo

```powershell
npm run dev
```

Abre tu navegador en `http://localhost:5173`.

## Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión (devuelve token)
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/user` - Obtener usuario autenticado

### Usuarios (Protegidas - Admin)
- `GET /api/usuarios` - Listar todos los usuarios
- `GET /api/usuarios/{id}` - Obtener usuario específico
- `PUT /api/usuarios/{id}` - Actualizar usuario
- `DELETE /api/usuarios/{id}` - Eliminar usuario

### Eventos
- `GET /api/eventos` - Listar eventos (públicos y futuros)
- `GET /api/eventos/{id}` - Obtener detalle de evento
- `POST /api/eventos` - Crear evento (Organizador/Admin)
- `PUT /api/eventos/{id}` - Actualizar evento (Organizador/Admin)
- `DELETE /api/eventos/{id}` - Eliminar evento (Admin)

### Inscripciones
- `POST /api/inscripciones` - Inscribirse a un evento
- `GET /api/inscripciones/mis-eventos` - Ver eventos del usuario
- `DELETE /api/inscripciones/{id}` - Cancelar inscripción

### Tipos de Usuario
- `GET /api/tipos-usuario` - Listar tipos de usuario disponibles

## Consideraciones de Seguridad

- **Variables de entorno**: Nunca versionar archivos `.env` con credenciales reales.
- **CORS**: Configurado para aceptar solo peticiones desde el dominio del frontend.
- **Autenticación**: Implementada con Laravel Sanctum para tokens de API.
- **SQL Injection**: Protección automática mediante Eloquent ORM.
- **XSS**: React escapa automáticamente el contenido renderizado.

## Despliegue en Producción

### Backend
1. Configurar un servidor con Apache y PHP 8.2+
2. Configurar el Virtual Host apuntando a `backend/public`
3. Instalar dependencias: `composer install --optimize-autoloader --no-dev`
4. Configurar `.env` con credenciales de producción
5. Generar clave: `php artisan key:generate`
6. Optimizar configuración: `php artisan config:cache`

### Frontend
1. Construir el proyecto: `npm run build`
2. Servir los archivos de `frontend/dist` con un servidor web o CDN
3. Configurar `VITE_API_BASE_URL` con la URL de producción del backend

## Colaboradores

Para configurar el proyecto en tu máquina local:

1. Clona el repositorio
2. Ejecuta `composer install` en `/backend`
3. Ejecuta `npm install` en `/frontend`
4. Configura tu archivo `.env` en ambas carpetas
5. Ejecuta el script `docs/schema.sql` en tu SQL Server local

## Equipo de Desarrollo

- **ChrisEmi** - Líder del proyecto y desarrollador full-stack

## Referencias

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- Documento de especificación original: `docs/proyectoFinal_TDAW-20261_JAOR.pdf`

