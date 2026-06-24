const input = document.getElementById("mensaje");
const boton = document.getElementById("enviar");
const lista = document.getElementById("articulos");

// Muestra el array de palabras en la lista de la página
function mostrarArticulos(articulos) {
  console.log("Articulos del backend:", palabras);
  lista.innerHTML = "";
  articulos.forEach((articulos) => {
    const item = document.createElement("li");
    item.textContent = articulos;
    lista.appendChild(item);
  });
}

// GET: trae el array de palabras del backend
async function cargarArticulos() {
  const respuesta = await fetch("http://localhost:3000/articulos", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  const datos = await respuesta.json();
  mostrarArticulos(datos);
}

// Al cargar la página -> muestra las palabras que ya están
window.addEventListener("DOMContentLoaded", cargarArticulos);


