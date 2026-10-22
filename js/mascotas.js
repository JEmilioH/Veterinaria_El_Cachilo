const mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
const listarMascotas = document.getElementById('listar_mascotas');
const totalMascotas = document.getElementById('total_mascotas');
const formulario = document.getElementById('form-mascota');

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
            </tr>
        `
    });
    
    totalMascotas.textContent = mascotas.length;
};

function guardarEnLocalStorage() {
    localStorage.setItem('mascotas', JSON.stringify(mascotas))
}



formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const datos = new FormData(formulario);

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
    formulario.reset();
})

