const mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
const listarMascotas = document.getElementById('listar_mascotas');
const totalMascotas = document.getElementById('total_mascotas');
const formularioAgregar = document.getElementById('form-agregar-mascota');
const modalAgregar = new bootstrap.Modal(document.getElementById('modal-agregar'));

const formularioEditar = document.getElementById('form-editar');
const modalEditar = new bootstrap.Modal(document.getElementById('modal-editar'));
let idMascotaEditar;

function render() {
    listarMascotas.innerHTML = '';

    mascotas.forEach((mascota) => {
        listarMascotas.innerHTML += `
            <tr>
                <td>${mascota.nombreDuenio}</td>

                <td>${mascota.nombreMascota}</td>

                <td>${mascota.color}</td>

                <td>${mascota.edad}</td>

                <td>${mascota.peso}</td>

                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarMascota('${mascota.idMascota}')">
                        Eliminar
                    </button>
                </td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarMascota('${mascota.idMascota}')">
                        Modificar
                    </button>
                </td>

            </tr>
        `
    });
    
    totalMascotas.textContent = mascotas.length;
};

// Usamos un render aquí para que actualice al abrir el navegador
render();

function guardarEnLocalStorage() {
    localStorage.setItem('mascotas', JSON.stringify(mascotas))
}

function eliminarMascota(id) {
    const indice = mascotas.findIndex((mascota) => mascota.idMascota === id);
    mascotas.splice(indice, 1);
    guardarEnLocalStorage();
    render();
}

function editarMascota(id) {
    idMascotaEditar = id;

    const mascota = mascotas.find((mascota) => mascota.idMascota === id);

    document.getElementById('editarNombreDuenio').value = mascota.nombreDuenio;
    document.getElementById('editarNombreMascota').value = mascota.nombreMascota;
    document.getElementById('editarColor').value = mascota.color;
    document.getElementById('editarEdad').value = mascota.edad;
    document.getElementById('editarPeso').value = mascota.peso;

    modalEditar.show();
}


//Agregar Mascota
formularioAgregar.addEventListener('submit', (evento) => {
    evento.preventDefault();
    try {  
        const datos = new FormData(formularioAgregar);
        const nuevaMascota = {
            idMascota: crypto.randomUUID(),
            nombreDuenio: datos.get('nombreDuenio').trim(),
            nombreMascota: datos.get('nombreMascota').trim(),
            color: datos.get('color').trim(),
            edad: Number(datos.get('edad')),
            peso: parseFloat(datos.get('peso'))
        }
        mascotas.push(nuevaMascota);
        
        guardarEnLocalStorage();
        render();
        modalAgregar.hide();
        formularioAgregar.reset();

    } catch (error) {
        console.error('Error al agregar la mascota:', error);
    }     
});

//Modificar Mascota
formularioEditar.addEventListener('submit', (evento) => {
    evento.preventDefault();   
    try{
        const datos = new FormData(formularioEditar);
        const mascota = mascotas.find((mascota) => mascota.idMascota === idMascotaEditar);

        mascota.nombreDuenio = datos.get('editarNombreDuenio').trim();
        mascota.nombreMascota = datos.get('editarNombreMascota').trim();
        mascota.color = datos.get('editarColor').trim();
        mascota.edad = Number(datos.get('editarEdad'));
        mascota.peso = parseFloat(datos.get('editarPeso'));

        guardarEnLocalStorage();
        render();
        modalEditar.hide();

    } catch (error) {
        console.error('Error al editar la mascota:', error);
    }   
})