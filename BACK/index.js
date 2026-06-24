// variables de entorno
const fs = require("fs");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5500";
// ── MIDDLEWARES ──────────────────────────────────────────
app.use(cors());
app.use(express.json());
// ── DATOS ────────────────────────────────────────────────

const articulos = [
  {
    id: 1,
    titulo: "Identidades Visuales del uruguay",
    autor: "Rose Gómez",
    categoria: "ARTES VISUALES",
    descripcion: "aca comienza el articulo",
  },

  {
    id: 2,
    titulo: "Evolucion de la Literatura Uruguaya",
    autor: "Julieta Falconi",
    categoria: "LITERATURA",
    descripcion: "aca comienza el articulo",
  },

  {
    id: 3,
    titulo: "Titulo del articulo",
    autor: "Luís Díaz",
    categoria: "MÚSICA",
    descripcion: "aca comienza el articulo",
  },

  {
    id: 4,
    titulo: "Titulo del articulo",
    autor: "Fernanda Quijano",
    categoria: "CANDOMBE",
    descripcion: "aca comienza el articulo",
  },
];

const articulo = http.createServer((req, res) => {
  // Permite peticiones desde cualquier origen (CORS).
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Petición "preflight" de CORS.
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- Endpoint: GET /api/hola -> responde "hola mundo" ---
  if (req.method === "GET" && req.url === "/articulos") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(articulos));
    return;
  }

 // --- Endpoint: GET /api/palabras -> responde el array de palabras ---
  if (req.method === "GET" && req.url === "/articulos") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(articulos));
    return;
  }

// --- Endpoint: POST /api/palabras -> agrega una palabra al mismo array ---
  if (req.method === "POST" && req.url === "/articulos") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      let articulo = "";
      try {
        articulo = JSON.parse(body).articulo;
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ error: "JSON inválido" }));
        return;
      }

// Guarda la palabra recibida en el array que ya existe.
      if (articulo) {
        articulos.push(articulo);
      }

      console.log("Articulo agregado:", articulo, "-> array actual:", articulo);

      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(articulo));
    });
    return;
  }

   // --- Endpoint: POST /api/mensaje -> recibe el mensaje del input ---
  if (req.method === "POST" && req.url === "/articulos") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      let mensajeRecibido = "";
      try {
        mensajeRecibido = JSON.parse(body).mensaje;
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ error: "JSON inválido" }));
        return;
      }

      console.log("Mensaje recibido del frontend:", mensajeRecibido);

      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(
        JSON.stringify({
          ok: true,
          recibido: mensajeRecibido,
        })
      );
    });
    return;
  }

   // --- Archivos estáticos (index.html, script.js) ---
  const articulo = req.url === "/" ? "/portada.html" : req.url;
  const rutaArticulo = path.join(__dirname, archivo);

  fs.readFile(rutaArchivo, (err, contenido) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 - No encontrado");
      return;
    }
    const tipos = { ".html": "text/html", ".js": "text/javascript" };
    const tipo = tipos[path.extname(rutaArchivo)] || "text/plain";
    res.writeHead(200, { "Content-Type": tipo + "; charset=utf-8" });
    res.end(contenido);
  });
});

server.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

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
  const { titulo, autor, categoria, descripcion } = req.body;

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
  };
  articulos.push(nuevo);
  fs.writeFileSync("articulos.json", JSON.stringify(articulos, null, 2));
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
