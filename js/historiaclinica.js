if (!estaLogueado()){
    window.location.href = 'login.html'
}


const mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
const veterinarios = JSON.parse(localStorage.getItem('veterinarios')) || [];
const historialMedico = JSON.parse(localStorage.getItem('historialmedico')) || [];
const selectorMascota = document.getElementById('mascotaSeleccionada');
const selectorMascotaConsulta = document.getElementById('mascotaConsulta');
const selectorVeterinario = document.getElementById('veterinarioConsulta');
const formulario = document.getElementById('form-consulta');
const modal = new bootstrap.Modal(document.getElementById('modal-consulta'));

function cargarOpciones(select, opciones, textoInicial, etiqueta) {
    select.replaceChildren(new Option(textoInicial, ''));
    opciones.forEach((opcion) => select.add(new Option(etiqueta(opcion), opcion.idMascota || opcion.idVeterinario)));
}

function cargarSelectores() {
    [selectorMascota, selectorMascotaConsulta].forEach((select) => {
        cargarOpciones(select, mascotas, 'Seleccione una mascota', (mascota) =>
            `${mascota.nombreMascota} - Dueño: ${mascota.nombreDuenio}`);
        select.disabled = mascotas.length === 0;
    });

    cargarOpciones(selectorVeterinario, veterinarios, 'Seleccione un veterinario', (veterinario) =>
        `${veterinario.nombre} (${veterinario.especializacion})`);
    selectorVeterinario.disabled = veterinarios.length === 0;

    const faltantes = [];
    if (!mascotas.length) faltantes.push('mascotas');
    if (!veterinarios.length) faltantes.push('veterinarios');

    const botonNuevaConsulta = document.getElementById('btnNuevaConsulta');
    const aviso = document.getElementById('mensajeDisponibilidad');
    botonNuevaConsulta.disabled = faltantes.length > 0;
    aviso.textContent = faltantes.length
        ? `Para registrar una consulta, primero cargá ${faltantes.join(' y ')}.`
        : '';
    aviso.classList.toggle('d-none', faltantes.length === 0);
}

function renderHistorial() {
    const mascota = mascotas.find((item) => item.idMascota === selectorMascota.value);
    const lista = document.getElementById('listaHistorial');
    const total = document.getElementById('totalConsultas');
    const vacio = document.getElementById('mensajeVacioHistorial');
    const datosMascota = document.getElementById('datosMascota');

    lista.replaceChildren();
    datosMascota.textContent = mascota
        ? `Dueño: ${mascota.nombreDuenio} · Edad: ${mascota.edad} · Peso: ${mascota.peso} kg`
        : '';

    const consultas = mascota
        ? historialMedico
            .filter((consulta) => consulta.idMascota === mascota.idMascota)
            .sort((a, b) => b.fechaConsulta.localeCompare(a.fechaConsulta))
        : [];

    total.textContent = `Total: ${consultas.length}`;
    vacio.classList.toggle('d-none', consultas.length > 0);
    vacio.querySelector('p').textContent = mascota
        ? 'Esta mascota todavía no tiene consultas registradas.'
        : mascotas.length
            ? 'Seleccioná una mascota para ver su historial clínico.'
            : 'No hay mascotas cargadas. Registrá una mascota para comenzar.';

    consultas.forEach((consulta) => {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'card border';

        const encabezado = document.createElement('div');
        encabezado.className = 'card-header bg-light d-flex flex-column flex-sm-row justify-content-between gap-1';
        const titulo = document.createElement('h3');
        titulo.className = 'h5 mb-0';
        titulo.textContent = consulta.motivo;
        const fecha = document.createElement('span');
        fecha.className = 'text-muted';
        fecha.textContent = consulta.fechaConsulta;
        encabezado.append(titulo, fecha);

        const cuerpo = document.createElement('div');
        cuerpo.className = 'card-body d-flex flex-column gap-3';
        [
            ['Profesional veterinario', consulta.veterinario],
            ['Diagnóstico', consulta.diagnostico],
            ['Tratamiento', consulta.tratamiento],
            ['Próxima visita', consulta.proximaVisita]
        ].forEach(([etiqueta, valor]) => {
            const campo = document.createElement('div');
            const nombre = document.createElement('h4');
            nombre.className = 'h6 mb-1';
            nombre.textContent = etiqueta;
            const contenido = document.createElement('p');
            contenido.className = 'mb-0 text-break';
            contenido.textContent = valor;
            campo.append(nombre, contenido);
            cuerpo.appendChild(campo);
        });

        tarjeta.append(encabezado, cuerpo);
        lista.appendChild(tarjeta);
    });
}

selectorMascota.addEventListener('change', () => {
    selectorMascotaConsulta.value = selectorMascota.value;
    renderHistorial();
});

selectorMascotaConsulta.addEventListener('change', () => {
    selectorMascota.value = selectorMascotaConsulta.value;
    renderHistorial();
});

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const datos = new FormData(formulario);
    const mascota = mascotas.find((item) => item.idMascota === datos.get('mascotaConsulta'));
    const veterinario = veterinarios.find((item) => item.idVeterinario === datos.get('veterinarioConsulta'));

    if (!mascota || !veterinario) {
        window.alert('Seleccioná una mascota y un veterinario válidos para registrar la consulta.');
        return;
    }

    historialMedico.push({
        idConsulta: crypto.randomUUID(),
        idMascota: mascota.idMascota,
        mascota: `${mascota.nombreMascota} (${mascota.nombreDuenio})`,
        fechaConsulta: datos.get('fechaConsulta'),
        motivo: datos.get('motivoConsulta').trim(),
        idVeterinario: veterinario.idVeterinario,
        veterinario: veterinario.nombre,
        diagnostico: datos.get('diagnosticoConsulta').trim(),
        tratamiento: datos.get('tratamientoConsulta').trim(),
        proximaVisita: datos.get('proximaVisita')
    });

    try {
        localStorage.setItem('historialmedico', JSON.stringify(historialMedico));
    } catch (error) {
        historialMedico.pop();
        console.error('Error al guardar la consulta en localStorage:', error);
        window.alert('No se pudo guardar la consulta. Revisá el almacenamiento disponible e intentá nuevamente.');
        return;
    }

    selectorMascota.value = selectorMascotaConsulta.value = mascota.idMascota;
    renderHistorial();
    modal.hide();
    formulario.reset();
});

document.getElementById('modal-consulta').addEventListener('show.bs.modal', () => {
    selectorMascotaConsulta.value = selectorMascota.value;
});
document.getElementById('modal-consulta').addEventListener('hidden.bs.modal', () => formulario.reset());

cargarSelectores();
renderHistorial();
