import React from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';


export default function SideBar() {

    let activeStyle = {
        backgroundColor : '#ff9f43'
    }

    return (
        <div className='' >
            <div className="px-4 h-100 w-100" >
                <p className='text-secondary d-flex justify-content-start p-2'>
                    Browse
                </p>

                <Nav vertical fill>
                    <NavItem>
                        <NavLink className='text-decoration-none text-dark'
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                            to='events'>
                            <i className="bi bi-calendar-minus p-2"></i>
                            Eventos
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='text-decoration-none text-dark'
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                            to='buyBooks'>
                            <i className="bi bi-currency-dollar p-2"></i>
                            Compra de libros
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='text-decoration-none text-dark'
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            } to='changeBooks'>
                            <i className="bi bi-repeat p-2"></i>
                            Cambio de libros
                        </NavLink>
                    </NavItem>
                </Nav>

                <hr />

                <Button className="bg-dark border">Teams</Button>
            </div>
        </div>
    )
}
