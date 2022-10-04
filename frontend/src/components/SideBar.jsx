import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import '../css/SideBar.css'

export default function SideBar() {

    let activeStyle = {
        backgroundColor : '#ff9f43',
        borderRadius: '5px',
    }

    return (
        <div>
            <div className="px-4 h-100 w-100" >
                <p className='text-muted d-flex justify-content-start p-2 mt-3' style={{fontSize: 12}}>
                    Opciones
                </p>

                <Nav vertical fill>
                    <NavItem className='d-flex align-items-start pb-4'>
                        <NavLink className='text-decoration-none text-dark navLinkContainer w-100 text-start'
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                            to='events'>
                            <i className="bi bi-calendar-minus p-2"></i>
                            Eventos
                        </NavLink>
                    </NavItem>
                    <NavItem className='d-flex align-items-start  pb-4'>
                        <NavLink className='text-decoration-none text-dark navLinkContainer w-100 text-start'
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                            to='buyBooks'>
                            <i className="bi bi-currency-dollar p-2"></i>
                            Compra de libros
                        </NavLink>
                    </NavItem>
                    <NavItem className='d-flex align-items-start  pb-4'>
                        <NavLink className='text-decoration-none text-dark navLinkContainer w-100 text-start'
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            } to='changeBooks'>
                            <i className="bi bi-repeat p-2"></i>
                            Cambio de libros
                        </NavLink>
                    </NavItem>
                </Nav>

                <hr />

                <p className='text-muted d-flex justify-content-start p-2 mt-3' style={{fontSize: 12}}>
                    Extras
                </p>
                <Nav.Link href="" className='navLinkContainer text-muted' disabled>
                    <i className="bi bi-people-fill p-2"></i>
                    Equipo
                </Nav.Link>
                <br/>
                <div>
                    <Nav.Link href="" className='navLinkContainer text-muted' disabled>
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
