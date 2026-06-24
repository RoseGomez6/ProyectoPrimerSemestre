const API_URL = "http://localhost:3000"; 

document.addEventListener("DOMContentLoaded", async () => { 

  const btnback = document.getElementById ("btnback");

btnback.addEventListener("click", () => {
  history.back();
});

  const params = new URLSearchParams(window.location.search); 
  const id = params.get('id');                                

  if (!id) {
    console.error('No se encontró el id del artículo en la URL');
    return;
  }

  try {

    const respuesta = await fetch(`${API_URL}/articulos/${id}`);
    const articulo = await respuesta.json();

    if (!respuesta.ok) {
      console.error('Artículo no encontrado');
      return;
    }


async function cargarArticulo(id) {
  const titulo = document.getElementById("titulo-articulo");
  const autor = document.getElementById("autor-articulo");
  const descripcion = document.getElementById("descripcion-articulo");
  const categoria = document.getElementById("categoria-articulo");

  try {
    const respuesta = await fetch(`http://localhost:3000/articulos/${id}`);
    const articulo = await respuesta.json();

    titulo.textContent = articulo.titulo;
    autor.textContent = articulo.autor;
    descripcion.textContent = articulo.descripcion;
    categoria.textContent = articulo.categoria;
  } catch (error) {}
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
cargarArticulo(id);

// 4. Muestra el contenido HTML de los dos editores
    document.getElementById('contenido1').innerHTML = articulo.descripcion1 || '';
    document.getElementById('contenido2').innerHTML = articulo.descripcion2 || '';

    // 5. Muestra la imagen destacada si existe
    // Se reemplaza solo el placeholder interno para no perder el <figcaption>
    if (articulo.portada) {
  const placeholder = document.querySelector('.img-placeholder-main');
  placeholder.innerHTML = '';
  placeholder.style.padding = '0';
  placeholder.style.background = 'none';

  const img = document.createElement('img');
  img.src = articulo.portada.startsWith('data:')
    ? articulo.portada
    : API_URL + articulo.portada;
  img.alt = 'Imagen destacada';
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  img.style.display = 'block';
  placeholder.appendChild(img);
}

    // 6. Muestra la galería si hay imágenes
    if (articulo.galeria && articulo.galeria.length > 0) {
  const thumbs = document.querySelectorAll('.gallery-section .gallery-thumb');

  articulo.galeria.forEach((imagen, i) => {
    if (thumbs[i] && imagen) {
      const src = imagen.startsWith('data:') ? imagen : API_URL + imagen;
      thumbs[i].innerHTML = `<img src="${src}" alt="Imagen galería ${i + 1}" style="width:100%; height:100%; object-fit:cover; display:block;">`;
    }
  });
}

  } catch (error) {
    console.error('Error de red:', error);
  }
// ── HEADER QUE SE OCULTA AL HACER SCROLL ──────────────────

const topbar = document.querySelector('.topbar');
let scrollAnterior = 0; // guarda la posición del scroll anterior para comparar

window.addEventListener('scroll', function() {
  const scrollActual = window.scrollY; // posición actual del scroll

  if (scrollActual > scrollAnterior && scrollActual > 80) {
    // el usuario bajó más de 80px — oculta el header
    topbar.style.transform = 'translateY(-100%)';
  } else {
    // el usuario subió — muestra el header
    topbar.style.transform = 'translateY(0)';
  }

  scrollAnterior = scrollActual; // actualiza la posición anterior
});
});