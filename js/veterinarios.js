const veterinarios = JSON.parse(localStorage.getItem('veterinarios')) || [];
const listarVeterinarios = document.getElementById('tablaVeterinarios');
const totalVeterinarios = document.getElementById('totalVeterinarios');
const formulario = document.getElementById('formVeterinario');
const modalVeterinario = new bootstrap.Modal(document.getElementById('modalVeterinario'));
const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
let idVeterinarioEditar = null;
let idAEliminar = null;

function render() {
    const listarVeterinarios = document.getElementById('tablaVeterinarios');
    const totalVeterinarios = document.getElementById('totalVeterinarios');
    const mensajeVacio = document.getElementById('mensajeVacio');

    listarVeterinarios.innerHTML = '';

    if (veterinarios.length === 0) {
        totalVeterinarios.textContent = 'Total: 0';
        if (mensajeVacio) {
            mensajeVacio.classList.remove('d-none');
        }
        return;
    }


    if (mensajeVacio) {
        mensajeVacio.classList.add('d-none');
    }

    veterinarios.forEach((vet) => {
        listarVeterinarios.innerHTML += `
            <tr>
                <td>${vet.matricula}</td>
                <td>${vet.nombre}</td>
                <td>${vet.especializacion}</td>
                <td>${formatearMoneda(vet.valorConsulta)}</td>
                <td class="text-end">
                    <button class="btn btn-warning btn-sm me-1" onclick="editarVeterinario('${vet.idVeterinario}')">
                        Editar
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="pedirEliminar('${vet.idVeterinario}', '${vet.nombre}')">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });

    totalVeterinarios.textContent = `Total: ${veterinarios.length}`;
}

    veterinarios.forEach((vet) => {
        listarVeterinarios.innerHTML += `
            <tr>
                <td>${vet.matricula}</td>
                <td>${vet.nombre}</td>
                <td>${vet.especializacion}</td>
                <td>${formatearMoneda(vet.valorConsulta)}</td>
                <td class="text-end">
                    <button class="btn btn-warning btn-sm me-1" onclick="editarVeterinario('${vet.idVeterinario}')">
                        Editar
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="pedirEliminar('${vet.idVeterinario}', '${vet.nombre}')">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });

    totalVeterinarios.textContent = `Total: ${veterinarios.length}`;

function formatearMoneda(valor) {
    return Number(valor).toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
    });
}

function guardarEnLocalStorage() {
    localStorage.setItem('veterinarios', JSON.stringify(veterinarios));
}

function agregarVeterinario(vet) {
    veterinarios.push(vet);
    guardarEnLocalStorage();
    render();
}

function pedirEliminar(id, nombre) {
    idAEliminar = id;
    document.getElementById('nombreEliminar').textContent = nombre;
    modalEliminar.show();
}

function eliminarVeterinario() {
    const indice = veterinarios.findIndex((v) => v.idVeterinario === idAEliminar);
    if (indice !== -1) {
        veterinarios.splice(indice, 1);
        guardarEnLocalStorage();
        render();
    }
    modalEliminar.hide();
    idAEliminar = null;
}

function editarVeterinario(id) {
    idVeterinarioEditar = id;

    const vet = veterinarios.find((v) => v.idVeterinario === id);
    if (!vet) return;

    document.getElementById('idVeterinario').value = vet.idVeterinario;
    document.getElementById('matricula').value = vet.matricula;
    document.getElementById('nombre').value = vet.nombre;
    document.getElementById('especializacion').value = vet.especializacion;
    document.getElementById('valorConsulta').value = vet.valorConsulta;

    document.getElementById('modalVeterinarioLabel').textContent = 'Editar Veterinario';
    document.getElementById('btnGuardar').textContent = 'Actualizar';

    modalVeterinario.show();
}

function limpiarFormulario() {
    formulario.reset();
    document.getElementById('idVeterinario').value = '';
    idVeterinarioEditar = null;
    document.getElementById('modalVeterinarioLabel').textContent = 'Nuevo Veterinario';
    document.getElementById('btnGuardar').textContent = 'Guardar';
}

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const datos = {
        idVeterinario: idVeterinarioEditar || crypto.randomUUID(),
        matricula: Number(document.getElementById('matricula').value),
        nombre: document.getElementById('nombre').value.trim(),
        especializacion: document.getElementById('especializacion').value,
        valorConsulta: parseFloat(document.getElementById('valorConsulta').value)
    };

    if (idVeterinarioEditar) {
        const indice = veterinarios.findIndex((v) => v.idVeterinario === idVeterinarioEditar);
        if (indice !== -1) {
            veterinarios[indice] = datos;
        }
    } else {
        agregarVeterinario(datos);
    }

    guardarEnLocalStorage();
    render();
    modalVeterinario.hide();
    limpiarFormulario();
});

document.getElementById('btnNuevoVeterinario').addEventListener('click', () => {
    limpiarFormulario();
});

document.getElementById('btnConfirmarEliminar').addEventListener('click', eliminarVeterinario);

render();