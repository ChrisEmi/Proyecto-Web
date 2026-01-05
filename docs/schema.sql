USE [EventosESCOM]
GO

-- =============================================
-- TABLAS BASE
-- =============================================

CREATE TABLE [dbo].[TipoUsuario](
    [id_tipo_usuario] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [nombre_tipo] VARCHAR(50) NOT NULL UNIQUE
);
GO

CREATE TABLE [dbo].[TipoActividad](
    [id_tipo_actividad] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [tipo_actividad] VARCHAR(50) NOT NULL UNIQUE
);
GO

CREATE TABLE [dbo].[Categoria](
    [id_categoria] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [nombre_categoria] VARCHAR(50) NOT NULL UNIQUE
);
GO

CREATE TABLE [dbo].[Tag](
    [id_tag] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [nombre_tag] VARCHAR(100) NOT NULL UNIQUE
);
GO

-- =============================================
-- TABLA USUARIO
-- =============================================

CREATE TABLE [dbo].[Usuario](
    [id_usuario] NVARCHAR(50) NOT NULL PRIMARY KEY,
    [nombre] VARCHAR(100) NOT NULL,
    [apellido_paterno] VARCHAR(100) NOT NULL,
    [apellido_materno] VARCHAR(100) NULL,
    [correo] VARCHAR(255) NOT NULL UNIQUE,
    [contraseña] VARCHAR(255) NOT NULL,
    [id_tipo_usuario] INT NOT NULL,
    [fecha_creacion] DATETIME DEFAULT GETDATE(),
    [estado] VARCHAR(100) DEFAULT 'Activo',
    [foto_src] NVARCHAR(255) NULL,
    [telefono] NVARCHAR(50) NULL,
    [recuperacion_token] VARCHAR(100) NULL,
    [recuperacion_exp] DATETIME NULL,
    CONSTRAINT [FK_Usuarios_Tipos_Usuario] FOREIGN KEY([id_tipo_usuario]) REFERENCES [dbo].[TipoUsuario]([id_tipo_usuario])
);
GO

-- =============================================
-- TABLAS DE PERFILES (Estudiante, Organizador)
-- =============================================

CREATE TABLE [dbo].[Estudiante](
    [id_usuario] NVARCHAR(50) NOT NULL PRIMARY KEY,
    [boleta] VARCHAR(50) NULL UNIQUE,
    [carrera] VARCHAR(100) NULL,
    [semestre] INT NULL,
    CONSTRAINT [FK_Perfil_Estudiante_Usuarios] FOREIGN KEY([id_usuario]) REFERENCES [dbo].[Usuario]([id_usuario]) ON DELETE CASCADE
);
GO

CREATE TABLE [dbo].[Organizador](
    [id_usuario] NVARCHAR(50) NOT NULL PRIMARY KEY,
    [empresa] VARCHAR(100) NULL,
    [cargo] NVARCHAR(250) NULL,
    CONSTRAINT [FK_Organizador_Usuarios] FOREIGN KEY([id_usuario]) REFERENCES [dbo].[Usuario]([id_usuario]) ON DELETE CASCADE
);
GO

-- =============================================
-- VISTAS DE PERFIL
-- =============================================

CREATE VIEW [dbo].[VW_AlumnoPerfil] AS
SELECT u.nombre, u.apellido_paterno, u.apellido_materno, u.correo, e.boleta, 
       e.carrera, e.semestre, u.foto_src, u.telefono, tu.nombre_tipo, u.id_usuario
FROM Usuario u
INNER JOIN TipoUsuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario
INNER JOIN Estudiante e ON u.id_usuario = e.id_usuario
WHERE u.id_tipo_usuario = 1;
GO

CREATE VIEW [dbo].[VW_OrganizadorPerfil] AS
SELECT u.nombre, u.apellido_paterno, u.apellido_materno, u.correo, u.foto_src, u.telefono,
       o.empresa, o.cargo, tu.nombre_tipo, u.id_usuario
FROM Usuario u
INNER JOIN TipoUsuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario
INNER JOIN Organizador o ON u.id_usuario = o.id_usuario
WHERE u.id_tipo_usuario = 2;
GO

CREATE VIEW [dbo].[VW_AdminPerfil] AS
SELECT u.nombre, u.apellido_paterno, u.id_usuario, u.apellido_materno, u.correo, 
       u.foto_src, tu.nombre_tipo, u.telefono
FROM Usuario u
INNER JOIN TipoUsuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario
WHERE u.id_tipo_usuario = 3;
GO

-- =============================================
-- TABLA ACTIVIDAD Y HORARIOS
-- =============================================

CREATE TABLE [dbo].[Actividad](
    [id_actividad] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [id_tipo_actividad] INT NOT NULL,
    [titulo] NVARCHAR(100) NOT NULL,
    [descripcion] NVARCHAR(255) NOT NULL,
    [profesor] VARCHAR(100) NOT NULL,
    [genero] VARCHAR(50) NOT NULL,
    [icono] VARCHAR(150) NOT NULL,
    [estado] VARCHAR(50) DEFAULT 'Activo',
    [fecha_creacion] DATETIME DEFAULT GETDATE(),
    CONSTRAINT [FK_Actividad_TipoActividad] FOREIGN KEY([id_tipo_actividad]) REFERENCES [dbo].[TipoActividad]([id_tipo_actividad])
);
GO

CREATE TABLE [dbo].[HorarioActividad](
    [id_horario] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [id_actividad] INT NOT NULL,
    [dia] VARCHAR(20) NOT NULL,
    [hora_inicio] TIME(7) NOT NULL,
    [hora_final] TIME(7) NOT NULL,
    CONSTRAINT [FK_HorarioActividad_Actividad] FOREIGN KEY([id_actividad]) REFERENCES [dbo].[Actividad]([id_actividad]) ON DELETE CASCADE
);
GO

-- =============================================
-- TABLA EVENTO E IMÁGENES
-- =============================================

CREATE TABLE [dbo].[Evento](
    [id_evento] NVARCHAR(50) NOT NULL PRIMARY KEY,
    [titulo_evento] VARCHAR(255) NOT NULL,
    [descripcion] TEXT NULL,
    [fecha] DATETIME NOT NULL,
    [ubicacion] VARCHAR(255) NULL,
    [id_categoria] INT NOT NULL,
    [cupo] INT NOT NULL,
    [id_organizador] NVARCHAR(50) NOT NULL,
    [id_admin] NVARCHAR(50) NULL,
    [estado] VARCHAR(50) DEFAULT 'Pendiente de revision',
    [fecha_creacion] DATETIME DEFAULT GETDATE(),
    [fecha_final] DATETIME NULL,
    CONSTRAINT [FK_Evento_Categoria] FOREIGN KEY([id_categoria]) REFERENCES [dbo].[Categoria]([id_categoria]),
    CONSTRAINT [FK_Eventos_Organizador] FOREIGN KEY([id_organizador]) REFERENCES [dbo].[Usuario]([id_usuario]),
    CONSTRAINT [FK_Eventos_Admin] FOREIGN KEY([id_admin]) REFERENCES [dbo].[Usuario]([id_usuario])
);
GO

CREATE TABLE [dbo].[EventoImagen](
    [id_imagen] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [id_evento] NVARCHAR(50) NOT NULL,
    [src] NVARCHAR(500) NULL,
    [descripcion] TEXT DEFAULT 'Imagen Generica',
    CONSTRAINT [FK_EventoImagen_Evento] FOREIGN KEY([id_evento]) REFERENCES [dbo].[Evento]([id_evento]) ON DELETE CASCADE
);
GO

-- =============================================
-- TABLA TAGS DE EVENTO
-- =============================================

CREATE TABLE [dbo].[TagsEvento](
    [id_tag] INT NOT NULL,
    [id_evento] NVARCHAR(50) NOT NULL,
    CONSTRAINT [PK_TagsEvento] PRIMARY KEY ([id_tag], [id_evento]),
    CONSTRAINT [FK_TagsEvento_Tag] FOREIGN KEY([id_tag]) REFERENCES [dbo].[Tag]([id_tag]),
    CONSTRAINT [FK_TagsEvento_Evento] FOREIGN KEY([id_evento]) REFERENCES [dbo].[Evento]([id_evento])
);
GO

-- =============================================
-- TABLA INSCRIPCIÓN A EVENTO
-- =============================================

CREATE TABLE [dbo].[InscripcionEvento](
    [id_inscripcion_evento] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [id_usuario] NVARCHAR(50) NOT NULL,
    [id_evento] NVARCHAR(50) NOT NULL,
    [fecha_inscripcion] DATETIME DEFAULT GETDATE(),
    [estado] NCHAR(10) NOT NULL DEFAULT N'Inscrito',
    CONSTRAINT [UQ_Inscripcion_Usuario_Evento] UNIQUE ([id_usuario], [id_evento]),
    CONSTRAINT [FK_InscripcionEvento_Usuario] FOREIGN KEY([id_usuario]) REFERENCES [dbo].[Usuario]([id_usuario]) ON DELETE CASCADE,
    CONSTRAINT [FK_Inscripcion_Evento] FOREIGN KEY([id_evento]) REFERENCES [dbo].[Evento]([id_evento]) ON DELETE CASCADE
);
GO
