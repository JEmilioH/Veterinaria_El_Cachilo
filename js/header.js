const itemsNav = document.querySelector(".barraNavegacion")
const pestaniaActual= itemsNav.id

if (estaLogueado()){
    const usuario = sessionStorage.getItem("nombreUsuario");
    console.log(usuario)
    itemsNav.innerHTML += `
        <div class="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span> 
            </button>
            <div class="barraNavegacion collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link nav-item-index" href="./index.html">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-item-institucional" href="./institucional.html">Institucional</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link nav-item-contacto" href="./contacto.html">Contacto</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle fw-semibold" href="#" id="adminDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Administración
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="adminDropdown">
                            <li><a class="dropdown-item nav-item-mascotas" href="./mascotas.html">Mascotas</a></li>
                            <li><a class="dropdown-item nav-item-veterinarios" href="./veterinarios.html">Veterinarios</a></li>
                            <li><a class="dropdown-item nav-item-turnos" href="./turnos.html">Turnos</a></li>
                        </ul>
                    </li>   
                    <li>
                        <a class="btn text-primary fw-bold" id="nombreUsuario">{"usuario"}</a>
                        <button class="btn btn-secondary" onclick="cerrarSesion()"> Cerrar Sesion </button>
                    </li>
                </ul>
            </div>
        </div>
    `;
    const usuarioActual= document.getElementById("nombreUsuario")
    usuarioActual.textContent = usuario;
    const pestaniaActualActiva = document.querySelector(`.${pestaniaActual}`);
    pestaniaActualActiva.classList.add("active");

} else {
    itemsNav.innerHTML += `
        <div class="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span> 
            </button>
            <div class="barraNavegacion collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="./index.html">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./institucional.html">Institucional</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./contacto.html">Contacto</a>
                    </li>

                </ul>

                    <div>                            
                        <!-- Button trigger modal --> 
                        <button id="btnPedirTurno" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Pedir Turno
                        </button>
                    </div>

                    <div>
                        <a type="button" id="btn-inicioSesion" class="btn btn-dark m-2" href="./login.html">Iniciar Sesion</a>
                    </div>
            </div>
        </div>
    `
}