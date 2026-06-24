require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const originesPermitidos = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:5501",
  "http://127.0.0.1:5501"
];

// ── MIDDLEWARES ──────────────────────────────────────────
app.use(cors({
  origin: function (origin, callback) {
    // permite peticiones sin "origin" (como Postman o curl) y las de la lista
    if (!origin || originesPermitidos.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS: " + origin));
    }
  }
}));
app.use(express.json());
// ── DATOS ────────────────────────────────────────────────
// Reemplazar con los artículos reales del grupo
const articulos = [
  {
    id: 1,
    titulo: "Identidades Visuales del uruguay",
    autor: "Rose Gómez",
    categoria: "ARTES VISUALES",
    descripcion: "aca comienza el articulo",
    imagen: "img/pedrofigari.jpg",
  },

  {
    id: 2,
    titulo: "Evolucion de la Literatura Uruguaya",
    autor: "Julieta Falconi",
    categoria: "LITERATURA",
    descripcion: "aca comienza el articulo",
    imagen: "img/onetti2.jpg",
  },

  {
    id: 3,
    titulo: "Titulo del articulo",
    autor: "Luís Díaz",
    categoria: "MÚSICA",
    descripcion: "aca comienza el articulo",
    imagen: "img/drexler2.jpg",
  },

  {
    id: 4,
    titulo: "Titulo del articulo",
    autor: "Fernanda Quijano",
    categoria: "CANDOMBE",
    descripcion: "aca comienza el articulo",
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