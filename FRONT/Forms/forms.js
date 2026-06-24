
const form = document.getElementById("formArticulo");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

    const articulo = {
    titulo: document.getElementById("titulo").value,
    autor: document.getElementById("autor").value,
    categoria: "Reseñas",
    descripcion: document.getElementById("contenido").value
  };

console.log("Enviando artículo:", articulo);

  try {
    const respuesta = await fetch("http://localhost:3000/articulos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(articulo)
    });

console.log("Petición enviada");

    const data = await respuesta.json();

    document.getElementById("mensaje").textContent =
      "Artículo publicado correctamente";

    console.log(data);

    form.reset();

  } catch (error) {
    console.error(error);
  }
});