import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Nav from 'react-bootstrap/Nav';
import '../css/SideBar.css'

export default function SideBar() {
    return (
        <div>
            <div className="px-4 h-100 w-100" >
                <p className='text-muted d-flex justify-content-start p-2 mt-3' style={{fontSize: 12}}>
                    Opciones
                </p>
                <Nav.Link variant="primary" href="home/events" id='linkEvents' className='navLinkContainer'>
                    <i className="bi bi-calendar-minus p-2"></i>
                    Eventos
                </Nav.Link>
                <br/>
                <Nav.Link variant="primary" href="home/books" id='linkBuyBooks' className='navLinkContainer'>
                    <i className="bi bi-currency-dollar px-2"></i>
                    Compra de libros
                </Nav.Link>
                <br/>
                <Nav.Link id='linkChangeBooks' className='navLinkContainer'> 
                    <i className="bi bi-repeat px-2"></i>
                    Cambio de libros
                </Nav.Link>

                <hr/>

                <p className='text-muted d-flex justify-content-start p-2 mt-3' style={{fontSize: 12}}>
                    Extras
                </p>
                <Nav.Link variant="primary" href="home/events" id='linkEvents' className='navLinkContainer'>
                    <i className="bi bi-people-fill p-2"></i>
                    Equipo
                </Nav.Link>
                <br/>
                <div>
                    <Nav.Link variant="primary" href="home/events" id='linkEvents' className='navLinkContainer'>
                        <i className="bi bi-envelope p-2"></i>
                        Contactanos
                    </Nav.Link>
                </div>
                <br/>
                <div className='text-center textAppVersionSideBar text-muted lead h6 mt-3'>
                    App Version: <span>1.0</span>
                </div>

                <hr/>

            </div>
        </div>
    )
}
