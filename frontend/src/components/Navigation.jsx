import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LogoQPLBlack from "../assets/img/QPL_Logo_Black.png";
import '../css/Navigation.css'
import { LinkContainer } from 'react-router-bootstrap'
import { AnimatedPageNavBar } from './AnimationPage';

function Navigation(user) {

    // Controlador para cuando el usuario le de click al icono de cerrar sesión
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

    return (
        <AnimatedPageNavBar>
            <Navbar bg="light" variant="light" className="py-3 border border-bottom shadow-sm h-100" >

                <Navbar.Brand className="px-4 d-flex align-items-center" id='qplContainer' href="/home">
                    <span><img src={LogoQPLBlack} id='qplLogoNavBar' className='' /></span>
                    <span id='qplTitle'>QuienPaLeer</span>
                </Navbar.Brand>
                <div className="vr ms-2"></div>

                <Container>
                    <Nav>
                        <Form.Select id="selectTypeSearch">
                            <option value="1">Eventos</option>
                            <option value="2">Compra de libros</option>
                            <option value='3'>Cambio de libros</option>
                        </Form.Select>

                        <InputGroup className="ps-3">
                            <Form.Control
                                type="search"
                                placeholder="Buscar..."
                                id='searchNavBar'
                            />
                            <Button id="btnSearchNavBar">
                                <i className="bi bi-search"></i>
                            </Button>
                        </InputGroup>
                    </Nav>

                    <Nav>
                        <div class="btn-group me-5">
                            <LinkContainer to={`profile/${user._id}`}>
                                <Nav.Link className='navBarLinks py-0 d-flex align-items-center' id='userNameNavContainer'>
                                    {user.name ? user.name + ' ' + user.lastName : 'Cargando...'}
                                    <i className="bi bi-person-circle px-2" style={{ fontSize: 30 }}></i>
                                </Nav.Link>
                            </LinkContainer>
                            <button type="button" className="btn" id='btnDropMenu' data-bs-toggle="dropdown"><i class="bi bi-caret-down-fill"></i></button>
                            <ul class="dropdown-menu">
                                <li>
                                    <Nav.Link  className='d-flex justify-content-center align-items-center' style={{ color:"#FF9F43" }}>
                                        <i className="navBarLinks bi bi-x-lg me-2" style={{ fontSize: 20 }}></i>
                                        Cerrar Sesión
                                    </Nav.Link>
                                </li>
                            </ul>
                        </div>
                    </Nav>

                </Container>
            </Navbar>
        </AnimatedPageNavBar>
    )
}

export default Navigation