const input = document.getElementById("mensaje");
const boton = document.getElementById("enviar");
const lista = document.getElementById("lista-palabras");

// Muestra el array de palabras en la lista de la página
function mostrarPalabras(palabras) {
  console.log("Palabras del backend:", palabras);
  lista.innerHTML = "";
  palabras.forEach((palabra) => {
    const item = document.createElement("li");
    item.textContent = palabra;
    lista.appendChild(item);
  });
}

// GET: trae el array de palabras del backend
async function cargarPalabras() {
  const respuesta = await fetch("http://localhost:3000/api/palabras", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const datos = await respuesta.json();
  mostrarPalabras(datos.palabras);
}

// POST: manda la palabra del input para guardarla en el mismo array
async function enviarPalabra() {
  const palabra = input.value.trim();
  if (!palabra) return;

  const respuesta = await fetch("http://localhost:3000/api/palabras", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ palabra }),
  });
  const datos = await respuesta.json();

  mostrarPalabras(datos.palabras); // refresca con el array actualizado
  input.value = ""; // limpia el input
}

// Al cargar la página -> muestra las palabras que ya están
window.addEventListener("DOMContentLoaded", cargarPalabras);

// Al hacer click en "Enviar" -> agrega la palabra al array
boton.addEventListener("click", enviarPalabra);
