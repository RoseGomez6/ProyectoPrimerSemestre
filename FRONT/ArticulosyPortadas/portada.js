// ── CLIMA ────────────────────────────────────────────────

// Coordenadas de Montevideo
const LAT = -34.9;
const LON = -56.2;
const CIUDAD = "Montevideo";

// URL de la API — gratuita, sin API key
const API_CLIMA = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`;

// Traduce el código numérico del clima a texto legible
function descripcionClima(code) {
  if (code === 0) return "☀️ Cielo despejado";
  if (code <= 2) return "⛅ Parcialmente nublado";
  if (code === 3) return "☁️ Nublado";
  if (code >= 51 && code <= 67) return "Lluvia";
  if (code >= 71 && code <= 77) return "❄️ Nieve";
  if (code >= 80 && code <= 82) return "Lluvias intermitentes";
  if (code >= 95) return "⚡ Tormenta";
  return "Condición desconocida";
}

async function cargarClima() {
  const elCiudad = document.getElementById("clima-ciudad");
  const elTemp = document.getElementById("clima-temp");
  const elCondicion = document.getElementById("clima-condicion");

  try {
    const respuesta = await fetch(API_CLIMA); // hace el GET a la API
    const datos = await respuesta.json(); // convierte la respuesta a objeto JS

    const { temperature, windspeed, weathercode } = datos.current_weather; // desestructura los datos

    // Escribe los datos en el HTML
    elCiudad.textContent = CIUDAD;
    elTemp.textContent = `${temperature} °C`;
    elCondicion.textContent = descripcionClima(weathercode);
  } catch (error) {
    console.error("Error al obtener el clima:", error);
    elCiudad.textContent = "No se pudo cargar el clima."; // mensaje si no hay conexión
  }
}

// ── ARTÍCULOS ────────────────────────────────────────────

const API_URL = "http://localhost:3000";

async function cargarArticulos() {
  const contenedor = document.querySelector(".destacados");

  try {
    const respuesta = await fetch(`${API_URL}/articulos`);
    const articulos = await respuesta.json();

    if (!respuesta.ok) {
      contenedor.innerHTML = "<p>No se pudieron cargar los artículos.</p>";
      return;
    }

    // Limpiamos el contenedor antes de volver a dibujar
    // (para que el auto-refresco no duplique tarjetas)
    contenedor.innerHTML = "";

    articulos.forEach((articulo) => {
      const tarjeta = crearTarjeta(articulo);
      contenedor.appendChild(tarjeta);
    });
  } catch (error) {
    console.error("Error de red:", error);
    contenedor.innerHTML = "<p>No se pudo conectar con el servidor.</p>";
  }
}

function crearTarjeta(articulo) {
  // Creamos el <article class="card"> con dos bloques internos:
  // .card-img (la imagen, a la izquierda) y .card-info (el texto, a la derecha)
  const article = document.createElement("article");
  article.classList.add("card");

  const bloqueImg = document.createElement("div");
  bloqueImg.classList.add("card-img");

  const img = document.createElement("img");
  img.src = articulo.imagen || "img/default.jpg"; // si no tiene imagen, usamos una por defecto
  img.alt = articulo.titulo;
  bloqueImg.appendChild(img);

  const bloqueInfo = document.createElement("div");
  bloqueInfo.classList.add("card-info");

  const categoria = document.createElement("p");
  categoria.classList.add("card-categoria");
  categoria.textContent = articulo.categoria;

  const titulo = document.createElement("h3");
  titulo.textContent = articulo.titulo;

  const autor = document.createElement("p");
  autor.classList.add("card-autor");
  autor.textContent = articulo.autor;

  bloqueInfo.appendChild(categoria);
  bloqueInfo.appendChild(titulo);
  bloqueInfo.appendChild(autor);

  article.appendChild(bloqueImg);
  article.appendChild(bloqueInfo);

  // Al hacer click en la tarjeta, navegamos al artículo completo
  article.addEventListener("click", () => {
    window.location.href = `articulo.html?id=${articulo.id}`;
  });

  return article;
}

// 1) Chequeo de sesion. Se ejecuta al cargar el script.
const token = localStorage.getItem("token");

if (!token) {
  // No hay sesion -> fuera de aca, al login.
  window.location.href = "login.html";
}

// ── INICIO ───────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  cargarClima();
  cargarArticulos();

  // Actualiza la lista de artículos automáticamente cada 3 segundos
  setInterval(cargarArticulos, 3000);
});

// 3) Cerrar sesion: borramos lo guardado y volvemos al login.
document.getElementById("btnSalir").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
});
