//Obtener Token guardado en el sessionstorage
function obternerToken(){
    return sessionStorage.getItem("accessToken");
}

//Chequeo si está logueado
function estaLogueado(){
    return obternerToken() !== null
}

//Cerrar sesión. Quito los datos del sessionStorage y redirijo
function cerrarSesion(){
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("nombreUsuario");

    window.location.href = 'login.html'
}