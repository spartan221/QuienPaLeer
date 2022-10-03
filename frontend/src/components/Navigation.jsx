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
function Navigation({ userName }) {
    return (
        <>
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
                                <i class="bi bi-search"></i>
                            </Button>
                        </InputGroup>


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