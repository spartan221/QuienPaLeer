import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/SideBar.css';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Nav, Navbar, NavItem } from 'react-bootstrap';
import LogoQPLBlack from "../assets/img/QPL_Logo_White.png";
import TeamJson from '../assets/team.json';
import { AnimatedPageSmoothY } from '../components/AnimationPage'
import RecommendIcon from '@mui/icons-material/Recommend';
import profileUnknown from '../assets/img/profileUnknown.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function SideBar(user) {
    const navigate = useNavigate();
    const ApiHeroku = import.meta.env.VITE_API
    const baseURL = ApiHeroku + 'api/auth/logout'

    const handleLogout = async () => {
        axios.get(baseURL, { withCredentials: true })
            .then(async (response) => {
                const sucessMessage = response.data.message;

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'warning',
                    title: sucessMessage
                })

                // Redirigir al login si todo sale bien
                navigate('/', { replace: true })


            })
            .catch((error) => {
                const errMessage = error.response.data.message;
            })


    };

    let activeStyle = {
        borderLeft: '4px solid #FFC814',
        padding: '3px',
        color: '#FFC814'
    }

    return (
        <AnimatedPageSmoothY>

            <div className='container-fluid sidebar d-flex align-content-center justify-items-center'>
                <div className='row'>
                    <div className='col-auto vh-100'>
                        <div className='my-4 mb-5' >
                            <div className='text-center'>
                                <a style={{ textDecoration: "none" }} href='/home'>
                                    <h5 className='bounce fw-bold d-none d-md-inline' style={{ color: "#FFC814" }}>QuienPaLeer</h5>
                                </a>
                            </div>
                            <a href='/home'>
                                <div className='d-flex justify-content-center align-items-center' ><img src={LogoQPLBlack} id='qplLogoNavBar' /></div>
                            </a>
                        </div>

                        <div>
                            <Nav>
                                <div className="btn-group mb-5">
                                    <LinkContainer to={`profile/${user._id}`}>
                                        <div className='navBarLinks d-flex align-content-center justify-items-center' id='userNameNavContainer'>
                                            <div id='userProfilePhoto' style={user.photo ? { backgroundImage: "url(" + user.photo + ")" } : { backgroundImage: "url(" + profileUnknown + ")" }} />
                                            <div className='ms-4 containerNameUser'>
                                                <div className='row nameUser'>{user.name ? user.name : 'Cargando...'}</div>
                                                <div className='row nameUser'>{user.name ? user.lastName : 'Cargando...'}</div>
                                            </div>
                                        </div>
                                    </LinkContainer>
                                </div>
                            </Nav>
                        </div>
                        <ul>
                            <li>
                                <NavLink className='nav-link px-2 d-inline-flex w-100'
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                    to='events'>
                                    <i className="bi bi-calendar-minus pe-2" /><span className='ms-1 d-none d-md-inline'>Eventos</span>
                                </NavLink>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <NavLink className='nav-link px-2 d-inline-flex w-100 mt-3' style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                                    to='buyBooks'>
                                    <i className="bi bi-currency-dollar pe-2" /><span className='ms-1 d-none d-md-inline'>Comercio</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className='nav-link px-2 d-inline-flex w-100 mt-3' style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                } to='changeBooks'>
                                    <i className="bi bi-repeat pe-2" /><span className='ms-1 d-none d-md-inline'>Intercambio</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className='nav-link px-2 d-inline-flex w-100 mt-3' style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                } to='donationBooks'>
                                    <i className="bi bi-bag-heart pe-2" /><span className='ms-1 d-none d-md-inline '>Donación</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className='nav-link px-2 d-inline-flex w-100 mt-3' style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                } to='recommendationBooks'>
                                    <i className="bi bi-hand-thumbs-up pe-2" /><span className='ms-1 d-none d-md-inline'>Recomendación</span>
                                </NavLink>
                            </li>
                            <hr className='w-100' />
                            <li>
                                <NavLink className='nav-link px-2 d-inline-flex w-100'>
                                    <i className="bi bi-info-lg pe-2" /><span className='ms-1 d-none d-md-inline' data-bs-toggle="modal" data-bs-target="#teamModal">Equipo</span>
                                </NavLink>
                            </li>
                            <li>
                                <a className='nav-link px-2 d-inline-flex w-100 mt-3' href='mailto:quienpaleerproyecto@gmail.com'>
                                    <i className="bi bi-envelope pe-2" /><span className='ms-1 d-none d-md-inline'>Contactar</span>
                                </a>
                            </li>
                            <hr className='w-100' />
                            <li>
                                <NavLink className='nav-link px-2 d-inline-flex w-100'>
                                    <i style={{ color: '#88ACFC' }} className="bi bi-box-arrow-left pe-2"></i><span onClick={handleLogout} className='ms-1 d-none d-md-inline' style={{ color: '#88ACFC' }}>Cerrar Sesión</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="modal fade modal-lg" id="teamModal" tabIndex="-1" aria-labelledby="teamModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-start">
                            <h5 className='modal-title fw-bold ms-2' id="teamModalLabel">Equipo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex flex-row flex-wrap justify-content-center">
                            {TeamJson.map((member, i) => (
                                <div className="card border-0 w-25 m-2 fw-lighter d-flex justify-content-center align-items-center" key={i}>
                                    <div className='containerImageMember' style={{ backgroundImage: "url(" + member.imgpath + ")" }}></div>
                                    <div className="mt-3">
                                        <h6 className='text-center'>{member.firstname + ' ' + member.lastname}</h6>
                                        <h6 className='text-center text-muted fs-6'>
                                            {member.dev}
                                        </h6>
                                    </div>
                                    <div>
                                        <a href={member.github} target='_blank'>
                                            <i className="bi bi-github" style={{ color: '#000' }}></i>
                                        </a>
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
        </AnimatedPageSmoothY>

    )
}
