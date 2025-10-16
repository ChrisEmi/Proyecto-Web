### Tabla: `TipoUsuario`


| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|--------------|---------------|
| `id_tipo_usuario` | `INT`        | PRIMARY KEY, IDENTITY(1,1) |
| `nombre_tipo`     | `VARCHAR(50)`| NOT NULL, UNIQUE |

---

### Tabla: `Usuario`


| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|---------------|---------------|
| `id_usuario`      | `INT`         | PRIMARY KEY |
| `nombre`          | `VARCHAR(100)`| NOT NULL |
| `apellido`        | `VARCHAR(100)`| NOT NULL |
| `correo`          | `VARCHAR(255)`| NOT NULL, UNIQUE |
| `contraseña`      | `VARCHAR(255)`| NOT NULL |
| `id_tipo_usuario` | `INT`         | NOT NULL, FOREIGN KEY |
| `fecha_creacion`  | `DATETIME`    | DEFAULT GETDATE() |

**Claves Foráneas:**
- `id_tipo_usuario` hace referencia a `TipoUsuario(id_tipo_usuario)`.

---

### Tabla: `Estudiante`

| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|---------------|---------------|
| `id_usuario`      | `INT`         | PRIMARY KEY, FOREIGN KEY |
| `matricula`       | `VARCHAR(50)` | UNIQUE |
| `carrera`         | `VARCHAR(100)`| |
| `semestre`        | `INT`         | |

**Claves Foráneas:**
- `id_usuario` hace referencia a `Usuario(id_usuario)` con `ON DELETE CASCADE`.

---

### Tabla: `Organizador`


| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|---------------|---------------|
| `id_usuario`      | `INT`         | PRIMARY KEY, FOREIGN KEY |
| `departamento`    | `VARCHAR(100)`| |

**Claves Foráneas:**
- `id_usuario` hace referencia a `Usuario(id_usuario)` con `ON DELETE CASCADE`.

---

### Tabla: `CategoriaEvento`


| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|---------------|---------------|
| `id_categoria`    | `INT`         | PRIMARY KEY, IDENTITY(1,1) |
| `nombre_categoria`| `VARCHAR(100)`| NOT NULL, UNIQUE |

---

### Tabla: `Evento`


| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|---------------|---------------|
| `id_evento`       | `INT`         | PRIMARY KEY |
| `nombre_evento`   | `VARCHAR(255)`| NOT NULL |
| `descripcion`     | `TEXT`        | |
| `fecha_inicio`    | `DATETIME`    | NOT NULL |
| `fecha_fin`       | `DATETIME`    | NOT NULL |
| `ubicacion`       | `VARCHAR(255)`| |
| `id_organizador`  | `INT`         | NOT NULL, FOREIGN KEY |
| `id_categoria`    | `INT`         | FOREIGN KEY |
| `estado`          | `VARCHAR(50)` | DEFAULT 'Borrador' |
| `fecha_creacion`  | `DATETIME`    | DEFAULT GETDATE() |

**Claves Foráneas:**
- `id_organizador` hace referencia a `Usuario(id_usuario)`.
- `id_categoria` hace referencia a `CategoriaEvento(id_categoria)`.

---

### Tabla: `Inscripcion`

| Nombre de Columna | Tipo de Dato | Restricciones |
|-------------------|---------------|---------------|
| `id_inscripcion`  | `INT`         | PRIMARY KEY |
| `id_usuario`      | `INT`         | NOT NULL, FOREIGN KEY |
| `id_evento`       | `INT`         | NOT NULL, FOREIGN KEY |
| `fecha_inscripcion`| `DATETIME`    | DEFAULT GETDATE() |

**Restricciones Adicionales:**
- `UNIQUE (id_usuario, id_evento)`: Un usuario no puede inscribirse dos veces en el mismo evento.

**Claves Foráneas:**
- `id_usuario` hace referencia a `Usuario(id_usuario)`.
- `id_evento` hace referencia a `Evento(id_evento)` con `ON DELETE CASCADE`.
