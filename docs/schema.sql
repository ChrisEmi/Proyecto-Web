USE [EventosESCOM]
GO
/****** Object:  Table [dbo].[TipoUsuario]    Script Date: 01/12/2025 02:45:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoUsuario](
	[id_tipo_usuario] [int] IDENTITY(1,1) NOT NULL,
	[nombre_tipo] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_tipo_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[nombre_tipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 01/12/2025 02:45:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[id_usuario] [nvarchar](50) NOT NULL,
	[nombre] [varchar](100) NOT NULL,
	[apellido_paterno] [varchar](100) NOT NULL,
	[apellido_materno] [varchar](100) NULL,
	[correo] [varchar](255) NOT NULL,
	[contraseña] [varchar](255) NOT NULL,
	[id_tipo_usuario] [int] NOT NULL,
	[fecha_creacion] [datetime] NULL,
	[estado] [varchar](100) NULL,
	[foto_src] [nvarchar](255) NULL,
	[telefono] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[correo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Estudiante]    Script Date: 01/12/2025 02:45:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Estudiante](
	[id_usuario] [nvarchar](50) NOT NULL,
	[boleta] [varchar](50) NULL,
	[carrera] [varchar](100) NULL,
	[semestre] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[boleta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VW_AlumnoPerfil]    Script Date: 01/12/2025 02:45:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VW_AlumnoPerfil] AS
SELECT u.nombre, u.apellido_paterno, u.apellido_materno, u.correo, e.boleta, 
e.carrera, e.semestre, u.foto_src, u.telefono, tu.nombre_tipo
FROM Usuario u
INNER JOIN TipoUsuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario
INNER JOIN Estudiante e ON u.id_usuario = e.id_usuario
WHERE u.id_tipo_usuario = '1'
GO
/****** Object:  Table [dbo].[Organizador]    Script Date: 01/12/2025 02:45:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Organizador](
	[id_usuario] [nvarchar](50) NOT NULL,
	[empresa] [varchar](100) NULL,
	[cargo] [nvarchar](250) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[VW_OrganizadorPerfil]    Script Date: 01/12/2025 02:45:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VW_OrganizadorPerfil] AS
SELECT u.nombre, u.apellido_paterno, u.apellido_materno, u.correo, u.foto_src, u.telefono,
o.empresa, o.cargo, tu.nombre_tipo
FROM Usuario u
INNER JOIN TipoUsuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario
INNER JOIN Organizador o ON u.id_usuario = o.id_usuario
WHERE u.id_tipo_usuario = '2'
GO
/****** Object:  View [dbo].[VW_AdminPerfil]    Script Date: 01/12/2025 02:45:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[VW_AdminPerfil] AS
SELECT u.nombre, u.apellido_paterno, u.apellido_materno, u.correo, u.foto_src,tu.nombre_tipo,u.telefono
FROM Usuario u
INNER JOIN TipoUsuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario
WHERE u.id_tipo_usuario = '3'
GO
/****** Object:  Table [dbo].[Actividad]    Script Date: 01/12/2025 02:45:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Actividad](
	[id_actividad] [int] IDENTITY(1,1) NOT NULL,
	[tipo_actividad] [varchar](255) NOT NULL,
	[actividad] [varchar](255) NOT NULL,
	[estado] [varchar](50) NULL,
	[fecha_creacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_actividad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categoria]    Script Date: 01/12/2025 02:45:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categoria](
	[id_categoria] [int] IDENTITY(1,1) NOT NULL,
	[nombre_categoria] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_categoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[nombre_categoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Evento]    Script Date: 01/12/2025 02:45:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Evento](
	[id_evento] [nvarchar](50) NOT NULL,
	[titulo_evento] [varchar](255) NOT NULL,
	[descripcion] [text] NULL,
	[fecha] [datetime] NOT NULL,
	[ubicacion] [varchar](255) NULL,
	[id_categoria] [int] NOT NULL,
	[cupo] [int] NOT NULL,
	[id_organizador] [nvarchar](50) NOT NULL,
	[id_admin] [nvarchar](50) NULL,
	[estado] [varchar](50) NULL,
	[fecha_creacion] [datetime] NULL,
	[fecha_final] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_evento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EventoImagen]    Script Date: 01/12/2025 02:45:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventoImagen](
	[id_imagen] [int] IDENTITY(1,1) NOT NULL,
	[id_evento] [nvarchar](50) NOT NULL,
	[src] [nvarchar](500) NULL,
	[descripcion] [text] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_imagen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HorarioActividad]    Script Date: 01/12/2025 02:45:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HorarioActividad](
	[id_horario] [int] IDENTITY(1,1) NOT NULL,
	[id_actividad] [int] NOT NULL,
	[dia] [varchar](255) NOT NULL,
	[hora_inicio] [time](7) NOT NULL,
	[hora_final] [time](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_horario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[InscripcionActividad]    Script Date: 01/12/2025 02:45:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InscripcionActividad](
	[id_inscripcion_actividad] [int] IDENTITY(1,1) NOT NULL,
	[id_usuario] [nvarchar](50) NOT NULL,
	[id_actividad] [int] NOT NULL,
	[fecha_inscripcion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_inscripcion_actividad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_Inscripcion_Usuario_Actividad] UNIQUE NONCLUSTERED 
(
	[id_usuario] ASC,
	[id_actividad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[InscripcionEvento]    Script Date: 01/12/2025 02:45:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InscripcionEvento](
	[id_inscripcion_evento] [int] IDENTITY(1,1) NOT NULL,
	[id_usuario] [nvarchar](50) NOT NULL,
	[id_evento] [nvarchar](50) NOT NULL,
	[fecha_inscripcion] [datetime] NULL,
	[estado] [nchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_inscripcion_evento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_Inscripcion_Usuario_Evento] UNIQUE NONCLUSTERED 
(
	[id_usuario] ASC,
	[id_evento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tag]    Script Date: 01/12/2025 02:45:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tag](
	[id_tag] [int] IDENTITY(1,1) NOT NULL,
	[nombre_tag] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id_tag] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[nombre_tag] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TagsEvento]    Script Date: 01/12/2025 02:45:57 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TagsEvento](
	[id_tag] [int] NOT NULL,
	[id_evento] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_TagsEvento] PRIMARY KEY CLUSTERED 
(
	[id_tag] ASC,
	[id_evento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Actividad] ADD  DEFAULT ('Activo') FOR [estado]
GO
ALTER TABLE [dbo].[Actividad] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[Evento] ADD  DEFAULT ('Pendiente de revision') FOR [estado]
GO
ALTER TABLE [dbo].[Evento] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[EventoImagen] ADD  DEFAULT ('Imagen Generica') FOR [descripcion]
GO
ALTER TABLE [dbo].[InscripcionActividad] ADD  DEFAULT (getdate()) FOR [fecha_inscripcion]
GO
ALTER TABLE [dbo].[InscripcionEvento] ADD  DEFAULT (getdate()) FOR [fecha_inscripcion]
GO
ALTER TABLE [dbo].[InscripcionEvento] ADD  CONSTRAINT [DF_InscripcionEvento_estado]  DEFAULT (N'Inscrito') FOR [estado]
GO
ALTER TABLE [dbo].[Usuario] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[Usuario] ADD  DEFAULT ('Activo') FOR [estado]
GO
ALTER TABLE [dbo].[Estudiante]  WITH CHECK ADD  CONSTRAINT [FK_Perfil_Estudiante_Usuarios] FOREIGN KEY([id_usuario])
REFERENCES [dbo].[Usuario] ([id_usuario])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Estudiante] CHECK CONSTRAINT [FK_Perfil_Estudiante_Usuarios]
GO
ALTER TABLE [dbo].[Evento]  WITH CHECK ADD  CONSTRAINT [FK_Evento_Categoria] FOREIGN KEY([id_categoria])
REFERENCES [dbo].[Categoria] ([id_categoria])
GO
ALTER TABLE [dbo].[Evento] CHECK CONSTRAINT [FK_Evento_Categoria]
GO
ALTER TABLE [dbo].[Evento]  WITH CHECK ADD  CONSTRAINT [FK_Eventos_Admin] FOREIGN KEY([id_admin])
REFERENCES [dbo].[Usuario] ([id_usuario])
GO
ALTER TABLE [dbo].[Evento] CHECK CONSTRAINT [FK_Eventos_Admin]
GO
ALTER TABLE [dbo].[Evento]  WITH CHECK ADD  CONSTRAINT [FK_Eventos_Organizador] FOREIGN KEY([id_organizador])
REFERENCES [dbo].[Usuario] ([id_usuario])
GO
ALTER TABLE [dbo].[Evento] CHECK CONSTRAINT [FK_Eventos_Organizador]
GO
ALTER TABLE [dbo].[EventoImagen]  WITH CHECK ADD  CONSTRAINT [FK_EventoImagen_Evento] FOREIGN KEY([id_evento])
REFERENCES [dbo].[Evento] ([id_evento])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[EventoImagen] CHECK CONSTRAINT [FK_EventoImagen_Evento]
GO
ALTER TABLE [dbo].[HorarioActividad]  WITH CHECK ADD  CONSTRAINT [FK_Actividad_HorarioActividad] FOREIGN KEY([id_actividad])
REFERENCES [dbo].[Actividad] ([id_actividad])
GO
ALTER TABLE [dbo].[HorarioActividad] CHECK CONSTRAINT [FK_Actividad_HorarioActividad]
GO
ALTER TABLE [dbo].[InscripcionActividad]  WITH CHECK ADD  CONSTRAINT [FK_Inscripcion_Actividad] FOREIGN KEY([id_actividad])
REFERENCES [dbo].[Actividad] ([id_actividad])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[InscripcionActividad] CHECK CONSTRAINT [FK_Inscripcion_Actividad]
GO
ALTER TABLE [dbo].[InscripcionActividad]  WITH CHECK ADD  CONSTRAINT [FK_InscripcionActividad_Usuario] FOREIGN KEY([id_usuario])
REFERENCES [dbo].[Usuario] ([id_usuario])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[InscripcionActividad] CHECK CONSTRAINT [FK_InscripcionActividad_Usuario]
GO
ALTER TABLE [dbo].[InscripcionEvento]  WITH CHECK ADD  CONSTRAINT [FK_Inscripcion_Evento] FOREIGN KEY([id_evento])
REFERENCES [dbo].[Evento] ([id_evento])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[InscripcionEvento] CHECK CONSTRAINT [FK_Inscripcion_Evento]
GO
ALTER TABLE [dbo].[InscripcionEvento]  WITH CHECK ADD  CONSTRAINT [FK_InscripcionEvento_Usuario] FOREIGN KEY([id_usuario])
REFERENCES [dbo].[Usuario] ([id_usuario])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[InscripcionEvento] CHECK CONSTRAINT [FK_InscripcionEvento_Usuario]
GO
ALTER TABLE [dbo].[Organizador]  WITH CHECK ADD  CONSTRAINT [FK_Organizador_Usuarios] FOREIGN KEY([id_usuario])
REFERENCES [dbo].[Usuario] ([id_usuario])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Organizador] CHECK CONSTRAINT [FK_Organizador_Usuarios]
GO
ALTER TABLE [dbo].[TagsEvento]  WITH CHECK ADD  CONSTRAINT [FK_TagsEvento_Evento] FOREIGN KEY([id_evento])
REFERENCES [dbo].[Evento] ([id_evento])
GO
ALTER TABLE [dbo].[TagsEvento] CHECK CONSTRAINT [FK_TagsEvento_Evento]
GO
ALTER TABLE [dbo].[TagsEvento]  WITH CHECK ADD  CONSTRAINT [FK_TagsEvento_Tag] FOREIGN KEY([id_tag])
REFERENCES [dbo].[Tag] ([id_tag])
GO
ALTER TABLE [dbo].[TagsEvento] CHECK CONSTRAINT [FK_TagsEvento_Tag]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuarios_Tipos_Usuario] FOREIGN KEY([id_tipo_usuario])
REFERENCES [dbo].[TipoUsuario] ([id_tipo_usuario])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuarios_Tipos_Usuario]
GO
