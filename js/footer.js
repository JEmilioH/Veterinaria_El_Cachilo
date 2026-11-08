//Para evitar la redundancia de código y facilitar la edición insertamos el footer a todas las páginas mediante js

const footerItems = document.querySelector(".contenedor_footer")

footerItems.innerHTML +=`
         <div class="container">
            <div class="row justify-content-center g-4 py-0">
                <div class="col-sm-12 col-lg-4">
                    <h3 class = "display-8 fw-bolder m-3 text-center">Somos El Cachilo, una veterinaria con atención especializada,
                        diagnóstico por imágenes, laboratorio, cirugías, internación
                        y guardia las 24hs.
                        Brindamos atención integral para perros
                        y gatos en el corazón de Frías, Santiago del Estero.</h3>
                </div>

                <div class="col">
                    <h2 class="display-6 text-center m-3">Nuestras Redes:</h2>
                    <div class="ico_redes justify-content-center">
                        <a href="https://www.instagram.com/" target="_blank">
                            <img src="./assets/images/Redes/1491580635-yumminkysocialmedia26_83102.ico" alt="Instagram">
                        </a>
                        <a href="https://www.facebook.com/" target="_blank">
                            <img src="./assets/images/Redes/facebook_logo_icon_147291.ico" alt="Facebook">
                        </a>
                        <a href="https://web.whatsapp.com/" target="_blank">
                            <img src="./assets/images/Redes/whatsapp_logo_icon_186881.ico" alt="Whatsapp">
                        </a>
                        <a href="https://www.tiktok.com/" target="_blank">
                            <img src="./assets/images/Redes/tiktok_logo_icon_187623.ico" alt="Tik Tok">
                        </a>
                    </div>
                </div>

                <div class="col-sm-12 col-lg-4">
                    <div class="direccion">
                        <h2 class="display-6 fw-bolder mt-3 text-center">Nuestros horarios:</h2>
                        <p class="fs-3 fw-bolder m-0 text-center">Lunes a Viernes: 09:00 a 20:00 hs. <br>
                            Sábados: 09:00 a 13:00 hs. <br>
                            Urgencias las 24 hs.</p>
                    </div>
                </div>
            </div>
        </div>
`;