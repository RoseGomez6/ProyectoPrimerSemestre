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
    descripcion: `Cuando pensamos en música uruguaya quizás en nuestras cabezas suene el candombe, el rock o la cumbia, pero si nos ponemos a pensar: ¿realmente conocemos el origen de la música uruguaya? Para responder a esa pregunta debemos dar un largo viaje a través del tiempo.
La música en Uruguay ha existido desde siempre, quizás no como la conocemos actualmente, pero anteriormente a la colonización, los charrúas utilizaban variedad de instrumentos para crear diversas melodías. Se conoce que utilizaban trompas, bocinas, tambores y el arco musical —conocido como arco de Tacuabé— para acompañar sus cantos y danzas. Sin embargo, el genocidio material y cultural de los habitantes originarios hizo desaparecer casi todo rastro identificable de una vertiente indígena significativa en la música uruguaya, si bien existen estudios que intentan reconstruir y recuperar sus referencias musicales. Fue así que las primeras expresiones musicales del territorio quedaron casi enteramente borradas por la violencia colonial, dejando un vacío que otras culturas vendrían a llenar.
Posterior a la colonización, en el Montevideo colonial, los pregoneros —vendedores ambulantes o funcionarios públicos que anunciaban sus productos o noticias con la voz— tuvieron un rol clave en la vida sonora de la ciudad. Debido a las altas tasas de analfabetismo de la época, la voz cantada y rítmica de estos personajes funcionó como medio de comunicación masiva, y su influencia se extendió hasta las primeras décadas del siglo XIX, vinculada estrechamente al Virreinato del Río de la Plata.
Lamentablemente, la música uruguaya no fue solo fruto de los cantos de charrúas y pregoneros: nació también mezclando diversas culturas y ritmos, debido al tráfico de personas esclavizadas. Fue así que en nuestras costas llegaron las melodías de la lejana África, principalmente de los pueblos bantúes de Angola y el Congo. En la segunda mitad del siglo XVIII, el Puerto de Montevideo era la única vía de entrada de africanos esclavizados hacia el Virreinato del Río de la Plata, y a fines de ese siglo el 35% de la población montevideana era de ascendencia africana; en sus horas de libertad, recrearon rituales acompañados de músicas y danzas provenientes de su antigua tierra. Los africanos esclavizados utilizaban la música, la danza y los rituales como un intento puro de mantener vivas sus raíces, rebelarse contra la opresión europea y comunicarse entre ellos. Esas melodías, al combinarse y mezclarse entre sí, dieron lugar al nacimiento del candombe. La primera referencia escrita sobre el candombe aparece en el diario Universal en 1834, pero esta expresión artística surgiría mucho antes, con la llegada de los primeros esclavos al puerto de Montevideo; los esclavos, a pesar de su diversa procedencia, encontraron en el candombe una forma de unión y de expresión para reivindicar sus raíces.
Uruguay fue donde más se adoptó y desarrolló el candombe. Los descendientes de los pueblos esclavizados crearon las "llamadas", que significaban literalmente eso: llamados donde se tocaba el tambor e iban de esquina en esquina o de pueblo en pueblo, construyendo comunidad a través del ritmo.
Sin embargo, la identidad musical uruguaya no se construyó únicamente desde las raíces ancestrales del candombe. A finales del siglo XIX y comienzos del XX, dos expresiones completamente distintas comenzaron a tomar forma y a convertirse en pilares fundamentales de la cultura popular: la murga y, décadas más tarde, el rock. En 1909, una modesta compañía de zarzuela procedente de Cádiz llegó a Montevideo para presentarse en el teatro Casino. Un grupo de amigos que fue a ver el espectáculo decidió sacar su propia murga, que llamaron "La Gaditana que se va", compuesta por seis jóvenes humoristas que salían desde la calle Ejido cantando versos referidos a acontecimientos nacionales, extranjeros, políticos y de interés público. Así nació una tradición que con el tiempo trascendería el carnaval para convertirse en una herramienta de crítica social y política, especialmente durante los períodos de represión. La murga fue declarada parte del patrimonio cultural uruguayo en 2010, hoy junto al candombe, conforma una de las manifestaciones culturales más representativas del carnaval montevideano.
Por su parte, el rock llegó al país por una vía completamente diferente. A fines de 1956 llegó a Uruguay la película “Rock Around the Clock”, con la banda sonora de Bill Haley y los Cometas, hecho que movilizó a los jóvenes de la época, quienes bailaron en los cines ante la mirada reaccionaria y sorpresiva de los adultos, sembrando así la semilla del rock and roll en el país. Esta chispa encendió una generación entera: surgieron propuestas locales como "The Blue Kings", venidos desde Paysandú, que eventualmente se transformarían en Los Iracundos, impulsados por la RCA argentina, adoptando una estética rockera con canciones melódicas en español
Recorrer el origen de la música uruguaya es, en realidad, recorrer el origen de nosotros mismos como pueblo. Lo que hoy identificamos como "música uruguaya" no es un producto espontáneo ni homogéneo: es el resultado de siglos de encuentros forzados, resistencias silenciosas y apropiaciones culturales que ocurrieron sobre un territorio marcado por la violencia colonial. El candombe no nació como entretenimiento, nació como supervivencia. La murga no nació como arte, nació como necesidad de decir lo que no se podía decir de otra manera. El rock no nació como identidad local, llegó desde afuera y fue apropiado y transformado por jóvenes que necesitaban una voz propia.
Esto nos obliga a hacernos una pregunta importante ¿puede existir una identidad cultural sin conflicto? La historia de la música uruguaya sugiere que no. Cada género que hoy celebramos como propio emergió de una tensión: entre opresor y oprimido, entre lo importado y lo local, entre la tradición y la ruptura. En ese sentido, la música no es sólo patrimonio cultural, sino también memoria histórica viva. Ignorar de dónde viene es, en cierta medida, ignorar quiénes somos. Conocer su origen, en cambio, nos permite entender que la identidad uruguaya no se heredó, se construyó, y se sigue construyendo, en cada tambor, en cada tablado y en cada acorde de guitarra.`,
    imagen: "img/drexler2.jpg",
  },

  {
    id: 4,
    titulo: "Titulo del articulo",
    autor: "Fernanda Quijano",
    categoria: "CANDOMBE",
    descripcion: `El candombe es una de las expresiones culturales más representativas del Uruguay y constituye un legado fundamental de las comunidades afrodescendientes. Su origen se encuentra estrechamente relacionado con la llegada de personas africanas esclavizadas al territorio rioplatense durante los siglos XVIII y XIX. A pesar de las condiciones de opresión y exclusión a las que fueron sometidas, estas comunidades lograron preservar gran parte de sus tradiciones culturales, convirtiendo la música y la danza en formas de expresión, resistencia e identidad.
Durante el período colonial, las personas africanas y sus descendientes se organizaron en agrupaciones conocidas como "naciones", espacios donde mantenían sus costumbres, creencias y prácticas culturales. En estas reuniones, los tambores adquirieron un papel central como instrumentos de comunicación, celebración y preservación de la memoria colectiva. A partir de estas prácticas surgió el candombe, que desde sus orígenes representó una forma de resistencia cultural y de afirmación de la identidad afrodescendiente.
Luego de la abolición de la esclavitud en Uruguay en 1842, el candombe continuó desarrollándose principalmente en los barrios Sur y Palermo de Montevideo, donde residían importantes comunidades afro-uruguayas. En estos espacios se consolidaron las tradicionales cuerdas de tambores, integradas por el tambor chico, el repique y el piano, cuya combinación rítmica caracteriza al candombe hasta la actualidad.
A lo largo del siglo XIX y gran parte del siglo XX, el candombe ocupó un lugar fundamental en la vida social y cultural de las comunidades afrodescendientes. Las llamadas, originalmente utilizadas como forma de convocatoria mediante el sonido de los tambores, evolucionaron hasta convertirse en una de las principales expresiones culturales del país. Asimismo, surgieron figuras tradicionales como la Mama Vieja, el Gramillero y el Escobero, personajes que simbolizan distintos aspectos históricos y culturales de la experiencia afro-uruguaya.
Con el paso del tiempo, el candombe trascendió el ámbito de las comunidades afrodescendientes y pasó a formar parte de la identidad cultural uruguaya. Su presencia en el carnaval, en los desfiles y en diversas manifestaciones artísticas demuestra la influencia que ha tenido en la construcción de la cultura nacional. Además, ha contribuido a fortalecer los valores comunitarios, la transmisión intergeneracional de conocimientos y el reconocimiento de la diversidad cultural.
El estudio del candombe permite comprender la importancia de los aportes afrodescendientes en la historia del Uruguay. Esta manifestación cultural no solo representa una expresión artística, sino también un proceso histórico de resistencia, memoria y construcción de identidad colectiva. Su permanencia hasta la actualidad demuestra la capacidad de las comunidades afro-uruguayas para preservar sus tradiciones y transmitirlas a nuevas generaciones.
En la actualidad, el candombe continúa siendo un símbolo de identidad, inclusión y diversidad cultural. Sin embargo, su valoración debe ir más allá de su reconocimiento artístico o turístico, promoviendo también el conocimiento de la historia y de las comunidades que le dieron origen. Reconocer el valor histórico y social del candombe implica comprender su importancia como patrimonio cultural y como una expresión viva de la memoria colectiva uruguaya.
En conclusión, el candombe constituye una de las expresiones culturales más significativas del Uruguay. Desde sus orígenes vinculados a la resistencia de las comunidades africanas esclavizadas hasta su reconocimiento como símbolo nacional, ha desempeñado un papel fundamental en la construcción de la identidad cultural uruguaya, consolidándose como un patrimonio histórico y social de gran relevancia para el país.
`,
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
