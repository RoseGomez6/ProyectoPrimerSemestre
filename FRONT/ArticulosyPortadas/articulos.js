const contenedor = document.getElementById("contenedor-articulos");

fetch("http://localhost:3000/articulos")
  .then((res) => res.json())
  .then((articulos) => {
    articulos.forEach((articulo) => {
      contenedor.innerHTML += `
        <article class="articulo">
          <h3>${articulo.titulo}</h3>
          <p><strong>Autor:</strong> ${articulo.autor}</p>
          <p><strong>Categoría:</strong> ${articulo.categoria}</p>
          <p>${articulo.descripcion}</p>
        </article>
      `;
    });
  })
  .catch((error) => {
    console.error("Error al cargar artículos:", error);
  });