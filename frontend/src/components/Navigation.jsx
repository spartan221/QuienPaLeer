import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown'
import 'bootstrap-icons/font/bootstrap-icons.css';
import LogoQPLBlack from "../assets/img/QPL_Logo_Black.png";
import '../css/Navigation.css'
function Navigation({ userName }) {
    return (
        <>
            <Navbar bg="light" variant="light" className="py-3 border border-bottom shadow-sm h-100" >

                <Navbar.Brand className="px-4 d-flex align-items-center" href="/">
                    <span><img src={LogoQPLBlack} id='qplLogoNavBar' className='' /></span>
                    <span id='qplTitle'>QuienPaLeer</span>
                </Navbar.Brand>
                <div className="vr ms-2"></div>

                <Container>

                    <Nav  >
                        <NavDropdown title="Compra de Libros" id="collasible-nav-dropdown">
                            <ul>
                                <li>Compra de Libros</li>
                                <li>Eventos</li>
                            </ul>
                        </NavDropdown>

                        <Form className="d-flex justify-content px-2" id='containerSearchNavBar'>
                            <Form.Control
                                type="search"
                                placeholder="Busca un libro"
                                className="me-3"
                                id='searchNavBar'
                                aria-label="Search"
                            />
                            <Button className='' id='btnSearchNavBar' >Buscar</Button>
                        </Form>

                    </Nav>
                    <Nav>

                        <Nav.Link className='navBarLinks py-0 d-flex align-items-center' id='userNameNavContainer'>
                            {userName ? userName : 'Cargando...'}
                            <i className="bi bi-person-circle px-2" style={{ fontSize: 30 }}></i>
                        </Nav.Link>

                        <div className="vr mx-3"></div>

                        <Nav.Link eventKey="link-1">
                            <i className="navBarLinks bi bi-pencil-square" style={{ fontSize: 20 }}></i>
                        </Nav.Link>

                        <Nav.Link>
                            <i className="navBarLinks bi bi-x-lg mx-3" style={{ fontSize: 20 }}></i>
                        </Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation