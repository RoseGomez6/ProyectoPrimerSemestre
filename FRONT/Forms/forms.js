const API_URL = "http://localhost:3000"; // puerto del back

document.addEventListener("DOMContentLoaded", () => {
  // espera que el html cargue
  const formArticulo = document.getElementById("formArticulo");
  const mensaje = document.getElementById("mensaje");

  formArticulo.addEventListener("submit", async function (evento) {
    evento.preventDefault(); // evita que la página se recargue

    const titulo = document.getElementById("titulo").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const imagen = document.getElementById("imagen").value.trim();
    const fecha = document.getElementById("fecha").value.trim();
    const descripcion = document.getElementById("contenido").value.trim();

    if (!titulo || !categoria || !autor || !descripcion) {
      mensaje.textContent =
        "Completá los campos obligatorios: título, categoría, autor y contenido.";
      return;
    }

    const datos = { titulo, categoria, autor, imagen, fecha, descripcion };

    try {
      const respuesta = await fetch(`${API_URL}/articulos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const articulo = await respuesta.json();

      if (respuesta.ok) {
        mensaje.textContent = "Artículo publicado con éxito.";
        formArticulo.reset();
        // Si querés redirigir a la página del artículo, descomentá la línea de abajo:
        // window.location.href = '../articulo-proyecto/articulo.html?id=' + articulo.id;
      } else {
        mensaje.textContent =
          articulo.error || "Error al publicar el artículo.";
      }
    } catch (error) {
      console.error("Error de red:", error);
      mensaje.textContent = "No se pudo conectar con el servidor.";
    }
  });
});
