import type { AtlasEntry } from '../types'

export const atlasEntries: AtlasEntry[] = [
  {
    id: 'shire', name: 'La Comarca', kind: 'Lugar', era: 'Tercera Edad', region: 'Eriador',
    summary: 'Colinas verdes, puertas redondas y una vida sencilla que guarda grandes comienzos.',
    detail: 'En el oeste de la Tierra Media, la Comarca es hogar de los hobbits. Sus caminos tranquilos y sus jardines esconden el punto de partida de una de las travesías más extraordinarias.',
    symbol: '❧', palette: 'moss',
  },
  {
    id: 'rivendell', name: 'Rivendel', kind: 'Lugar', era: 'Segunda y Tercera Edad', region: 'Montañas Nubladas',
    summary: 'Un refugio sereno entre montañas, memoria élfica y agua que canta.',
    detail: 'También conocida como Imladris, la última casa acogedora ofrece descanso y consejo a quienes viajan hacia el este. Su belleza reúne naturaleza, música e historias antiguas.',
    symbol: '✧', palette: 'mist',
  },
  {
    id: 'gondor', name: 'Gondor', kind: 'Lugar', era: 'Tercera Edad', region: 'Tierras del Oeste',
    summary: 'Un reino de piedra blanca que vela durante siglos por la frontera de Mordor.',
    detail: 'Gondor es un reino de los Hombres con una larga historia. Minas Tirith, su ciudad más célebre, se eleva en círculos de piedra bajo la sombra del Monte Mindolluin.',
    symbol: '♜', palette: 'starlight',
  },
  {
    id: 'gandalf', name: 'Gandalf', kind: 'Personaje', era: 'Tercera Edad', region: 'Por toda la Tierra Media',
    summary: 'Un viajero de gris que ofrece palabras sabias, fuego y esperanza.',
    detail: 'Gandalf recorre la Tierra Media prestando ayuda y despertando valor en los demás. Su papel rara vez consiste en luchar solo: ayuda a que cada pueblo encuentre su propia fuerza.',
    symbol: '✦', palette: 'mist',
  },
  {
    id: 'galadriel', name: 'Galadriel', kind: 'Personaje', era: 'Primera, Segunda y Tercera Edad', region: 'Lothlórien',
    summary: 'Señora élfica de gran sabiduría, memoria y luz propia.',
    detail: 'Galadriel es una de las figuras élficas más antiguas de la Tierra Media. Su presencia en Lothlórien representa tanto una fuerza serena como el peso de una historia inmensa.',
    symbol: '☾', palette: 'starlight',
  },
  {
    id: 'aragorn', name: 'Aragorn', kind: 'Personaje', era: 'Tercera Edad', region: 'Tierras del Oeste',
    summary: 'Un montaraz del norte cuyo camino lo conduce hacia su herencia.',
    detail: 'Conocido durante años como Trancos, Aragorn protege los caminos lejos de los grandes salones. Su historia enlaza humildad, responsabilidad y el retorno de un rey.',
    symbol: '♔', palette: 'ember',
  },
  {
    id: 'hobbits', name: 'Hobbits', kind: 'Pueblo', era: 'Tercera Edad', region: 'La Comarca',
    summary: 'Un pueblo pequeño de corazón generoso, amante de la paz y las buenas comidas.',
    detail: 'Los hobbits prefieren sus hogares, sus familias y sus costumbres. Las historias de la Tierra Media recuerdan que la valentía puede nacer en los lugares más humildes.',
    symbol: '⌂', palette: 'moss',
  },
  {
    id: 'elves', name: 'Elfos', kind: 'Pueblo', era: 'Desde la Primera Edad', region: 'Tierras inmortales y la Tierra Media',
    summary: 'Los Primeros Nacidos: ligados a la belleza, la memoria y las estrellas.',
    detail: 'Los elfos despiertan antes que los Hombres y atraviesan las edades con una memoria muy larga. Sus culturas y destinos cambian de región en región.',
    symbol: '✧', palette: 'starlight',
  },
  {
    id: 'dwarves', name: 'Enanos', kind: 'Pueblo', era: 'Desde la Primera Edad', region: 'Montañas y ciudades bajo la piedra',
    summary: 'Artesanos tenaces, guardianes de salones profundos y tradiciones antiguas.',
    detail: 'Los Enanos son célebres por la destreza de sus manos y su resistencia. Bajo las montañas construyen salones que parecen contener una noche llena de estrellas.',
    symbol: '◇', palette: 'ember',
  },
]

export const readingPaths = [
  { number: '01', title: 'Una puerta redonda', text: 'Empieza en la Comarca y conoce la mirada pequeña desde la que se abre una historia inmensa.', icon: '⌂', tone: 'moss' },
  { number: '02', title: 'Consejo bajo las estrellas', text: 'Sigue el camino hacia Rivendel, sus antiguos relatos y las decisiones que dan forma al viaje.', icon: '✧', tone: 'mist' },
  { number: '03', title: 'La luz que permanece', text: 'Descubre los reinos, pueblos y esperanzas que sostienen la Tierra Media en sus horas oscuras.', icon: '☾', tone: 'starlight' },
]

export const eras = [
  { name: 'Primera Edad', short: 'I', text: 'Cantos, juramentos y los primeros grandes relatos de los Elfos.' },
  { name: 'Segunda Edad', short: 'II', text: 'El auge de los reinos y el largo eco de decisiones poderosas.' },
  { name: 'Tercera Edad', short: 'III', text: 'Una época crepuscular donde pequeñas compañías cambian el destino.' },
]
