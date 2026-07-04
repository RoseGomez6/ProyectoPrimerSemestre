// ============================================================
//  LOGIN - logica del formulario
//  Llama al backend, y si el login es correcto guarda la
//  sesion en localStorage y redirige a la pagina principal.
// ============================================================

const API = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");
  const mensaje = document.getElementById("mensaje");

  // Si YA hay sesion guardada, no tiene sentido volver a loguear:
  // mandamos directo a la pagina principal.
  if (localStorage.getItem("token")) {
    window.location.href = "portada.html";
    return;
  }

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault(); // evita que la pagina se recargue

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validacion basica en el navegador.
    if (!usuario || !password) {
      mostrar("Completa usuario y contrasena.", "error");
      return;
    }

    try {
      const respuesta = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        // El backend respondio 400/401: mostramos su mensaje.
        mostrar(data.mensaje || "No se pudo iniciar sesion.", "error");
        return;
      }

      // ---- LOGIN CORRECTO ----
      // Guardamos la "sesion" en localStorage. Esto persiste aunque
      // se cierre la pestana, hasta que hagamos logout.
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      mostrar("Login correcto, redirigiendo...", "ok");
      window.location.href = "portada.html";
    } catch (error) {
      // fetch falla si el backend no esta levantado.
      mostrar("No se pudo conectar con el servidor.", "error");
    }
  });

  function mostrar(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = "mensaje " + tipo;
  }
});