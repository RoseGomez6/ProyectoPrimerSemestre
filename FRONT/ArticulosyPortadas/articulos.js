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

//

async function cargarArticulos() {
  const grilla = document.querySelector("#grilla-articulos");
  try {
    const response = await fetch("http://localhost:3000/articulos");
    if (!response.ok) throw new Error("Error: " + response.status);
    const articulos = await response.json();
    // Limpiar el contenido placeholder
    grilla.innerHTML = "";
    // Generar una card por cada articulo
    for (const articulo of articulos) {
      grilla.insertAdjacentHTML(
        "beforeend",
        `
    <div class="card" style="width: 18rem;">
  <img src="pedrofigari.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Identidades visuales de Uruguay</h5>
    <p class="card-text">Origenes de las artes visuales Uruguayas</p>
    <a href="articulos.html?id=1" class="btn">Seguir leyendo</a>
  </div>

   <div class="card" style="width: 18rem;">
  <img src="onetti2.jpg" class="card-img-down" alt="...">
  <div class="card-body">
    <h5 class="card-title">Evolucion de la literatura Uruguaya</h5>
    <p class="card-text">En este texto se analizan las principales corrientes literarias que marcaron los inicios de la literatura uruguaya y contribuyeron a la construcción de una identidad nacional.</p>
    <a href="articulos.html?id=2" class="btn">Seguir leyendo</a>
  </div>

  <div class="card" style="width: 18rem;">
  <img src="drexler2.jpg" class="card-img-right" alt="...">
  <div class="card-body">
    <h5 class="card-title">La musica Uruguaya como expresion de identidad cultural</h5>
    <p class="card-text">Origenes de la musica Uruguaya</p>
    <a href="articulos.html?id=3" class="btn">Seguir leyendo</a>
  </div>

  <div class="card" style="width: 18rem;">
  <img src="candombe.jpg" class="card-img-left" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
    <a href="articulos.html?id=4" class="btn">Seguir leyendo</a>
  </div>
  
<span class="badge bg-secondary

mb-2">${articulo.categoria}</span>

<h5 class="card-title">${articulo.titulo}</h5>
<p class="card-text text-muted">${articulo.descripcion}</p>
</div>
<div class="card-footer d-flex justify-content-between

align-items-center">

<small class="text-muted">Por ${articulo.autor}</small>
<a href="articulo.html?id=${articulo.id}" class="btn btn-sm

btn-outline-dark">
Leer más
</a>
</div>
</div>
</div>
`,
      );
    }
  } catch (error) {
    grilla.innerHTML = `
<div class="col-12">
<p class="text-danger">No se pudieron cargar los artículos.</p>
</div>
`;
    console.error(error);
  }
}
