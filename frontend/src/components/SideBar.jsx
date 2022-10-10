import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/SideBar.css'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import { Button, Nav, NavItem } from 'react-bootstrap';
import LogoQPLBlack from "../assets/img/QPL_Logo_Black.png";
import TeamJson from '../assets/team.json';

export default function SideBar() {

    let activeStyle = {
        backgroundColor : '#ffb875',
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
                    <NavItem className='d-flex align-items-start  pb-4'>
                        <NavLink className='text-decoration-none text-dark navLinkContainer w-100 text-start'
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            } to='donationBooks'>
                            <i className="bi bi-bag-heart p-2"></i>
                            Donación de libros
                        </NavLink>
                    </NavItem>
                </Nav>

                <hr />

                <p className='text-muted d-flex justify-content-start p-2 mt-3' style={{fontSize: 12}}>
                    Extras
                </p>

                <div className='d-flex justify-content-evenly align-items-center'>
                    <div>
                        <button type="button" className="btn" id='btnInfoTeamSideBar' data-bs-toggle="modal" data-bs-target="#teamModal">
                            <i class="bi bi-info-lg"></i>
                        </button>
                    </div>
                    <div>
                        <a href='mailto:ProyectoQPL.App@gmail.com'>
                            <button type="button" className="btn text-black" id='btnInfoTeamSideBar'>
                                <i class="bi bi-envelope">
                                </i>
                            </button>
                        </a>
                    </div>
                </div>
                <br/>
                <div className='text-center textAppVersionSideBar text-muted lead h6 mt-3'>
                    App Version: <span>2.4</span>
                </div>

                <hr/>

            </div>

            <div className="modal fade modal-lg" id="teamModal" tabindex="-1" aria-labelledby="teamModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-start">
                            <h5 className='modal-title fw-bold ms-2' id="teamModalLabel">Equipo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body d-flex flex-row flex-wrap justify-content-center">
                                {TeamJson.map((member, i) => (
                                    <div className="card w-25 m-2 fw-lighter" key={i}>
                                        <div className="card-header h-50">
                                            <h6 className='text-center'>{member.firstname + ' ' + member.lastname}</h6>
                                        </div>
                                        <div className='card-body'>
                                            <h6 className='text-center text-muted'>
                                                {member.dev}
                                            </h6>
                                            <div className='d-flex justify-content-center'>
                                                <a href={member.email} className='text-decoration-none'>
                                                    <button className='btnContactMember btn mt-3'style={{fontSize: 10, backgroundColor: '#ffb875', color: 'black'}}>Contactar</button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="modal-footer">
                            <span><img src={LogoQPLBlack} id='qplLogoNavBar' className='' /></span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}
