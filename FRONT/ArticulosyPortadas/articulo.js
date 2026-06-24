const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  cargarArticulo();
});

async function cargarArticulo() {
  // 1. Leemos el "id" que viene en la URL (ej: articulo.html?id=3 → id = "3")
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get("id");

  if (!id) {
    mostrarError("No se especificó qué artículo mostrar.");
    return;
  }

  try {
    // 2. Le pedimos al backend ESE artículo en particular
    const respuesta = await fetch(`${API_URL}/articulos/${id}`);
    const articulo = await respuesta.json();

    if (!respuesta.ok) {
      mostrarError(articulo.error || "No se pudo encontrar el artículo.");
      return;
    }

    // 3. Rellenamos los elementos del HTML con los datos del artículo
    document.getElementById("titulo-articulo").textContent = articulo.titulo;
    document.getElementById("categoria-articulo").textContent = articulo.categoria;
    document.getElementById("autor-articulo").textContent = articulo.autor;
    document.getElementById("descripcion-articulo").textContent = articulo.descripcion;

    const imagen = document.getElementById("imagen-articulo");
    imagen.src = articulo.imagen || "img/default.jpg";
    imagen.alt = articulo.titulo;

    // Cambiamos también el título de la pestaña del navegador
    document.title = articulo.titulo;

  } catch (error) {
    console.error("Error de red:", error);
    mostrarError("No se pudo conectar con el servidor.");
  }
}

function mostrarError(mensaje) {
  document.getElementById("descripcion-articulo").textContent = mensaje;
}