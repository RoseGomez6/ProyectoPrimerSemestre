// ============================================================
//  PAGINA PRINCIPAL (protegida)
//  Antes de mostrar contenido, valida si hay sesion en
//  localStorage. Si NO hay, redirige al login.
// ============================================================

// 1) Chequeo de sesion. Se ejecuta al cargar el script.
const token = localStorage.getItem("token");

if (!token) {
  // No hay sesion -> fuera de aca, al login.
  window.location.href = "login.html";
}

// 2) Si llegamos hasta aca, hay sesion. Mostramos los datos.
document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  const bienvenida = document.getElementById("bienvenida");
  if (usuario) {
    bienvenida.textContent = `Hola, ${usuario.nombre} 👋`;
  }

  // 3) Cerrar sesion: borramos lo guardado y volvemos al login.
  document.getElementById("btnSalir").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
  });
});

