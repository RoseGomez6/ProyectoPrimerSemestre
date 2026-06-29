require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const originesPermitidos = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:5501",
  "http://127.0.0.1:5501",
];

// ── MIDDLEWARES ──────────────────────────────────────────
app.use(
  cors({
    origin: function (origin, callback) {
      // permite peticiones sin "origin" (como Postman o curl) y las de la lista
      if (!origin || originesPermitidos.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS: " + origin));
      }
    },
  }),
);
app.use(express.json());
// ── DATOS ────────────────────────────────────────────────
// Reemplazar con los artículos reales del grupo
const articulos = [
  {
    id: 1,
    titulo: "Identidades Visuales del uruguay",
    autor: "Rose Gómez",
    categoria: "ARTES VISUALES",
    descripcion: `Las artes visuales en Uruguay comienzan a desarrollarse por influencias y corrientes artísticas europeas, en base a una búsqueda de identidad nacional. A través de la pintura y el dibujo, distintos creadores buscaron representar la realidad social, las costumbres y los valores que caracterizan al país, definiendo una imagen propia de la nación. El cambio cultural comenzó con figuras clave que viajaron a Europa a fines del siglo XIX y comienzos del siglo XX, absorbiendo las manifestaciones artísticas como el modernismo y el cubismo, adaptándose a la vida rioplatense. 
Dos artistas fundamentales se destacan en ésta época: Joaquín Torres García y Pedro Figari. Sus estilos e iniciativa fueron diferentes, pero ambos contribuyeron a la creación de una identidad uruguaya que ha prevalecido en el tiempo. En pocas palabras, para entender el desarrollo artístico del país, estos dos artistas son un punto de partida inevitable.
Joaquín Torres García nació en Montevideo, Uruguay en 1874. Tenía la idea de que América Latina debía desarrollar un arte propio. A su regreso de París en 1934, fundó la Escuela del Sur y marcó un antes y un después en el arte latinoamericano. Fue el creador del estilo que se denominó universalismo constructivo. Torres consideraba que las obras pueden orientarse hacia lo figurativo o abstracto sin perder los valores plásticos de la creación artística. Algunos críticos lo definieron como un "buscador" que renuncia a los valores adquiridos, centrando su objetivo en el abandono de la imitación para alcanzar lo creativo.
Su paleta de colores se caracteriza por el uso de colores primarios, y uno de sus rasgos característicos es el empleo de las líneas vertical y horizontal. La vertical representa lo espiritual, la horizontal la naturaleza, y en la intersección de ambas está el hombre. Dentro de los planos que se forman, siempre construídos con proporción áurea, se manifiestan emblemas del patrimonio nacional y figuras geométricas. Utiliza símbolos y pictogramas (peces, anclas, el sol, hombres) y los representa con orden, estructura y abstracción. Torres define su obra como una superficie organizada, en la que todas las partes se relacionan entre sí y con el todo. No trabaja con perspectiva, utiliza la bidimensionalidad. Para Torres García el arte no debe copiar la naturaleza, pero tampoco la debe negar. 
Pedro Figari nació en Montevideo, Uruguay en 1861. Se consagra como artista plástico en París, y vuelve a Montevideo en 1933 con una gran producción artística. Se lo considera uno de los pintores más importantes de Latinoamérica por desarrollar un lenguaje pictórico propio y particular, con influencia del impresionismo y expresionismo europeo.
Figari pinta un mundo que está vinculado a una técnica europea pero que retrata temas propios de nuestra cultura y nuestro pasado, con escenas de la vida cotidiana uruguaya. Rescató la memoria y las tradiciones nacionales. Se destacó por su enfoque post-impresionista, capturando con un estilo único escenas cotidianas, gauchos, bailes afro-uruguayos, candombe, la vida rural y colonial. Sus obras tienen colores cálidos, se caracteriza por ser vibrante y espontánea, y no tiene líneas definidas sino que crea manchas con el pincel. Predomina en ellas el movimiento, y no recurre al boceto previo sino que se desprende directamente del pincel con mucha intuición de color. Utiliza la proporción áurea guiándose por las casas, balcones y puertas para ubicar los personajes en el paisaje. Es una obra que puede considerarse como cinematográfica, porque narra momentos imaginados por el autor. 
El pasado rioplatense es capturado por ambos artistas. Torres García mediante un estilo místico que guarda ritmo, geometría y armonía, y Pedro Figari evocando a la emoción plasmando la esencia del hombre latinoamericano. Los dos fueron pilares fundamentales para la construcción de una identidad artística nacional. Aunque sus estilos fueron muy distintos, ambos lograron integrar influencias de Europa con elementos de la cultura uruguaya, creando obras auténticas, distintivas y representativas para su tiempo, pero dejando también un legado que permanece hasta el presente. 
Ambos reflexionan y plasman en sus lienzos de forma única y especial nuestra cultura. Figari retrata la identidad latinoamericana con escenas como el candombe, el campo con sus gauchos, bailes afroamericanos y raíces mestizas, reivindicando éste grupo social y destacando su rol. Torres García pinta principalmente soles, peces, hombres, ciudades y anclas de nuestro Río de la Plata. Su obra “América Invertida” es una de las más conocidas, y no es solo un símbolo estético sino un poderoso manifiesto político y social. Representa identidad y una personalidad con postura firme de que América es única e independiente, invertida porque no hay un norte que mande y nos defina. Dice Torres: “Nuestro norte es el Sur”. Ambos compartían esta misma sensibilidad y reflexión, de que en el norte y “arriba” (en las clases sociales) no había mejor, peor o más, rescatando lo que aún no se había visto en pinturas, creando identidad  y reforzando nuestra cultura.
Lo que ellos representan al pintar es parte de lo que en nuestra nación ha prevalecido hasta el presente, por tanto seguimos interpretando su arte como patrimonio nacional, seguimos conectados y  guiándonos por su influencia y elección pictórica. Gracias a la obra de ambos, Uruguay tiene una tradición artística que se reconoce y es inspiración en latinoamérica y en todo el mundo.`,
    imagen: "img/pedrofigari.jpg",
  },

  {
    id: 2,
    titulo: "Evolucion de la Literatura Uruguaya",
    autor: "Julieta Falconi",
    categoria: "LITERATURA",
    descripcion: `
En este texto se analizan las principales corrientes literarias que marcaron los inicios de la literatura uruguaya y contribuyeron a la construcción de una identidad nacional.

Los orígenes de la literatura uruguaya se remontan a comienzos del siglo XIX. Uno de los primeros géneros literarios que surgieron en nuestro país fue la poesía gauchesca con Bartolomé Hidalgo como referente, autor de los famosos cielitos que relataban lo que sucedía en la época. Este género utiliza el lenguaje y las costumbres de los gauchos para expresar ideas políticas, sociales y culturales. 

Por otro lado, surgió el Clasicismo, movimiento de origen europeo donde los escritores clásicos consideraban que el arte debía seguir reglas precisas y transmitir enseñanzas morales. En Uruguay y en el Río de la Plata, el clasicismo tuvo influencia durante las primeras décadas del siglo XIX. Los autores imitaban modelos europeos y utilizaban un lenguaje cuidado y formal. Sus obras tratan temas patrióticos, históricos y educativos.

A su vez llega el romanticismo a Uruguay hacia 1838, influenciado por escritores argentinos exiliados que se establecieron en Montevideo y Colonia del Sacramento. Este movimiento literario se caracterizó por exaltar los sentimientos, la libertad, el patriotismo y la identidad nacional. Su primer representante uruguayo fue Adolfo Berro, y más tarde se destacaron autores como Juan Zorrilla de San Martín.  Los escritores románticos eligieron temas propios de América, incorporando personajes como el gaucho y el indígena, así como paisajes característicos y promovieron una mayor libertad en la forma de escribir. 

El Realismo fue uno de los movimientos literarios más importantes del siglo XIX y tal y como señala el texto “El realismo y el romanticismo como movimientos literarios” de Marisa Guzmán Polita, el Realismo fue un movimiento literario y artístico que surgió como una reacción al Romanticismo. Mientras los románticos privilegiaban los sentimientos y la subjetividad, los realistas buscaron representar la realidad de manera objetiva y fiel. Uno de los principales representantes del Realismo fue Eduardo Acevedo Díaz que fue considerado una figura fundacional de la narrativa nacional. Su obra combinó la reconstrucción literaria del pasado con una reflexión sobre la identidad uruguaya, lo que lo convirtió en uno de los autores más influyentes de la literatura del país. 

A continuación surgió el modernismo, fue un movimiento literario que surgió a fines del siglo XIX y principios del siglo XX,  tuvo entre sus más importantes representantes a Rubén Darío, José Martí y José Enrique Rodó. El Modernismo fue importante porque marcó una renovación de la literatura uruguaya y sirvió de puente entre los movimientos del siglo XIX, como el Romanticismo y el Realismo y las corrientes literarias más modernas. Delmira Agustini fue una poeta de nuestro país perteneciente al Modernismo. Su obra se caracterizó por expresar sentimientos intensos, especialmente el amor, la pasión, el deseo y la muerte, con un lenguaje musical, simbólico y muy cuidado. 

Como respuesta a los cambios culturales y artísticos del siglo XX, surgió la vanguardia, un movimiento que buscó romper con las formas tradicionales de hacer arte y literatura, promoviendo la innovación y la experimentación. En el país esta comenzó a consolidarse alrededor de 1927, impulsada por obras de inspiración futurista y por escritores interesados en experimentar con nuevos recursos literarios. A diferencia de las vanguardias europeas, en Uruguay esta renovación convivió con la valoración de la identidad nacional y las raíces criollas. La revista La Pluma (1927-1931) fue el principal espacio de difusión de estas nuevas ideas, promoviendo un arte moderno, abierto a las corrientes internacionales y, al mismo tiempo, comprometido con una identidad cultural americana. Su desaparición en 1931 marcó el fin de una de las etapas más importantes de la vanguardia uruguaya.

A mediados del siglo XX, la literatura uruguaya vivió una etapa de gran desarrollo con la aparición de la Generación del 45. Este grupo de escritores, poetas y críticos renovó la producción literaria del país mediante una escritura rigurosa, una mirada crítica sobre la realidad y una constante búsqueda de excelencia artística. Su influencia convirtió a esta generación en una de las más importantes de la historia de la literatura uruguaya. Dentro de la Generación, Idea Vilariño y Juan Carlos Onetti fueron dos de sus figuras más representativas. Ambos compartieron el rigor literario y la actitud crítica que caracterizaron al movimiento, aunque desarrollaron estilos muy diferentes. Vilariño se destacó por una poesía breve, intensa y de gran profundidad emocional, centrada en temas como el amor, la soledad, la muerte y el paso del tiempo. Onetti, en cambio, renovó la narrativa con novelas y cuentos de personajes complejos, ambientes opresivos y una visión pesimista de la existencia. 

Por último  tenemos la literatura de la dictadura, un período marcado por la censura, la persecución política y el exilio. En este contexto, la literatura se convirtió en una forma de resistencia y denuncia. Muchos escritores fueron censurados, encarcelados o debieron abandonar el país, por lo que recurrieron a símbolos y metáforas para expresar sus críticas al régimen. Entre los autores más representativos se encuentran Mario Benedetti, Eduardo Galeano, Cristina Peri Rossi e Idea Vilariño. Tras el regreso de la democracia, muchas obras se enfocaron en recuperar la memoria de ese período y reflexionar sobre sus consecuencias. 

La evolución de la literatura uruguaya muestra cómo cada movimiento reflejó los conflictos, valores y preocupaciones de su época, contribuyendo a la construcción de una identidad nacional. Aunque muchas corrientes tuvieron origen europeo, los escritores uruguayos las adaptaron a su propia realidad, incorporando temas, personajes y paisajes locales. Esto demuestra que la literatura no es solo una expresión artística, sino también una herramienta para comprender la historia, la cultura y las transformaciones de la sociedad. Además, estas corrientes no solo representan la identidad uruguaya, sino que también la cuestionan y la redefinen constantemente, mostrando que la idea de nación es una construcción cultural en permanente cambio.


`,
    imagen: "img/vilariño.jpg",
  },

  {
    id: 3,
    titulo: "Música Uruguaya como expresión de identidad cultural",
    autor: "Luís Díaz",
    categoria: "MÚSICA",
    descripcion: ``,
    imagen: "img/drexler2.jpg",
  },

  {
    id: 4,
    titulo: "Titulo del articulo",
    autor: "Fernanda Quijano",
    categoria: "CANDOMBE",
    descripcion: ``,
    imagen: "img/candombe.jpg",
  },
];
// ── RUTAS ────────────────────────────────────────────────
// GET /articulos → devuelve todos los artículos
app.get("/articulos", (req, res) => {
  res.json(articulos);
});
// GET /articulos/:id → devuelve un artículo por id
app.get("/articulos/:id", (req, res) => {
  const id = Number(req.params.id);
  const articulo = articulos.find((a) => a.id === id);
  if (!articulo) {
    return res.status(404).json({ error: "Artículo no encontrado" });
  }
  res.json(articulo);
});
// POST /articulos → crea un artículo nuevo
app.post("/articulos", (req, res) => {
  const { titulo, autor, categoria, descripcion, imagen, fecha } = req.body;

  if (!titulo || !autor || !descripcion) {
    return res.status(400).json({
      error: "Los campos título, autor y descripción son obligatorios",
    });
  }
  const nuevo = {
    id: articulos.length + 1,
    titulo,
    autor,
    categoria: categoria || "Sin categoría",
    descripcion,
    imagen: imagen || "",
    fecha: fecha || "",
  };
  articulos.push(nuevo);
  res.status(201).json(nuevo);
});
// ── 404 ──────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});
// ── ERROR HANDLER ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Error interno del servidor" });
});
// ── INICIAR SERVIDOR ──────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
