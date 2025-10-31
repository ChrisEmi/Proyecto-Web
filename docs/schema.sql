CREATE TABLE TipoUsuario (
    id_tipo_usuario INT PRIMARY KEY IDENTITY(1,1),
    nombre_tipo VARCHAR(50) NOT NULL UNIQUE 
);

CREATE TABLE Usuario (
    id_usuario NVARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    id_tipo_usuario INT NOT NULL,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Usuarios_Tipos_Usuario FOREIGN KEY (id_tipo_usuario) REFERENCES TipoUsuario(id_tipo_usuario)
);



CREATE TABLE Estudiante (
    id_usuario NVARCHAR(50) PRIMARY KEY, 
    matricula VARCHAR(50) UNIQUE,
    carrera VARCHAR(100),
    semestre INT,
    CONSTRAINT FK_Perfil_Estudiante_Usuarios FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);


CREATE TABLE Organizador (
    id_usuario NVARCHAR(50) PRIMARY KEY, 
    departamento VARCHAR(100), 
    CONSTRAINT FK_Organizador_Usuarios FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario) ON DELETE CASCADE
);



CREATE TABLE CategoriaEvento (
    id_categoria INT PRIMARY KEY IDENTITY(1,1),
    nombre_categoria VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE Evento (
    id_evento INT PRIMARY KEY,
    nombre_evento VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    ubicacion VARCHAR(255),
    id_organizador NVARCHAR(50) NOT NULL, 
    id_categoria INT,
    estado VARCHAR(50) DEFAULT 'Borrador',
    fecha_creacion DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_Eventos_Organizador FOREIGN KEY (id_organizador) REFERENCES Usuario(id_usuario),
    CONSTRAINT FK_Eventos_Categoria FOREIGN KEY (id_categoria) REFERENCES CategoriaEvento(id_categoria)
);

CREATE TABLE Inscripcion (
    id_inscripcion INT PRIMARY KEY,
    id_usuario NVARCHAR(50) NOT NULL, 
    id_evento INT NOT NULL,
    fecha_inscripcion DATETIME DEFAULT GETDATE(),
    CONSTRAINT UQ_Usuario_Evento UNIQUE (id_usuario, id_evento), 
    CONSTRAINT FK_Inscripciones_Usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    CONSTRAINT FK_Inscripciones_Evento FOREIGN KEY (id_evento) REFERENCES Evento(id_evento) ON DELETE CASCADE
);



INSERT INTO TipoUsuario (nombre_tipo) VALUES ('Estudiante'), ('Organizador'), ('Administrador');

INSERT INTO CategoriaEvento (nombre_categoria) VALUES ('Academico'), ('Cultural'), ('Deportivo'), ('Social'), ('Taller');