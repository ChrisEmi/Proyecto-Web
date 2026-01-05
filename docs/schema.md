## Tablas Base

### Tabla: `TipoUsuario`

| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|--------------|---------------|
| `id_tipo_usuario` | `INT`        | PRIMARY KEY, IDENTITY(1,1) |
| `nombre_tipo`     | `VARCHAR(50)`| NOT NULL, UNIQUE |

---

### Tabla: `TipoActividad`

| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|--------------|---------------|
| `id_tipo_actividad` | `INT`      | PRIMARY KEY, IDENTITY(1,1) |
| `tipo_actividad`    | `VARCHAR(50)`| NOT NULL, UNIQUE |

---

### Tabla: `Categoria`

| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|---------------|---------------|
| `id_categoria`    | `INT`         | PRIMARY KEY, IDENTITY(1,1) |
| `nombre_categoria`| `VARCHAR(50)` | NOT NULL, UNIQUE |

---

### Tabla: `Tag`

| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|---------------|---------------|
| `id_tag`          | `INT`         | PRIMARY KEY, IDENTITY(1,1) |
| `nombre_tag`      | `VARCHAR(100)`| NOT NULL, UNIQUE |

---

## Usuarios

### Tabla: `Usuario`

| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|---------------|---------------|
| `id_usuario`      | `NVARCHAR(50)`| PRIMARY KEY |
| `nombre`          | `VARCHAR(100)`| NOT NULL |
| `apellido_paterno`| `VARCHAR(100)`| NOT NULL |
| `apellido_materno`| `VARCHAR(100)`| NULL |
| `correo`          | `VARCHAR(255)`| NOT NULL, UNIQUE |
| `contraseña`      | `VARCHAR(255)`| NOT NULL |
| `id_tipo_usuario` | `INT`         | NOT NULL, FOREIGN KEY |
| `fecha_creacion`  | `DATETIME`    | DEFAULT GETDATE() |
| `estado`          | `VARCHAR(100)`| DEFAULT 'Activo' |
| `foto_src`        | `NVARCHAR(255)`| NULL |
| `telefono`        | `NVARCHAR(50)`| NULL |
| `recuperacion_token` | `VARCHAR(100)`| NULL |
| `recuperacion_exp`   | `DATETIME`    | NULL |

**Claves Foráneas:**
- `id_tipo_usuario` → `TipoUsuario(id_tipo_usuario)`

---

### Tabla: `Estudiante`

| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|---------------|---------------|
| `id_usuario`      | `NVARCHAR(50)`| PRIMARY KEY, FOREIGN KEY |
| `boleta`          | `VARCHAR(50)` | UNIQUE |
| `carrera`         | `VARCHAR(100)`| NULL |
| `semestre`        | `INT`         | NULL |

**Claves Foráneas:**
- `id_usuario` → `Usuario(id_usuario)` ON DELETE CASCADE

---

### Tabla: `Organizador`

| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|---------------|---------------|
| `id_usuario`      | `NVARCHAR(50)`| PRIMARY KEY, FOREIGN KEY |
| `empresa`         | `VARCHAR(100)`| NULL |
| `cargo`           | `NVARCHAR(250)`| NULL |

**Claves Foráneas:**
- `id_usuario` → `Usuario(id_usuario)` ON DELETE CASCADE

---

## Actividades

### Tabla: `Actividad`

| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|---------------|---------------|
| `id_actividad`    | `INT`         | PRIMARY KEY, IDENTITY(1,1) |
| `id_tipo_actividad`| `INT`        | NOT NULL, FOREIGN KEY |
| `titulo`          | `NVARCHAR(100)`| NOT NULL |
| `descripcion`     | `NVARCHAR(255)`| NOT NULL |
| `profesor`        | `VARCHAR(100)`| NOT NULL |
| `genero`          | `VARCHAR(50)` | NOT NULL |
| `icono`           | `VARCHAR(150)`| NOT NULL |
| `estado`          | `VARCHAR(50)` | DEFAULT 'Activo' |
| `fecha_creacion`  | `DATETIME`    | DEFAULT GETDATE() |

**Claves Foráneas:**
- `id_tipo_actividad` → `TipoActividad(id_tipo_actividad)`

---

### Tabla: `HorarioActividad`

| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|---------------|---------------|
| `id_horario`      | `INT`         | PRIMARY KEY, IDENTITY(1,1) |
| `id_actividad`    | `INT`         | NOT NULL, FOREIGN KEY |
| `dia`             | `VARCHAR(20)` | NOT NULL |
| `hora_inicio`     | `TIME(7)`     | NOT NULL |
| `hora_final`      | `TIME(7)`     | NOT NULL |

**Claves Foráneas:**
- `id_actividad` → `Actividad(id_actividad)` ON DELETE CASCADE

---

## Eventos

### Tabla: `Evento`

| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|---------------|---------------|
| `id_evento`       | `NVARCHAR(50)`| PRIMARY KEY |
| `titulo_evento`   | `VARCHAR(255)`| NOT NULL |
| `descripcion`     | `TEXT`        | NULL |
| `fecha`           | `DATETIME`    | NOT NULL |
| `fecha_final`     | `DATETIME`    | NULL |
| `ubicacion`       | `VARCHAR(255)`| NULL |
| `cupo`            | `INT`         | NOT NULL |
| `id_organizador`  | `NVARCHAR(50)`| NOT NULL, FOREIGN KEY |
| `id_admin`        | `NVARCHAR(50)`| NULL, FOREIGN KEY |
| `id_categoria`    | `INT`         | NOT NULL, FOREIGN KEY |
| `estado`          | `VARCHAR(50)` | DEFAULT 'Pendiente de revision' |
| `fecha_creacion`  | `DATETIME`    | DEFAULT GETDATE() |

**Claves Foráneas:**
- `id_organizador` → `Usuario(id_usuario)`
- `id_admin` → `Usuario(id_usuario)`
- `id_categoria` → `Categoria(id_categoria)`

---

### Tabla: `EventoImagen`

| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|---------------|---------------|
| `id_imagen`       | `INT`         | PRIMARY KEY, IDENTITY(1,1) |
| `id_evento`       | `NVARCHAR(50)`| NOT NULL, FOREIGN KEY |
| `src`             | `NVARCHAR(500)`| NULL |
| `descripcion`     | `TEXT`        | DEFAULT 'Imagen Generica' |

**Claves Foráneas:**
- `id_evento` → `Evento(id_evento)` ON DELETE CASCADE

---

### Tabla: `TagsEvento`

| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|---------------|---------------|
| `id_tag`          | `INT`         | PRIMARY KEY (composite), FOREIGN KEY |
| `id_evento`       | `NVARCHAR(50)`| PRIMARY KEY (composite), FOREIGN KEY |

**Claves Foráneas:**
- `id_tag` → `Tag(id_tag)`
- `id_evento` → `Evento(id_evento)`

---

### Tabla: `InscripcionEvento`

| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|---------------|---------------|
| `id_inscripcion_evento`| `INT`    | PRIMARY KEY, IDENTITY(1,1) |
| `id_usuario`      | `NVARCHAR(50)`| NOT NULL, FOREIGN KEY |
| `id_evento`       | `NVARCHAR(50)`| NOT NULL, FOREIGN KEY |
| `fecha_inscripcion`| `DATETIME`   | DEFAULT GETDATE() |
| `estado`          | `NCHAR(10)`   | NOT NULL, DEFAULT 'Inscrito' |

**Restricciones Adicionales:**
- `UNIQUE (id_usuario, id_evento)`: Un usuario no puede inscribirse dos veces en el mismo evento.

**Claves Foráneas:**
- `id_usuario` → `Usuario(id_usuario)` ON DELETE CASCADE
- `id_evento` → `Evento(id_evento)` ON DELETE CASCADE

---

## Vistas

### Vista: `VW_AlumnoPerfil`

```sql
CREATE VIEW VW_AlumnoPerfil AS
SELECT u.nombre, u.apellido_paterno, u.apellido_materno, u.correo, e.boleta, 
       e.carrera, e.semestre, u.foto_src, u.telefono, tu.nombre_tipo, u.id_usuario
FROM Usuario u
INNER JOIN TipoUsuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario
INNER JOIN Estudiante e ON u.id_usuario = e.id_usuario
WHERE u.id_tipo_usuario = 1;
```

---

### Vista: `VW_OrganizadorPerfil`

```sql
CREATE VIEW VW_OrganizadorPerfil AS
SELECT u.nombre, u.apellido_paterno, u.apellido_materno, u.correo, u.foto_src, u.telefono,
       o.empresa, o.cargo, tu.nombre_tipo, u.id_usuario
FROM Usuario u
INNER JOIN TipoUsuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario
INNER JOIN Organizador o ON u.id_usuario = o.id_usuario
WHERE u.id_tipo_usuario = 2;
```

---

### Vista: `VW_AdminPerfil`

```sql
CREATE VIEW VW_AdminPerfil AS
SELECT u.nombre, u.apellido_paterno, u.id_usuario, u.apellido_materno, u.correo, 
       u.foto_src, tu.nombre_tipo, u.telefono
FROM Usuario u
INNER JOIN TipoUsuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario
WHERE u.id_tipo_usuario = 3;
```