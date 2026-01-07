export const RUTAS_HOME = (cerrarMenu) => [
  { href: "/#inicio", label: "Inicio", onClick: cerrarMenu },
  { href: "/#section-horizontal", label: "Presentación", onClick: cerrarMenu },
  { href: "/#contacto", label: "Contacto", onClick: cerrarMenu },
];

export const RUTAS_AGENDA = (cerrarMenu) => [
  {
    to: "/eventos/explorar",
    label: "Explorar",
    onClick: cerrarMenu,
  },
  { to: "/eventos/eventos", label: "Eventos", onClick: cerrarMenu },
  {
    to: "/eventos/calendario",
    label: "Calendario",
    onClick: cerrarMenu,
  },
];

export const RUTAS_PANEL = {
  Administrador: (cerrarMenu) => [
    { to: "/control/admin/usuarios", label: "Usuarios", onClick: cerrarMenu },
    { to: "/control/admin/eventos", label: "Eventos", onClick: cerrarMenu },
    {
      to: "/control/admin/crear-usuario",
      label: "Crear Usuario",
      onClick: cerrarMenu,
    },
    { to: "/control/admin/ajustes", label: "Ajustes", onClick: cerrarMenu },
  ],
  Organizador: (cerrarMenu) => [
    { to: "/organizador/calendario", label: "Calendario", onClick: cerrarMenu },
    { to: "/organizador/eventos", label: "Mis Eventos", onClick: cerrarMenu },
    {
      to: "/organizador/crear-evento",
      label: "Crear Evento",
      onClick: cerrarMenu,
    },
  ],
  Estudiante: (cerrarMenu) => [
    { to: "/alumno/calendario", label: "Calendario", onClick: cerrarMenu },
    { to: "/alumno/mis-eventos", label: "Mis Eventos", onClick: cerrarMenu },
  ],
};

export const RUTAS_CUENTA = {
  sinSesion: (cerrarMenu) => [
    { to: "/login", label: "Iniciar Sesión", onClick: cerrarMenu },
    { to: "/registro", label: "Registrarse", onClick: cerrarMenu },
  ],
  Administrador: (cerrarMenu) => [
    { to: "/control/admin/inicio", label: "Inicio", onClick: cerrarMenu },
    { to: "/control/admin/perfil", label: "Perfil", onClick: cerrarMenu },
  ],
  Organizador: (cerrarMenu) => [
    { to: "/organizador/inicio", label: "Panel", onClick: cerrarMenu },
    { to: "/organizador/perfil", label: "Perfil", onClick: cerrarMenu },
    { to: "/organizador/ajustes", label: "Ajustes", onClick: cerrarMenu },
  ],
  Estudiante: (cerrarMenu) => [
    { to: "/alumno/inicio", label: "Panel", onClick: cerrarMenu },
    { to: "/alumno/perfil", label: "Perfil", onClick: cerrarMenu },
    { to: "/alumno/ajustes", label: "Ajustes", onClick: cerrarMenu },
  ],
};

export const RUTAS_INICIO_POR_ROL = {
  Administrador: "/control/admin/inicio",
  Organizador: "/organizador/inicio",
  Estudiante: "/alumno/inicio",
  default: "/",
};

export const RUTAS_PERFIL_POR_ROL = {
  Administrador: "/control/admin/perfil",
  Organizador: "/organizador/perfil",
  Estudiante: "/alumno/perfil",
};

export const ICONOS_ROL = {
  Administrador: { icon: "fa-solid fa-user-shield", color: "text-blue-400" },
  Organizador: { icon: "fa-solid fa-user-tie", color: "text-yellow-400" },
  Estudiante: { icon: "fa-solid fa-user-graduate", color: "text-purple-400" },
};
