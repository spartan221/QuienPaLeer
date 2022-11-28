import '../css/ContentHome.css'
import qplLogo from '../assets/img/QPL_Logo_Black.png'
import { Helmet } from "react-helmet"

const Content = () => {
    return (
        <div>
            <Helmet>
                <script
                    src="../assets/homeAnimation.js"
                    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                    crossorigin="anonymous"
                    async
                ></script>
            </Helmet>

            <div id='welcomeContainer' className='mx-5 mt-4 d-flex justify-content-center align-items-center'>
                <div id='containerLogoHome' className='container-fluid text-center w-100'>
                    <img id='logoQPLHome' className='img-fluid' src={qplLogo} />
                </div>
                <div id='containerTextHomeBanner' className='text-center w-100 me-5'>
                    <h1 className='fw-bold' style={{ color: '#1C51C7' }}>Bievenido(a)!</h1>
                    <h4 id='textBannerHome'><span className='fw-bold' style={{ color: '#1C51C7' }}>QuienPaLeer</span> es una WebApp que te permite interactuar con diversos usuarios interesados por el mundo del arte que conlleva la lectura.</h4>
                </div>
            </div>

            <div className='d-flex flex-wrap justify-content-evenly ms-5 mt-4 me-5'>
                <div class="card cardFeatures">
                    <div class="card-body">
                        <h2 class="card-title fw-bold">Interactúa</h2>
                        <p class="textFeature card-text">Valora las publicaciones de los demás usuarios de la comunidad y genera Chats con aquellos usuarios que te apetezca acertar acuerdos sobre algún texto o simplemente crear contactos pertenecientes a la comunidad de QuienPaLeer. </p>
                    </div>
                </div>
                <div class="card cardFeatures">
                    <div class="card-body">
                        <h2 class="card-title fw-bold">Eventos de Interés</h2>
                        <p class="textFeature card-text">Publica y visualiza aquellos eventos relacionados a la lectura que sean de interes para la comunidad en general.</p>
                    </div>
                </div>
                <div class="card cardFeatures">
                    <div class="card-body">
                        <h2 class="card-title fw-bold">Compra de Libros</h2>
                        <p class="textFeature card-text">Publica y visualiza aquellos textos que estén a disposición de venta. </p>
                    </div>
                </div>
                <div class="card cardFeatures">
                    <div class="card-body">
                        <h2 class="card-title fw-bold">Intercambio de Libros</h2>
                        <p class="textFeature card-text">Muéstrale a toda la comunidad aquellos textos que desees cambiar por otro elemento literario.</p>
                    </div>
                </div>
                <div class="card cardFeatures">
                    <div class="card-body">
                        <h2 class="card-title fw-bold">Donación de Libros</h2>
                        <p class="textFeature card-text">Ten una buena acción con alguien más, dona aquellos textos que sientas que le harán falta a otro usuario.</p>
                    </div>
                </div>
            </div>


        </div>



    )
}

export default Content;