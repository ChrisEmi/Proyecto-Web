export const datosActividades = {
  deportivas: {
    id: "deportivas",
    titulo: "Actividades Deportivas",
    descripcion: "Forma parte de nuestros equipos representativos y compite en torneos inter-politécnicos",
    imagen: "../../../assets/actividades-deportivas.jpg",
    subtitulo: "Deporte",
    items: [
      {
        icono: "fa-regular fa-futbol",
        titulo: "Fútbol",
        descripcion: "Se parte experiencias unicas con nosotros en el equipo de fútbol oficial de la ESCOM, y representa los colores de nuestra institución.",
        horarios: [
          { dia: "Martes", hora: "16:00 - 19:00" },
          { dia: "Miercoles", hora: "10:00 - 18:00" },
          { dia: "Viernes", hora: "12:00 - 20:00" }
        ],
        profesor: "Prof. Diego Espinosa Gómez",
        genero: "Masculino/Femenino",
        colorFondo: "bg-gradient-to-r from-escom-100 to-escom-200"
      },
      {
        icono: "fa-solid fa-volleyball",
        titulo: "Voleibol",
        descripcion: "Se parte experiencias unicas con nosotros en el equipo de voleibol oficial de la ESCOM, y representa los colores de nuestra institución.",
        horarios: [
          { dia: "Martes", hora: "12:00 - 19:00" },
          { dia: "Jueves", hora: "12:00 - 18:00" }
        ],
        profesor: "Prof. Hugo Hernández Vera",
        genero: "Masculino/Femenino",
        colorFondo: "bg-escom-200"
      },
      {
        icono: "fa-solid fa-users",
        titulo: "Clubes",
        descripcion: "Los clubes son espacios de convivencia y aprendizaje donde puedes desarrollar tus habilidades y conocer a personas con intereses similares.",
        lista: [
          "Club de Ajedrez",
          "Club de Robótica",
          "Club de Programación",
          "Club de Fotografía",
          "Club de Música"
        ],
        colorFondo: "bg-gradient-to-l from-escom-100 to-escom-200"
      }
    ],
    informes: {
      telefono: "57296000 Ext. 52063",
      correo: "cultura_y_deportes_escom@ipn.mx"
    },
    documentos: [
      {
        nombre: "Procedimiento de registro y gestion de clubes",
        url: "https://www.escom.ipn.mx/SSEIS/serviciosestudiantiles/documentos/SSEIS_ProcedimientoClubes_2022.pdf",
        tipo: "pdf"
      },
      {
        nombre: "Formato para solicitud de material de clubes",
        url: "https://www.escom.ipn.mx/SSEIS/serviciosestudiantiles/documentos/FormatoSolicitudMateriales.xlsx",
        tipo: "excel"
      }
    ],
    estilos: {
      contenedor: "bg-gradient-to-tl from-escom-300 to-escom-100",
      presentacion: "bg-gradient-to-br from-escom-200 to-escom-100",
      boton: "bg-escom-700 text-white hover:bg-escom-900",
      textoTitulo: "text-escom-900",
      textoDescripcion: "text-escom-sombra-400",
      textoSubtitulo: "text-escom-700"
    }
  },
  culturales: {
    id: "culturales",
    titulo: "Actividades Culturales",
    descripcion: "Desarrolla tu creatividad y talento artístico en nuestros talleres culturales",
    imagen: "../../../assets/actividades-culturales.jpg",
    subtitulo: "Cultura",
    items: [
      {
        icono: "fa-solid fa-palette",
        titulo: "Artes Plasticas",
        descripcion: "Aprende a expresar tus emociones y sentimientos por medio de la pintura y el dibujo.",
        horarios: [
          { dia: "Martes", hora: "13:00 - 18:00" },
          { dia: "Viernes", hora: "13:00 - 18:00" }
        ],
        profesor: "Prof. Martha Aurora Torres Hernández",
        colorFondo: "bg-gradient-to-r from-escom-sombra-300 to-escom-700"
      },
      {
        icono: "fa-solid fa-feather-pointed",
        titulo: "Creacion Literaria",
        descripcion: "Podrás adquirir técnicas y métodos para formar hábitos de lectura y escritura. Además prepara a los alumnos para participar en concursos de poesía, cuento, lectura en atril y declamación.",
        horarios: [
          { dia: "Jueves", hora: "12:00 - 19:00" }
        ],
        profesor: "Prof. Hugo Hernández Vera",
        colorFondo: "bg-escom-700"
      },
      {
        icono: "fa-solid fa-masks-theater",
        titulo: "Teatro",
        descripcion: "Aprende a expresarte en público a través de diversas técnicas teatrales, contribuyendo así a un mejor desarrollo integral.",
        horarios: [
          { dia: "Martes", hora: "12:00 - 15:00" },
          { dia: "Jueves", hora: "15:30 - 18:30" }
        ],
        profesor: "Prof. Verónica Hernández",
        colorFondo: "bg-escom-700"
      },
      {
        icono: "fa-solid fa-users",
        titulo: "Clubes",
        descripcion: "Los clubes son espacios de convivencia y aprendizaje donde puedes desarrollar tus habilidades y conocer a personas con intereses similares.",
        lista: [
          "Tuna ESCOM",
          "Algoritmo de baile",
          "Anime"
        ],
        colorFondo: "bg-gradient-to-l from-escom-sombra-300 to-escom-700"
      }
    ],
    informes: {
      telefono: "57296000 Ext. 52063",
      correo: "cultura_y_deportes_escom@ipn.mx"
    },
    documentos: [
      {
        nombre: "Procedimiento de registro y gestion de clubes",
        url: "https://www.escom.ipn.mx/SSEIS/serviciosestudiantiles/documentos/SSEIS_ProcedimientoClubes_2022.pdf",
        tipo: "pdf"
      },
      {
        nombre: "Formato para solicitud de material de clubes",
        url: "https://www.escom.ipn.mx/SSEIS/serviciosestudiantiles/documentos/FormatoSolicitudMateriales.xlsx",
        tipo: "excel"
      }
    ],
    estilos: {
      contenedor: "bg-gradient-to-tl from-escom-sombra-300 to-escom-700",
      presentacion: "bg-gradient-to-bl from-escom-700 via-escom-sombra-50 to-escom-800",
      boton: "bg-white text-escom-900 hover:bg-escom-300",
      textoTitulo: "text-white",
      textoDescripcion: "text-escom-100",
      textoSubtitulo: "text-escom-300"
    }
  }
};
