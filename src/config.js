/* ============================================================
   CONTENIDO — todo lo que se ve en la página se edita aquí.
   Fuente: Portafolio de servicios y suministros SOLMEC S.A.S.

   Fotos: copia los archivos a public/media/ y escribe la ruta
   (ejemplo: 'media/subestacion.jpg').
   ============================================================ */
export const CONFIG = {
  resaltarPendientes: false,

  marca: {
    nombre: 'SOLMEC S.A.S.',
    descriptor: 'Soluciones mecatrónicas',
    // Icono circular (barra superior y pestaña del navegador): edítalo en public/media/logo-solmec.png
    emblema: 'media/logo-solmec.png',
    // Logo horizontal completo opcional (public/logo-solmec.png). Si pones usarLogoCompleto: true, reemplaza al icono + texto en la barra.
    logo: 'logo-solmec.png',
    usarLogoCompleto: false,
    nit: '901624599-6',
    lema: 'Experiencia · Calidad · Seguridad',
    derechos: 'Todos los derechos reservados. Prohibida su reproducción total o parcial.',
    desarrollador: 'DE ECOZAN'
  },

  // "menu: true" despliega la lista de grupos de servicio (se genera desde servicios.grupos).
  nav: [
    { texto: 'Empresa', href: '#resumen' },
    { texto: 'Capacidades', href: '#capacidades' },
    { texto: 'Servicios', href: '#servicios', menu: true },
    { texto: 'Proyectos', href: '#casos' },
    { texto: 'HSEQ y Normas', href: '#hseq' },
    { texto: 'Obras', href: '#obras' },
    { texto: 'Software', href: '#software' },
    { texto: 'Contacto', href: '#contacto' }
  ],

  hero: {
    eyebrow: 'Generación · Distribución · Potencia · Control · Robótica · Topografía RTK',
    titulo: 'Ingeniería mecatrónica para operaciones que no pueden detenerse.',
    texto: 'Diseño, suministro, instalación y mantenimiento en generación, distribución, potencia, control, robótica, mecánica industrial, hidráulica, neumática, grupos electrógenos y halógenos, energía renovable y fotovoltaica, tuberías SCH 80-40, soldaduras especiales certificadas y calderas pirotubulares, entre otros.',
    sectores: ['Petróleo y gas', 'Industria', 'Comercial y residencial'],
    especialidades: [
      'Generación, distribución y potencia',
      'Control, PLC y robótica',
      'Mecánica industrial, hidráulica y neumática',
      'Grupos electrógenos y halógenos',
      'Energía renovable y fotovoltaica',
      'Tuberías SCH 80 - 40',
      'Soldaduras especiales certificadas',
      'Calderas pirotubulares (instalación y mant.)',
      'Topografía RTK, domótica y CCTV'
    ],
    cta1: ['Solicitar cotización', '#contacto'],
    cta2: ['Explorar 20 servicios', '#servicios'],
    meta: ['16 años de experiencia', '20 líneas de servicio', 'Cumplimiento RETIE · HSEQ', 'Cobertura nacional en campo'],
    // Gemelo digital del héroe: se presenta como piloto interactivo en desarrollo.
    gemelo: {
      franja: 'Gemelo digital · demostrador interactivo',
      nota: 'Prototipo interactivo con lazos de control simulados. Use los controles para probar fallas y alarmas.'
    },
    // Video opcional (MP4 H.264, 1280×800, máx. 15 s, sin audio): aparece como pestaña "Planta".
    medio: { tipo: 'video', src: '', poster: '' }
  },

  // Resumen ejecutivo: solo cifras respaldadas por el portafolio.
  resumen: {
    etiqueta: 'Resumen ejecutivo',
    titulo: 'Ingeniería mecatrónica integral, con un solo responsable.',
    texto: 'SOLMEC S.A.S. es una firma colombiana de ingeniería y soluciones mecatrónicas. Integramos generación, distribución y potencia eléctrica, automatización, control y robótica, mecánica industrial, hidráulica y neumática, grupos electrógenos y halógenos, energía renovable fotovoltaica, tuberías SCH 80-40 con soldaduras especiales certificadas, instalación y mantenimiento de calderas pirotubulares, topografía con dron RTK y domótica/CCTV.',
    cifras: [
      ['16', 'Años de trayectoria comprobada'],
      ['20', 'Líneas de ingeniería y montaje'],
      ['3', 'Sectores estratégicos atendidos'],
      ['5', 'Etapas llave en mano (EPC)']
    ],
    pilares: [
      ['Experiencia en activos críticos', '16 años ejecutando diseño, montaje, comisionamiento (FAT/SAT) y mantenimiento de sistemas mecatrónicos, eléctricos y térmicos.'],
      ['Responsabilidad integral', 'Ciclo completo bajo una misma firma: ingeniería de detalle, procura y suministro, montaje en sitio, puesta en marcha y soporte postventa.'],
      ['Seguridad y rigor normativo', 'Ejecución estricta bajo RETIE, NTC 2050, estándares de instrumentación ISA y protocolos de seguridad industrial HSEQ en campo.']
    ]
  },

  // Carrusel estratégico: capacidades clave para petróleo y gas. Añade o quita diapositivas; el carrusel se ajusta solo.
  capacidades: {
    etiqueta: 'Capacidades estratégicas',
    titulo: 'Lo que aportamos a la operación de petróleo, gas e industria.',
    intro: 'Siete capacidades críticas donde la confiabilidad eléctrica, el control automático, la geomática de precisión y el montaje mecánico se traducen en disponibilidad de planta.',
    items: [
      {
        titulo: 'Respaldo eléctrico crítico y sincronismo',
        texto: 'Grupos electrógenos diésel/gas y tableros de transferencia automática (ATS) con conmutación supervisada para que las cargas esenciales nunca pierdan alimentación.',
        aplicacion: 'Estaciones de bombeo y compresión, baterías de producción, cuartos de control (CCR) y centros de datos industriales.',
        servicios: ['Grupos electrógenos', 'Transferencias ATS', 'Tableros de alarmas (TGA)'],
        foto: 'media/genset.jpg', alt: 'Grupo electrógeno con su tablero de control', enlace: '#grupo-energia'
      },
      {
        titulo: 'Subestaciones y redes de media tensión',
        texto: 'Ingeniería, suministro, montaje, pruebas y radicación ante operadores de red para subestaciones tipo serie 3 y serie 5, y líneas aéreas o subterráneas.',
        aplicacion: 'Alimentación primaria confiable desde el punto de frontera comercial hasta los centros de control de motores (CCM) del campo.',
        servicios: ['Subestaciones serie 3 y 5', 'Redes BT / MT', 'Radicación ante OR'],
        foto: 'media/subestacion.jpg', alt: 'Subestación eléctrica con transformador', enlace: '#grupo-mantenimiento'
      },
      {
        titulo: 'Automatización, PLC, SCADA e instrumentación',
        texto: 'Arquitecturas de control con PLC, HMI, variadores de frecuencia (VFD) e instrumentación de campo, integradas por protocolos industriales hacia supervisión y reportes.',
        aplicacion: 'Control de separación trifásica, inyección de agua/químicos, bombeo multietapa y servicios auxiliares con telemetría en tiempo real.',
        servicios: ['PLC y HMI', 'Variadores e instrumentación', 'Software industrial'],
        foto: 'media/automatizacion.jpg', alt: 'Tableros de control con PLC', enlace: '#grupo-energia'
      },
      {
        titulo: 'Topografía de alta precisión y fotogrametría con Dron',
        texto: 'Levantamientos topográficos en tierra (Estación Total, GPS/GNSS RTK y nivel de precisión) complementados con mapeo aéreo mediante Dron para ingeniería y control de obra.',
        aplicacion: 'Trazado de redes eléctricas BT/MT, servidumbres, corredores de tubería, implantación de facilidades, ortofotos y cálculo de volúmenes.',
        servicios: ['Estación Total y GNSS RTK', 'Fotogrametría con Dron', 'Replanteo de redes y obras'],
        foto: 'media/topografia.jpg', alt: 'Levantamiento topográfico con equipos de alta precisión y Dron', enlace: '#grupo-infraestructura'
      },
      {
        titulo: 'Calidad de potencia y eficiencia energética',
        texto: 'Estudios de calidad de energía y bancos automáticos de condensadores para compensación de reactiva, eliminación de penalidades y alivio térmico de transformadores.',
        aplicacion: 'Baterías de motores de inducción, compresores y sistemas de levantamiento artificial con bajo factor de potencia.',
        servicios: ['Bancos de condensadores', 'Sistemas eléctricos industriales', 'Mantenimiento eléctrico'],
        foto: 'media/mant-electrico.jpg', alt: 'Instalación eléctrica industrial con tablero y HMI', enlace: '#grupo-energia'
      },
      {
        titulo: 'Calderas, vapor y tubería de proceso TIG',
        texto: 'Montaje mecánico, interconexión en acero al carbono e inoxidable con soldadura TIG en argón, puesta en marcha y mantenimiento integral de calderas.',
        aplicacion: 'Generación de vapor y calentamiento de crudo pesado, plantas de alimentos, químicas y facilidades de proceso.',
        servicios: ['Montaje de calderas', 'Mantenimiento de calderas', 'Soldadura TIG en argón'],
        foto: 'media/mant-calderas.jpg', alt: 'Caldera industrial', enlace: '#grupo-mantenimiento'
      },
      {
        titulo: 'Autonomía solar fotovoltaica para sitios remotos',
        texto: 'Sistemas solares aislados (off-grid con bancos de baterías Litio/AGM) e interconectados (on-grid), diseñados para condiciones severas de operación.',
        aplicacion: 'Alimentación autónoma de cabezales de pozo, RTU/telemetría SCADA, sistemas de protección catódica y campamentos.',
        servicios: ['Solar off-grid', 'Solar on-grid', 'Sistemas híbridos Solar + Genset'],
        foto: 'media/solar02.jpg', alt: 'Paneles solares fotovoltaicos en campo', enlace: '#grupo-energia'
      }
    ]
  },

  sectores: {
    etiqueta: 'Sectores',
    titulo: 'Tres sectores, un mismo estándar de ingeniería.',
    intro: 'Del campo petrolero a la planta manufacturera y la edificación inteligente: adaptamos la ingeniería a la criticidad de cada activo.',
    items: [
      {
        nombre: 'Petróleo y gas',
        medio: { tipo: 'foto', ratio: '2/1', src: 'media/sector-petroleo.jpg', alt: 'Operaciones e infraestructura en petróleo y gas' },
        aplicaciones: [
          'Respaldo eléctrico crítico: grupos electrógenos y transferencias automáticas (ATS)',
          'Subestaciones eléctricas serie 3 / serie 5, redes BT/MT y bancos de condensadores',
          'Topografía de alta precisión con GPS RTK, estación total y dron para líneas y facilidades',
          'Automatización de procesos con PLC, HMI, variadores (VFD), tableros TGA y CCTV perimetral',
          'Sistemas solares fotovoltaicos off-grid para instrumentación, RTU y locaciones remotas',
          'Montajes metalmecánicos, skids de proceso, calderas y soldadura TIG en tubería'
        ],
        retos: [
          'Operación continua 24/7 con ventana mínima de parada (shutdown)',
          'Locaciones remotas con topografía compleja y red eléctrica limitada',
          'Cumplimiento estricto de permisos de trabajo, HSEQ y normas RETIE',
          'Integración multiprotocolo entre equipos de distintos fabricantes'
        ]
      },
      {
        nombre: 'Industria y manufactura',
        medio: { tipo: 'foto', ratio: '2/1', src: 'media/sector-industria.jpg', alt: 'Planta industrial y procesos de manufactura' },
        aplicaciones: [
          'Automatización de líneas de producción y máquinas con PLC, HMI y variadores VFD',
          'Montaje, tubería TIG y mantenimiento integral de calderas pirotubulares y acuotubulares',
          'Instalación, nivelación milimétrica y puesta en marcha de maquinaria electromecánica',
          'Topografía industrial de precisión, implantación de naves y mapeo aéreo con dron',
          'Retrofit y modernización de tornos convencionales a control numérico (CNC)',
          'Distribución eléctrica industrial BT/MT, calidad de potencia y CCTV IP de planta'
        ],
        retos: [
          'Alto costo financiero por cada hora de parada no programada',
          'Maquinaria con obsolescencia electrónica que requiere modernización (retrofit)',
          'Penalizaciones por energía reactiva y armónicos en la red de planta',
          'Seguridad operativa y monitoreo visual continuo de áreas críticas'
        ]
      },
      {
        nombre: 'Comercial y residencial',
        medio: { tipo: 'foto', ratio: '2/1', src: 'media/sector-comercial.jpg', alt: 'Edificaciones comerciales y residenciales inteligentes' },
        aplicaciones: [
          'Diseño y ejecución de instalaciones eléctricas internas y externas certificables bajo RETIE',
          'Domótica e inmótica: automatización de iluminación, clima, cortinas, audio y cerraduras',
          'Circuito cerrado de televisión (CCTV IP 4K), analítica de video, alarmas y control de acceso',
          'Levantamientos topográficos con GPS RTK y dron para lotes, urbanismos y condominios',
          'Ingeniería eléctrica, memorias de cálculo y radicación de proyectos ante el operador de red',
          'Sistemas solares on-grid/híbridos, plantas de emergencia y transferencias automáticas'
        ],
        retos: [
          'Aprobación ágil de factibilidad y dictamen de inspección RETIE sin reprocesos',
          'Integración limpia entre energía, domótica, redes Wi-Fi y seguridad electrónica (CCTV)',
          'Continuidad del servicio eléctrico y ahorro mediante autogeneración solar',
          'Protección perimetral, monitoreo remoto 24/7 y confort para los usuarios'
        ]
      }
    ]
  },

  servicios: {
    etiqueta: 'Portafolio de Ingeniería · 20 Líneas',
    titulo: 'Diseño, topografía, suministro, montaje y mantenimiento.',
    intro: 'Veinte líneas de servicio organizadas en tres divisiones operativas. Despliegue cada ficha para consultar especificaciones técnicas y entregables de ingeniería.',
    grupos: [
      {
        id: 'energia',
        nombre: 'Ingeniería, automatización y energía',
        resumen: 'Generación, distribución, potencia, control PLC/HMI, robótica y energía renovable fotovoltaica',
        items: [
          {
            kick: 'Control, PLC y robótica',
            titulo: 'Automatización, control y robótica industrial',
            texto: 'Ingeniería e integración de sistemas de control automático con PLC, pantallas HMI, robótica industrial, variadores de frecuencia (VFD), redes e instrumentación.',
            foto: 'media/automatizacion.jpg',
            alt: 'Tableros de control con PLC y protecciones',
            specs: ['PLC Siemens / Allen-Bradley / Schneider e integración de celdas robóticas', 'Protocolos Modbus TCP/RTU, Profinet, EtherNet/IP y control electroneumático/electrohidráulico', 'Variadores VFD, servocontrol, arrancadores suaves y lazos PID'],
            entregables: ['Planos eléctricos y de control en EPLAN / AutoCAD', 'Código fuente comentado de PLC, HMI y secuencias de control', 'Protocolos de pruebas FAT/SAT y manual de operación']
          },
          {
            kick: 'Energía renovable y fotovoltaica',
            titulo: 'Sistemas solares fotovoltaicos off-grid y on-grid',
            texto: 'Proyectos de energía renovable solar fotovoltaica: dimensionamiento, suministro e instalación de sistemas autónomos (con almacenamiento) e interconectados.',
            foto: 'media/solar.jpg',
            alt: 'Paneles solares fotovoltaicos',
            specs: ['Arquitecturas de energía renovable Off-Grid, On-Grid e Híbridas', 'Inversores MPPT Fronius / Victron Energy y bancos LiFePO4 / Gel', 'Estructuras certificadas y protecciones DC/AC Tipo I y II'],
            entregables: ['Simulación energética y análisis de retorno (ROI)', 'Diagramas unifilares y certificación RETIE', 'Monitoreo remoto de generación y plan de mantenimiento']
          },
          {
            kick: 'Diseño, suministro y montaje',
            titulo: 'Transferencias automáticas (ATS)',
            texto: 'Diseño y ensamble de tableros de transferencia automática (red-red, red-grupo, grupo-grupo) en transición abierta o cerrada para continuidad eléctrica.',
            foto: 'media/transferencia.jpg',
            alt: 'Tableros de transferencia automática',
            specs: ['Conmutación por contactores motorizados o interruptores (ACB/MCCB)', 'Módulos de control Deep Sea Electronics (DSE) / ComAp', 'Supervisión trifásica de tensión, frecuencia, asimetría y secuencia'],
            entregables: ['Tablero rotulado bajo norma y planos esquemáticos', 'Parametrización de tiempos de arranque, transferencia y desfogue', 'Pruebas de conmutación con carga real en sitio']
          },
          {
            kick: 'Generación y respaldo en campo',
            titulo: 'Grupos electrógenos y grupos halógenos',
            texto: 'Suministro, montaje electromecánico, puesta en marcha y mantenimiento de plantas eléctricas diésel/gas y torres de iluminación / grupos halógenos e industriales.',
            foto: 'media/genset.jpg',
            alt: 'Grupo electrógeno y su tablero de control',
            specs: ['Unidades de generación en cabina insonorizada, chasis abierto y grupos halógenos móviles para campo', 'Integración con motores Cummins, Caterpillar y Perkins', 'Telemetría Modbus para monitoreo de combustible, alarmas y horas'],
            entregables: ['Dimensionamiento de cargas de arranque (escalonamiento)', 'Obra mecánica de anclaje, escape y ventilación acústica', 'Protocolo de pruebas en vacío y con carga + capacitación']
          },
          {
            kick: 'Distribución y potencia',
            titulo: 'Sistemas eléctricos de potencia e industria',
            texto: 'Ingeniería e implementación de distribución eléctrica de potencia, fuerza y control en baja y media tensión para plantas industriales y facilidades.',
            foto: 'media/electrico-industrial.jpg',
            alt: 'Canalizaciones eléctricas en planta industrial',
            specs: ['Tableros generales de distribución (TGD) y Centros de Control de Motores (CCM)', 'Canalizaciones en tubería EMT, IMC, Conduit rígido y bandeja portacables', 'Sistemas de puesta a tierra (SPT) y apantallamiento contra descargas'],
            entregables: ['Memorias de cálculo de regulación, cortocircuito y coordinación', 'Planos As-Built y marquillado normalizado de circuitos', 'Dictamen de inspección RETIE vigente']
          },
          {
            kick: 'Diseño, suministro y montaje',
            titulo: 'Bancos de condensadores',
            texto: 'Estudio de calidad de potencia, diseño e instalación de bancos automáticos de condensadores para corrección del factor de potencia y reducción de pérdidas.',
            foto: 'media/condensadores.jpg',
            alt: 'Banco de condensadores',
            specs: ['Reguladores automáticos de pasos por coseno phi (cos φ ≥ 0.96)', 'Condensadores secos autorregenerables de servicio pesado y contactores con resistencias de preinserción', 'Filtros de rechazo / desintonizados ante presencia de armónicos'],
            entregables: ['Medición previa y posterior con analizador de redes eléctricas', 'Cálculo de eliminación de penalidades por energía reactiva', 'Informe termográfico de recepción y ajuste de controlador']
          }
        ]
      },
      {
        id: 'mantenimiento',
        nombre: 'Subestaciones, calderas, tubería SCH y mantenimiento',
        resumen: 'Subestaciones MT, alarmas TGA, calderas pirotubulares, tuberías SCH 80-40 y soldaduras especiales certificadas',
        items: [
          {
            kick: 'Diseño, suministro y montaje',
            titulo: 'Tableros generales de alarmas (TGA)',
            texto: 'Ingeniería y fabricación de tableros anunciadores de alarmas visuales y sonoras para variables críticas de proceso, presión, nivel, temperatura y fuego/gas.',
            foto: 'media/tga.jpg',
            alt: 'Tablero de alarmas con pilotos indicadores',
            specs: ['Secuencias de alarma normalizadas ISA-18.1 (Reconocimiento, Silencio, Prueba)', 'Entradas digitales/analógicas aisladas y respaldo DC ininterrumpido', 'Integración con sirenas industriales y balizas de área clasificada'],
            entregables: ['Matriz Causa-Efecto (C&E) validada con operaciones', 'Planos de conexionado e identificación de borneras', 'Pruebas lazo a lazo (Loop Check) desde sensor hasta anunciador']
          },
          {
            kick: 'Diseño, suministro y montaje',
            titulo: 'Subestaciones eléctricas serie 3 y serie 5',
            texto: 'Proyecto integral de subestaciones de media tensión (13.2 kV / 34.5 kV, serie 3 y serie 5): celdas de entrada/salida, transformación, medida y protecciones.',
            foto: 'media/subestacion.jpg',
            alt: 'Subestación eléctrica con transformador',
            specs: ['Celdas de media tensión (seccionamiento, protección por fusibles HH o interruptor)', 'Transformadores en aceite vegetal/mineral o tipo seco encapsulado', 'Malla de tierra de subestación, barrajes equipotenciales y cerramiento RETIE'],
            entregables: ['Estudio de coordinación de protecciones y arco eléctrico', 'Protocolos de pruebas de aislamiento (Megger), relación de transformación (TTR) y tierras', 'Legalización ante operador de red y dictamen RETIE de media tensión']
          },
          {
            kick: 'Mantenimiento preventivo y correctivo',
            titulo: 'Sistemas eléctricos industriales',
            texto: 'Programas de mantenimiento preventivo, predictivo y atención de emergencias para tableros de fuerza/control, subestaciones, motores y variadores.',
            foto: 'media/mant-electrico.jpg',
            alt: 'Técnico revisando un tablero eléctrico',
            specs: ['Inspección termográfica infrarroja y análisis de puntos calientes', 'Torqueo calibrado de barrajes, limpieza dieléctrica y pruebas de aislamiento', 'Diagnóstico de fallas en variadores de velocidad, arrancadores y lazos de control'],
            entregables: ['Informe técnico fotográfico y termográfico con criticidad de hallazgos', 'Hoja de vida actualizada por equipo intervenido', 'Plan de acción correctivo para asegurar continuidad operativa']
          },
          {
            kick: 'Mantenimiento preventivo y correctivo',
            titulo: 'Mantenimiento de calderas pirotubulares y acuotubulares',
            texto: 'Mantenimiento mecánico, refractario, químico y de control de combustión para calderas pirotubulares, acuotubulares y generadores de vapor.',
            foto: 'media/mant-calderas.jpg',
            alt: 'Caldera industrial pirotubular',
            specs: ['Limpieza mecánica/química de fluxería (lado fuego y lado agua) y cambio de refractarios en calderas pirotubulares', 'Calibración de quemadores (gas/ACPM), tren de válvulas y relación aire-combustible', 'Revisión de columnas de nivel McDonnell, presostatos, válvulas de seguridad y controles de llama'],
            entregables: ['Protocolo de prueba hidrostática de hermeticidad', 'Reporte de ajuste de combustión y seguridades operativas', 'Bitácora técnica de mantenimiento para cumplimiento normativo']
          },
          {
            kick: 'Instalación y montaje llave en mano',
            titulo: 'Instalación de calderas pirotubulares e industriales',
            texto: 'Instalación en sala de máquinas, interconexión de líneas de vapor en tubería SCH 40/80, condensado, alimentación de agua, chimenea y puesta en marcha de calderas pirotubulares.',
            foto: 'media/montaje-calderas.jpg',
            alt: 'Montaje e instalación de caldera pirotubular',
            specs: ['Montaje de calderas pirotubulares, tanque de condensados, suavizadores, bombas de alimentación y distribuidor (manifold)', 'Aislamiento térmico de líneas de vapor con recubrimiento en aluminio/inoxidable', 'Integración del tablero de control de la caldera con las seguridades de planta'],
            entregables: ['Isométricos de tubería de vapor y drenajes', 'Pruebas hidrostáticas y ajuste de válvulas de alivio certificadas', 'Arranque asistido en caliente y entrenamiento a operadores de caldera']
          },
          {
            kick: 'Soldaduras especiales certificadas',
            titulo: 'Tuberías SCH 80 - 40 y soldadura TIG en argón',
            texto: 'Fabricación y montaje de tuberías industriales SCH 80 y SCH 40 con soldaduras especiales certificadas mediante proceso GTAW (TIG con purga de argón), SMAW y MIG.',
            foto: 'media/soldadura.jpg',
            alt: 'Soldadura especial certificada TIG en tubería SCH 80 y SCH 40',
            specs: ['Tuberías de proceso e industriales en acero al carbono (SCH 40 / SCH 80), acero inoxidable (AISI 304/316L) y aleaciones', 'Pase de raíz TIG en argón y acabado sanitario o industrial de alta presión sin porosidad', 'Soldaduras especiales certificadas ejecutadas por soldadores calificados bajo norma ASME / API'],
            entregables: ['Trazabilidad de materiales de aporte y consumibles certificados', 'Inspección visual, líquidos penetrantes y pruebas hidrostáticas de presión', 'Planos isométricos de fabricación y montaje en campo']
          }
        ]
      },
      {
        id: 'infraestructura',
        nombre: 'Infraestructura, topografía, mecánica industrial y domótica',
        resumen: 'Diseños OR, topografía Dron RTK, redes BT/MT, domótica/CCTV, mecánica industrial, hidráulica, neumática y CNC',
        items: [
          {
            kick: 'Diseño y radicación',
            titulo: 'Proyectos eléctricos ante operadores de red',
            texto: 'Ingeniería eléctrica completa, trámites de factibilidad, solicitud de punto de conexión y aprobación de proyectos ante las electrificadoras del país.',
            foto: 'media/disenos.jpg',
            alt: 'Ingeniero revisando planos eléctricos',
            specs: ['Cumplimiento de normas técnicas de operadores de red regionales y nacionales', 'Cálculos de demanda, caída de tensión, cortocircuito, apantallamiento e iluminación', 'Coordinación integral desde la solicitud de disponibilidad hasta la energización'],
            entregables: ['Juego completo de planos eléctricos firmados por ingeniero con matrícula vigente', 'Memorias de cálculo y especificaciones de construcción', 'Oficio de aprobación del diseño por parte del operador de red']
          },
          {
            kick: 'Topografía terrestre y fotogrametría aérea',
            titulo: 'Topografía de alta precisión, GPS RTK y Dron',
            texto: 'Levantamientos topográficos en tierra con equipos de alta precisión (Estación Total, receptores GPS/GNSS RTK Base-Rover y nivel de precisión) y levantamientos aéreos mediante Dron (fotogrametría y mapeo 3D).',
            foto: 'media/topografia.jpg',
            alt: 'Levantamiento topográfico con equipos de alta precisión y Dron',
            specs: [
              'Topografía en tierra de alta precisión: Estación Total electrónica, GPS/GNSS RTK de doble/triple frecuencia (red MAGNA-SIRGAS) y nivelación geométrica',
              'Fotogrametría aérea con Dron (con posicionamiento RTK/PPK): ortofotomosaicos de alta resolución, modelos digitales de terreno (MDT/MDS) y curvas de nivel',
              'Replanteo milimétrico de redes eléctricas BT/MT, servidumbres, tubería, maquinaria, urbanismos y cálculo de volúmenes de corte y lleno'
            ],
            entregables: [
              'Planos topográficos en planta y perfiles longitudinales/transversales (AutoCAD Civil 3D / DWG)',
              'Ortofotomosaico georreferenciado (GeoTIFF), nube de puntos 3D e informe de volumetría',
              'Carteras de campo, fichas de mojones georreferenciados y certificados de calibración de equipos'
            ]
          },
          {
            kick: 'Montaje de infraestructura',
            titulo: 'Redes eléctricas de baja y media tensión',
            texto: 'Construcción, remodelación y tendido de redes eléctricas aéreas y subterráneas en baja y media tensión para campos petroleros, industrias y urbanismos.',
            foto: 'media/redes.jpg',
            alt: 'Linieros trabajando en una red aérea',
            specs: ['Hincado y vestido de postería en concreto, fibra de vidrio o metálica', 'Tendido de cable ACSR, ecológico semiaislado (hendrix) y subterráneo XLPE con terminales premoldeadas', 'Instalación de cortacircuitos, reconectadores, DPS y seccionadores de línea'],
            entregables: ['Pruebas de aislamiento VLF / Megger en cables de media tensión', 'Levantamiento topográfico y planos récord (As-Built) de la red', 'Entrega a satisfacción al operador de red e interventoría']
          },
          {
            kick: 'Diseño, suministro y montaje',
            titulo: 'Sistemas eléctricos residenciales y comerciales',
            texto: 'Instalaciones eléctricas internas y externas, iluminación arquitectónica, tableros de distribución y respaldo energético con estricto apego al reglamento RETIE.',
            foto: 'media/residencial.jpg',
            alt: 'Edificación residencial iluminada',
            specs: ['Balanceo de cargas, protecciones diferenciales (GFCI/AFCI) y supresores de transientes (DPS)', 'Acometidas subterráneas, armarios de medidores, puesta a tierra e infraestructura para carga de vehículos eléctricos', 'Canalizaciones y preinstalación lista para domótica, circuito cerrado (CCTV), respaldo solar o planta de emergencia'],
            entregables: ['Planos eléctricos actualizados y cuadro de cargas por tablero', 'Declaración de cumplimiento RETIE suscrita por el ingeniero constructor', 'Acompañamiento en dictamen de inspección cuando aplica']
          },
          {
            kick: 'Automatización residencial y seguridad electrónica',
            titulo: 'Domótica, inmótica y circuito cerrado (CCTV)',
            texto: 'Automatización inteligente de viviendas, oficinas y comercios integrada con sistemas de videovigilancia IP de alta definición, control de acceso y redes de datos.',
            foto: 'media/domotica.jpg',
            alt: 'Sistema de domótica y circuito cerrado de televisión',
            specs: [
              'Domótica e inmótica: control inteligente de iluminación (escenas y dimerización), climatización, cortinas motorizadas, audio y ahorro energético desde app móvil o voz',
              'Circuito cerrado de televisión (CCTV IP / PoE): cámaras 4K, ColorVu nocturno y PTZ, grabadores NVR y monitoreo remoto encriptado en tiempo real',
              'Analítica inteligente de video (detección perimetral de personas/vehículos), cerraduras digitales, videocitofonía IP, alarmas y redes Wi-Fi Mesh'
            ],
            entregables: [
              'Diseño de cobertura visual sin puntos ciegos y arquitectura de red de datos/PoE',
              'Programación de escenas de confort/seguridad y configuración de aplicación móvil multiusuario',
              'Entrega de sistema rotulado, respaldo de grabaciones y capacitación práctica al cliente'
            ]
          },
          {
            kick: 'Mecánica, hidráulica y neumática',
            titulo: 'Mecánica industrial, hidráulica, neumática y maquinaria',
            texto: 'Montaje, mantenimiento e integración de sistemas de mecánica industrial, centrales hidráulicas, redes neumáticas, actuadores y maquinaria pesada en planta.',
            foto: 'media/maquinaria.jpg',
            alt: 'Montaje de maquinaria, mecánica industrial, hidráulica y neumática',
            specs: ['Sistemas oleohidráulicos y neumáticos industriales: unidades de potencia (HPU), cilindros, electroválvulas proporcionales y unidades FRL', 'Anclaje mecánico, alineación láser/milimétrica de ejes, reductores, bombas, compresores y nivelación de bancadas', 'Acometidas de potencia, control, aire comprimido, vapor y pruebas de seguridad operativa'],
            entregables: ['Esquemáticos hidráulicos/neumáticos y protocolo de comisionamiento mecánico/eléctrico', 'Pruebas de presión, caudal, consumo nominal y vibración en arranque', 'Acta de entrega de equipo y línea de proceso en producción']
          },
          {
            kick: 'Modernización (Retrofit)',
            titulo: 'Tornos convencionales a CNC',
            texto: 'Actualización tecnológica (retrofit) de tornos y máquinas herramienta convencionales a control numérico computarizado (CNC) de alta precisión.',
            foto: 'media/cnc.jpg',
            alt: 'Torno con control numérico',
            specs: ['Instalación de controlador CNC industrial, servomotores AC en ejes X/Z y husillo con variador', 'Adaptación de husillos de bolas recirculantes, encoders ópticos y lubricación centralizada', 'Nuevo gabinete eléctrico con protecciones y botonera ergonómica de operador'],
            entregables: ['Esquemáticos eléctricos del retrofit y respaldo de parámetros CNC', 'Pruebas de repetibilidad geométrica y mecanizado de pieza patrón', 'Capacitación práctica a operarios en programación y operación CNC']
          },
          {
            kick: 'Fabricación y montaje',
            titulo: 'Montajes metalmecánicos industriales',
            texto: 'Diseño, fabricación en taller y montaje en sitio de estructuras metálicas, plataformas de acceso, pasarelas, soportes de tubería (pipe racks) y skids.',
            foto: 'media/metalmecanica.jpg',
            alt: 'Estructuras y plataformas metálicas',
            specs: ['Fabricación en perfiles estructurales ASTM A36 / A500 con soldadura SMAW, MIG y TIG', 'Preparación superficial y aplicación de esquemas de pintura epóxica / poliuretano anticorrosivo', 'Escaleras marinas, barandas y plataformas conforme a normas de trabajo en alturas'],
            entregables: ['Planos de taller y despiece estructural', 'Control dimensional y de recubrimiento anticorrosivo', 'Montaje seguro en campo con maniobras certificadas']
          }
        ]
      }
    ]
  },

  // Casos de ingeniería representativos: muestran cómo SOLMEC integra sus líneas en soluciones llave en mano.
  casos: {
    etiqueta: 'Experiencia y Proyectos Tipo',
    titulo: 'Ingeniería aplicada a retos reales de operación.',
    intro: 'Cuatro configuraciones de proyecto representativas de nuestra trayectoria de 16 años, donde convergen electricidad de potencia, control automático y montaje mecánico.',
    filtros: ['Todos', 'Petróleo y gas', 'Industria', 'Energía y redes'],
    items: [
      {
        codigo: 'EXP-01',
        sector: 'Petróleo y gas',
        titulo: 'Respaldo energético redundante y transferencia automática para facilidad de producción',
        ubicacion: 'Facilidad de superficie · Sector Hidrocarburos',
        foto: 'media/genset.jpg',
        alt: 'Grupo electrógeno y sistema de transferencia automática',
        reto: 'Garantizar continuidad eléctrica 24/7 ante microcortes y caídas de la red rural que detenían las bombas de transferencia y el sistema de instrumentación del campo.',
        solucion: 'Suministro e integración de grupo electrógeno diésel de respaldo con tablero de transferencia automática (ATS) supervisado por módulo Deep Sea Electronics y tablero general de alarmas (TGA) hacia sala de control.',
        entregables: ['Tablero ATS con enclavamiento mecánico/eléctrico', 'Integración Modbus hacia sistema de supervisión', 'Pruebas SAT de transferencia con carga en menos de 12 s'],
        metricas: [
          ['< 12 s', 'Tiempo de toma de carga'],
          ['100 %', 'Disponibilidad en respaldo'],
          ['RETIE', 'Instalación certificada']
        ]
      },
      {
        codigo: 'EXP-02',
        sector: 'Energía y redes',
        titulo: 'Subestación de media tensión y compensación automática de energía reactiva',
        ubicacion: 'Planta de bombeo y procesos · Colombia',
        foto: 'media/subestacion.jpg',
        alt: 'Subestación eléctrica de media tensión',
        reto: 'Ampliar la capacidad instalada de transformación eléctrica y eliminar las penalizaciones mensuales en facturación por bajo factor de potencia (cos φ < 0.84) ocasionado por motores de gran porte.',
        solucion: 'Diseño, radicación ante el operador de red, montaje de subestación eléctrica serie 3/5 y ensamble de banco automático de condensadores con regulador digital de pasos.',
        entregables: ['Ingeniería aprobada por Operador de Red y dictamen RETIE', 'Protocolos de pruebas Megger, TTR y malla de tierra', 'Banco automático ajustado a cos φ ≥ 0.96'],
        metricas: [
          ['0.97', 'Factor de potencia logrado'],
          ['0 $', 'Penalización por reactiva'],
          ['Serie 3/5', 'Estándar de subestación']
        ]
      },
      {
        codigo: 'EXP-03',
        sector: 'Industria',
        titulo: 'Automatización de proceso con PLC/HMI y montaje integral de sala de calderas',
        ubicacion: 'Planta industrial de proceso continuo',
        foto: 'media/mant-calderas.jpg',
        alt: 'Sala de calderas y control industrial',
        reto: 'Modernizar el control manual de generación de vapor y proceso térmico, reduciendo paros por fallas en secuencias de encendido y mejorando la trazabilidad de presiones y temperaturas.',
        solucion: 'Montaje mecánico e interconexión de caldera con soldadura TIG en argón, junto con tablero de control basado en PLC industrial, pantalla táctil HMI para operadores y lazos de seguridad.',
        entregables: ['Tubería de vapor y alimentación soldada en TIG + prueba hidrostática', 'Tablero PLC/HMI con histórico de alarmas y tendencias', 'Entrenamiento a operadores y manuales As-Built'],
        metricas: [
          ['PLC + HMI', 'Control centralizado'],
          ['GTAW / TIG', 'Soldadura de alta pureza'],
          ['FAT / SAT', 'Pruebas protocolizadas']
        ]
      },
      {
        codigo: 'EXP-04',
        sector: 'Petróleo y gas',
        titulo: 'Sistema solar fotovoltaico autónomo (Off-Grid) para telemetría e instrumentación remota',
        ubicacion: 'Locación remota sin acceso a red eléctrica',
        foto: 'media/solar.jpg',
        alt: 'Sistema solar fotovoltaico industrial',
        reto: 'Energizar de manera ininterrumpida equipos de telemetría RTU, instrumentación de cabeza de pozo y comunicaciones en un sitio aislado sin cobertura de la red eléctrica convencional.',
        solucion: 'Diseño e instalación de sistema solar Off-Grid con controladores MPPT industriales, banco de baterías de ciclo profundo, protecciones contra sobretensiones (DPS) y estructura metálica fabricada a medida.',
        entregables: ['Estudio de autonomía energética para días de baja radiación', 'Gabinete intemperie NEMA 4X / IP65 precableado', 'Monitoreo de estado de carga y tensión de baterías'],
        metricas: [
          ['24 / 7', 'Operación autónoma'],
          ['Off-Grid', 'Cero dependencia de red'],
          ['IP65', 'Protección intemperie']
        ]
      }
    ]
  },

  // Bloque de Normatividad, Calidad de Ingeniería y HSEQ
  hseq: {
    etiqueta: 'Rigor Técnico · Normatividad y HSEQ',
    titulo: 'Ingeniería ejecutada bajo estándares de la industria energética.',
    intro: 'En operaciones de petróleo, gas e industria pesada, la seguridad y el cumplimiento normativo no son opcionales. Cada diseño, tablero y montaje de SOLMEC responde a reglamentos técnicos vigentes.',
    normas: [
      {
        sigla: 'RETIE · NTC 2050',
        ambito: 'Seguridad e instalaciones eléctricas',
        detalle: 'Diseños, memorias de cálculo, distancias de seguridad, sistemas de puesta a tierra y selección de materiales certificados para obtención de dictamen de inspección RETIE en baja y media tensión.'
      },
      {
        sigla: 'ISA-5.1 · ISA-101 · IEC 61131-3',
        ambito: 'Automatización, PLC e instrumentación',
        detalle: 'Nomenclatura estandarizada en planos P&ID, programación estructurada de autómatas (PLC), diseño de interfaces HMI orientadas a detección temprana de alarmas y protocolos abiertos (Modbus, OPC UA, Profinet).'
      },
      {
        sigla: 'IEC 61439 · NFPA 70E',
        ambito: 'Tableros industriales y riesgo eléctrico',
        detalle: 'Criterios de ensamble de tableros de distribución, transferencias ATS y CCM con coordinación de protecciones, selectividad, marquillado permanente y prevención de arco eléctrico en maniobras.'
      },
      {
        sigla: 'ASME · GTAW · MAGNA-SIRGAS',
        ambito: 'Procesos térmicos y geomática RTK',
        detalle: 'Procedimientos de soldadura TIG en argón con pruebas hidrostáticas para calderas y tubería, y levantamientos topográficos GNSS/Dron RTK amarrados al marco geocéntrico nacional MAGNA-SIRGAS.'
      }
    ],
    compromisos: [
      ['Gestión SG-SST y Permisos de Trabajo', 'Personal técnico con curso de alturas vigente, manejo de espacios confinados, bloqueo y etiquetado de energías peligrosas (LOTO), operación certificada de UAS/Dron y análisis de trabajo seguro (ATS).'],
      ['Pruebas Protocolizadas FAT y SAT', 'Todo tablero de control, transferencia, red de datos/CCTV o automatización se valida en taller (FAT) antes del despacho y se comisiona en sitio (SAT) junto a la interventoría del cliente.'],
      ['Dossier de Calidad y Planos As-Built', 'Al cierre de cada proyecto entregamos planos récord actualizados, carteras topográficas, certificados de calibración/conformidad de equipos y manuales de operación y mantenimiento.']
    ]
  },

  // Videos de obras. Copia el MP4 a public/media/ y escribe la ruta en "src" (y el título real).
  // Los videos sin "src" solo se ven como espacio pendiente en "npm run dev"; en el sitio publicado se ocultan,
  // y si ninguno tiene "src" la sección completa se oculta.
  obras: {
    etiqueta: 'Obras en video',
    titulo: 'Nuestro trabajo, en campo.',
    intro: 'Una selección de obras ejecutadas por SOLMEC. Toque un video para verlo con sonido.',
    items: [
      {
        titulo: 'Montaje y puesta en marcha de respaldo eléctrico y ATS',
        lugar: 'Facilidad de producción · Colombia',
        src: 'media/obra-1.mp4',
        poster: 'media/genset.jpg',
        ruta: 'media/obra-1.mp4',
        tiktok: ''
      },
      {
        titulo: 'Subestación eléctrica de media tensión y pruebas en sitio',
        lugar: 'Proyecto industrial · Colombia',
        src: 'media/obra-2.mp4',
        poster: 'media/subestacion.jpg',
        ruta: 'media/obra-2.mp4',
        tiktok: ''
      },
      {
        titulo: 'Automatización con tablero PLC, HMI y variadores de frecuencia',
        lugar: 'Planta de procesos · Colombia',
        src: 'media/obra-3.mp4',
        poster: 'media/automatizacion.jpg',
        ruta: 'media/obra-3.mp4',
        tiktok: ''
      },
      {
        titulo: 'Montaje, interconexión y mantenimiento de calderas industriales',
        lugar: 'Planta de vapor · Colombia',
        src: 'media/obra-4.mp4',
        poster: 'media/mant-calderas.jpg',
        ruta: 'media/obra-4.mp4',
        tiktok: ''
      },
      {
        titulo: 'Soldadura especializada en tubería TIG en argón y estructuras',
        lugar: 'Montaje metalmecánico · Colombia',
        src: 'media/obra-5.mp4',
        poster: 'media/soldadura.jpg',
        ruta: 'media/obra-5.mp4',
        tiktok: ''
      }
    ]
  },

  // Marcas: se muestran como nombre. Si algún día tienen el logo autorizado, pongan la ruta en "logo";
  // si la imagen falla, vuelve a mostrarse el nombre.
  marcas: {
    etiqueta: 'Tecnología e Integración Multimarcas',
    titulo: 'Equipos de fabricantes líderes a nivel global.',
    intro: 'Somos integradores independientes: seleccionamos, programamos y operamos la plataforma tecnológica que mejor se adapta al estándar de su proyecto.',
    carrusel: [
      { codigo: '01', nombre: 'Siemens', cat: 'Automatización y PLC', detalle: 'SIMATIC S7-1200 / S7-1500 · TIA Portal · HMI WinCC · Variadores SINAMICS' },
      { codigo: '02', nombre: 'Rockwell Automation', cat: 'Control Industrial', detalle: 'Allen-Bradley · ControlLogix / CompactLogix · Studio 5000 · PowerFlex' },
      { codigo: '03', nombre: 'Schneider Electric', cat: 'Potencia y Maniobra', detalle: 'Modicon PLC · Variadores Altivar · Protecciones MasterPact y TeSys' },
      { codigo: '04', nombre: 'Cummins · Caterpillar · Perkins', cat: 'Generación de Respaldo', detalle: 'Grupos electrógenos diésel y gas para operación continua y emergencia' },
      { codigo: '05', nombre: 'Deep Sea Electronics (DSE)', cat: 'Sincronismo y Transferencia', detalle: 'Controladores inteligentes de ATS, paralelismo de grupos y telemetría' },
      { codigo: '06', nombre: 'WEG · ABB', cat: 'Motores y Accionamientos', detalle: 'Motores industriales W22, arrancadores suaves, variadores y tableros' },
      { codigo: '07', nombre: 'Fronius · Victron Energy', cat: 'Energía Solar Fotovoltaica', detalle: 'Inversores On-Grid, sistemas híbridos y autonomía Off-Grid industrial' },
      { codigo: '08', nombre: 'DJI Enterprise · GNSS RTK', cat: 'Geomática y Fotogrametría', detalle: 'Drones RTK centimétricos, receptores GNSS Base-Rover y Estación Total' },
      { codigo: '09', nombre: 'Hikvision · Dahua · Ubiquiti', cat: 'CCTV IP y Telecomunicaciones', detalle: 'Cámaras IP 4K, analítica perimetral, NVR, control de acceso y radioenlaces' },
      { codigo: '10', nombre: 'Ecosistemas Domótica / KNX', cat: 'Edificaciones Inteligentes', detalle: 'Automatización de iluminación, climatización, audio, escenas y cerraduras' }
    ],
    grupos: [
      {
        nombre: 'Automatización, PLC y Maniobra',
        items: [
          { nombre: 'Siemens', sub: 'SIMATIC S7-1200/1500 · TIA Portal · HMI WinCC · SINAMICS' },
          { nombre: 'Rockwell Automation', sub: 'Allen-Bradley · ControlLogix / CompactLogix · PowerFlex' },
          { nombre: 'Schneider Electric', sub: 'Modicon PLC · Variadores Altivar · Protecciones MasterPact / TeSys' }
        ]
      },
      {
        nombre: 'Generación, Sincronismo y Energía',
        items: [
          { nombre: 'Cummins · Caterpillar · Perkins', sub: 'Grupos electrógenos diésel y gas · Sistemas de respaldo' },
          { nombre: 'Deep Sea Electronics', sub: 'Controladores inteligentes de ATS, grupos y sincronismo DSE' },
          { nombre: 'WEG · Fronius · Victron Energy', sub: 'Motores W22, variadores e inversores solares On-Grid / Off-Grid' }
        ]
      },
      {
        nombre: 'Topografía RTK, Domótica y CCTV',
        items: [
          { nombre: 'DJI Enterprise · GNSS RTK', sub: 'Drones fotogramétricos RTK · Receptores GNSS multifrecuencia y Estación Total' },
          { nombre: 'Hikvision · Dahua · Ubiquiti', sub: 'CCTV IP 4K, analítica de video, NVR, control de acceso y enlaces inalámbricos' },
          { nombre: 'Ecosistemas de Domótica e Inmótica', sub: 'Control inteligente de iluminación, clima, escenas, audio y cerraduras inteligentes' }
        ]
      }
    ],
    nota: 'Las marcas pertenecen a sus respectivos fabricantes y se mencionan como referencia técnica de las plataformas y equipos que integramos, suministramos, operamos y mantenemos.'
  },

  software: {
    id: 'software',
    etiqueta: 'Software Industrial e Industria 4.0',
    titulo: 'Software industrial en operación. Gemelos digitales en piloto.',
    intro: 'Conectamos el piso de planta (OT) con la toma de decisiones gerenciales (IT). Desarrollamos software industrial a medida y modelos de simulación operativa.',
    bloques: [
      {
        estado: 'Servicio activo en operación',
        nombre: 'Software industrial, SCADA y telemetría',
        texto: 'Desarrollo de aplicaciones industriales a medida que adquieren datos directamente de PLC, medidores de energía, controladores de generadores e instrumentación para monitoreo, reportes y gestión de mantenimiento.',
        puntos: [
          'Adquisición de datos multiprotocolo (Modbus TCP/RTU, OPC UA, MQTT, S7, API REST)',
          'Dashboards de supervisión en tiempo real, gestión de alarmas y notificación de eventos',
          'Reportes automatizados de producción, eficiencia OEE y consumo energético (ISO 50001)',
          'Sistemas a medida para gestión de órdenes de mantenimiento y hojas de vida de activos'
        ]
      },
      {
        estado: 'Piloto interactivo en desarrollo',
        piloto: true,
        nombre: 'Gemelos digitales de proceso y energía',
        texto: 'Réplicas dinámicas del proceso físico conectadas a la lógica de control. El demostrador interactivo del inicio permite simular en tiempo real un golpe de flujo en separación trifásica o una falla de red con arranque de grupo electrógeno.',
        puntos: [
          'Comisionamiento virtual: probar y depurar la lógica del PLC/ATS antes de llegar a campo',
          'Entrenamiento de operadores en escenarios de falla crítica sin riesgo para la planta real',
          'Evaluación de modificaciones de setpoints y cuellos de botella antes de intervenir el proceso'
        ],
        cierre: '¿Tiene un proceso crítico que desee modelar? Estamos abiertos a estructurar un piloto conjunto sobre activos reales.',
        enlace: ['Interactuar con el gemelo digital', '#inicio']
      }
    ]
  },

  metodo: {
    etiqueta: 'Metodología de Ejecución',
    titulo: 'Un solo responsable técnico, de la ingeniería a la operación.',
    intro: 'Cada proyecto sigue un ciclo disciplinado de cinco etapas bajo un mismo equipo de ingeniería, eliminando brechas de responsabilidad entre diseñadores, proveedores y montadores.',
    pasos: [
      ['01 · Topografía e Ingeniería', 'Levantamiento con GPS RTK / Dron, planos eléctricos y P&ID, memorias de cálculo y radicación ante el operador de red.'],
      ['02 · Procura y Suministro', 'Selección, importación o suministro de equipos originales, tableros, instrumentación y materiales certificados RETIE.'],
      ['03 · Montaje e Integración', 'Obra electromecánica, tendido de redes, domótica/CCTV, soldadura TIG e instalación en sitio bajo normas HSEQ.'],
      ['04 · Comisionamiento (FAT/SAT)', 'Pruebas en fábrica y en campo, calibración de lazos, ajuste de protecciones, puesta en marcha y entrega de planos As-Built.'],
      ['05 · Mantenimiento y Soporte', 'Planes preventivos, predictivos (termografía y calidad de red) y atención correctiva para sostener la confiabilidad.']
    ]
  },

  contacto: {
    etiqueta: 'Contacto y Licitaciones',
    titulo: 'Hablemos de su próximo proyecto o requerimiento en planta.',
    texto: 'Seleccione el alcance técnico en el configurador para enviarnos una solicitud estructurada de cotización o visita técnica, o contáctenos directamente por nuestros canales corporativos.',
    whatsapp: { numero: '573103501532', texto: 'Atención directa por WhatsApp', mensaje: 'Hola SOLMEC S.A.S., quisiera solicitar información técnica / cotización para un proyecto.' },
    // "href" convierte el dato en enlace; "wa" agrega el botón de WhatsApp para ese número.
    datos: [
      { k: 'Correo corporativo', v: 'ponessolmec@gmail.com', href: 'mailto:ponessolmec@gmail.com' },
      { k: 'Línea 1 · WhatsApp', v: '+57 310 350 1532', href: 'tel:+573103501532', wa: '573103501532' },
      { k: 'Línea 2 · WhatsApp', v: '+57 322 408 8866', href: 'tel:+573224088866', wa: '573224088866' },
      { k: 'Identificación tributaria', v: 'NIT 901.624.599-6' },
      { k: 'Cobertura operativa', v: 'Colombia · Despliegue nacional en campo y planta' }
    ],
    rfq: {
      titulo: 'Configurador de Solicitud Técnica (RFQ)',
      subtitulo: 'Estructure su requerimiento en 30 segundos para recibir respuesta prioritaria de ingeniería.',
      sectores: ['Petróleo y gas', 'Industria y manufactura', 'Comercial / Institucional', 'Residencial / Urbanismo'],
      modalidades: [
        'Proyecto llave en mano (Diseño + Suministro + Montaje)',
        'Mantenimiento preventivo / correctivo / emergencia',
        'Diseño eléctrico / ingeniería / radicación ante OR',
        'Suministro e instalación de equipos',
        'Solicitud de visita técnica en sitio'
      ]
    }
  }
};
