const URL = "https://dummyjson.com/auth/login";
// https://dummyjson.com/users

const formulario = document.getElementById("login-form");
const mensajeError = document.getElementById("msj-error");
const botonLogin = document.getElementById("boton-login");
const botonInicioSesion = document.getElementById("btn-inicioSesion");

//Controlo la aparicion de botones indebidos a la pantalla
document.getElementById("btn-inicioSesion").remove()
document.getElementById("btnPedirTurno").remove()

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    mensajeError.textContent = ""; // Limpiar mensaje de error   
    botonLogin.disabled = true; // Deshabilitar el botón de inicio de sesión para evitar doble click
    botonLogin.textContent = "Iniciando sesión..."; // Cambiar el texto del botón mientras se procesa la solicitud
    
    try{
        const datosForm = new FormData(formulario);

        const usuario = {    
            username: datosForm.get("nombre-usuario").trim(),
            password: datosForm.get("contrasenia").trim()
        }

        const respuesta = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });       

        if (!respuesta.ok) {
            mensajeError.textContent = "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.";
            return;
        }

        const datos = await respuesta.json();
        console.log("Datos recibidos:", datos);

        sessionStorage.setItem("accessToken", datos.accessToken);
        sessionStorage.setItem("nombreUsuario", JSON.stringify(datos.firstName));
        window.location.href = "index.html"; // Redirigir a la página principal después del inicio de sesión exitoso

    } catch (error) {
        mensajeError.textContent = "Error al iniciar sesión. Por favor, inténtalo de nuevo.";
        console.error("Error al iniciar sesión:", error);
    } finally {
        botonLogin.disabled = false; // Habilitar el botón de inicio de sesión nuevamente
        botonLogin.textContent = "Iniciar Sesion"; // Restaurar el texto del botón
    }
})
