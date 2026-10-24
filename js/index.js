const contenedorVeterinarios = document.getElementById('listaVeterinarios');

function mostrarMensaje(mensaje) {
    const columna = document.createElement('div');
    columna.className = 'col-12 text-center text-muted fs-5';
    columna.textContent = mensaje;
    contenedorVeterinarios.appendChild(columna);
}

function crearTarjeta(veterinario) {
    const columna = document.createElement('div');
    columna.className = 'col-12 col-md-6 col-lg-4';

    const tarjeta = document.createElement('article');
    tarjeta.className = 'card h-100';

    const cuerpo = document.createElement('div');
    cuerpo.className = 'card-body text-center';

    const nombre = document.createElement('h5');
    nombre.className = 'card-title fs-2';
    nombre.textContent = veterinario.nombre || 'Veterinario/a';

    const especializacion = document.createElement('p');
    especializacion.className = 'card-text fs-5 mb-2';
    especializacion.textContent = `Especialización: ${veterinario.especializacion || 'No especificada'}`;

    const matricula = document.createElement('p');
    matricula.className = 'card-text fs-5 mb-2';
    matricula.textContent = `Matrícula: ${veterinario.matricula ?? 'No especificada'}`;

    const valorConsulta = document.createElement('p');
    valorConsulta.className = 'card-text fs-5';
    const valor = Number(veterinario.valorConsulta);
    valorConsulta.textContent = Number.isFinite(valor)
        ? `Valor de consulta: ${valor.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}`
        : `Valor de consulta: ${veterinario.valorConsulta || 'No especificado'}`;

    cuerpo.append(nombre, especializacion, matricula, valorConsulta);
    tarjeta.appendChild(cuerpo);
    columna.appendChild(tarjeta);

    return columna;
}

if (!contenedorVeterinarios) {
    console.error('No se encontró el contenedor #listaVeterinarios en index.html.');
} else {
    try {
        const datosGuardados = localStorage.getItem('veterinarios');
        const veterinarios = datosGuardados ? JSON.parse(datosGuardados) : [];

        if (veterinarios.length === 0) {
            mostrarMensaje('Todavía no hay veterinarios registrados.');
        } else {
            veterinarios.forEach((veterinario) => {
                contenedorVeterinarios.appendChild(crearTarjeta(veterinario));
            });
        }
    } catch (error) {
        console.error('No se pudieron cargar los veterinarios desde LocalStorage.', error);
        mostrarMensaje('No se pudieron cargar los veterinarios. Revisá los datos guardados.');
    }
}