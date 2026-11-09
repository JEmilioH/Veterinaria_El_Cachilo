if (!estaLogueado()) {
    window.location.href = 'login.html';
}

const turnos = JSON.parse(localStorage.getItem('turnos')) || [];
const listarTurnos = document.getElementById('listar_turnos');
const totalTurnos = document.getElementById('total_turnos');
const formularioTurno = document.getElementById('form-agregar-turno');
const modalTurno = new bootstrap.Modal(document.getElementById('modal-turno'));
const mensajeVacioTurnos = document.getElementById('mensajeVacioTurnos');

function cargarSeleccion() {
    const mascotaSelect = document.getElementById('mascotaSelect');
    const veterinarioSelect = document.getElementById('veterinarioSelect');

    const mascotasGuardadas = JSON.parse(localStorage.getItem('mascotas')) || [];
    const veterinariosGuardados = JSON.parse(localStorage.getItem('veterinarios')) || [];

    // Limpiar opciones previas excepto la primera por defecto
    mascotaSelect.innerHTML = '<option value="" disabled selected>Seleccione una mascota</option>';
    veterinarioSelect.innerHTML = '<option value="" disabled selected>Seleccione un veterinario</option>';

    mascotasGuardadas.forEach(m => {
        const option = document.createElement('option');
        option.value = `${m.nombreMascota} (${m.nombreDuenio})`;
        option.textContent = `${m.nombreMascota} - Dueño: ${m.nombreDuenio}`;
        mascotaSelect.appendChild(option);
    });

    veterinariosGuardados.forEach(v => {
        const option = document.createElement('option');
        option.value = v.nombre;
        option.textContent = `${v.nombre} (${v.especializacion})`;
        veterinarioSelect.appendChild(option);
    });
}

function renderTurnos() {
    listarTurnos.innerHTML = '';

    if (turnos.length === 0) {
        mensajeVacioTurnos.classList.remove('d-none');
    } else {
        mensajeVacioTurnos.classList.add('d-none');
        turnos.forEach((turno) => {
            listarTurnos.innerHTML += `
                <tr>
                    <td>${turno.fechaHora}</td>
                    <td>${turno.mascota}</td>
                    <td>${turno.veterinario}</td>
                    <td>${turno.motivo}</td>
                    <td class="text-end">
                        <button class="btn btn-danger btn-sm" onclick="eliminarTurno('${turno.idTurno}')">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });
    }

    totalTurnos.textContent = `Total: ${turnos.length}`;
}

cargarSeleccion();
renderTurnos();

function guardarTurnosLocalStorage() {
    localStorage.setItem('turnos', JSON.stringify(turnos));
}

formularioTurno.addEventListener('submit', (evento) => {
    evento.preventDefault();
    try {
        const datos = new FormData(formularioTurno);
        const nuevoTurno = {
            idTurno: crypto.randomUUID(),
            fechaHora: datos.get('fechaHora'),
            mascota: datos.get('mascotaSelect'),
            veterinario: datos.get('veterinarioSelect'),
            motivo: datos.get('motivo').trim()
        };

        turnos.push(nuevoTurno);
        guardarTurnosLocalStorage();
        renderTurnos();

        modalTurno.hide();
        formularioTurno.reset();
    } catch (error) {
        console.error('Error al registrar el turno:', error);
    }
});

function eliminarTurno(id) {
    const indice = turnos.findIndex((t) => t.idTurno === id);
    if (indice !== -1) {
        turnos.splice(indice, 1);
        guardarTurnosLocalStorage();
        renderTurnos();
    }
}