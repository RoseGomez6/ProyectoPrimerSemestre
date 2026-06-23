// variables de entorno
const fs = require("fs");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
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
    categoria: "Artes visuales",
    descripcion: "blablablablablabal",
  },

  {
    id: 2,
    titulo: "Evolucion de la Literatura Uruguaya",
    autor: "Julieta Falconi",
    categoria: "Literatura",
    descripcion: "Idea Vilariño",
  },

  {
    id: 3,
    titulo: "",
    autor: "",
    categoria: "",
    descripcion: "",
  },

  {
    id: 4,
    titulo: "",
    autor: "",
    categoria: "",
    descripcion: "",
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
