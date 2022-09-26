import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/View.css'
function Navigation() {
    return (
        <>
            <Navbar bg="light" variant="light" className="py-3 border border-bottom shadow-sm h-100" >

                <Navbar.Brand className="px-4 negrita" href="/">
                        QuienPaLeer
                </Navbar.Brand>
                <div className="vr"></div>

                <Container>

                    <Nav  >
                        <NavDropdown title="Libros" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="books">Libros</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Eventos</NavDropdown.Item>
                        </NavDropdown>

                        <Form className="d-flex justify-content px-2">
                            <Form.Control
                                type="search"
                                placeholder="Busca un libro"
                                className="me-2 "
                                aria-label="Search"
                            />
                            <Button className='orange-text text-white border'>Buscar</Button>
                        </Form>
                        

                    </Nav>
                    <Nav>

                        <Nav.Link  className='py-0'>
                        <i className="bi bi-person-circle px-2" style={{ fontSize: 30 }}></i>                            
                                Usuario                           
                        </Nav.Link>

                        <div className="vr"></div>

                        <Nav.Link eventKey="link-1">
                            <i className="bi bi-pencil-square" style={{ fontSize: 20 }}></i>
                        </Nav.Link>

                        <Nav.Link>
                            <i className="bi bi-x-lg"  style={{ fontSize: 20 }}></i>
                        </Nav.Link>
                        
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation