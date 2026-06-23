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
