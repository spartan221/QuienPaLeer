import React from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Nav from 'react-bootstrap/Nav';

export default function SideBar() {
    return (
        <div className='' >
            <div className="px-4 h-100 w-100" >
                <p className='text-secondary d-flex justify-content-start p-2'>
                    Browse
                </p>
                <Nav.Link variant="primary" href="/events">
                    <i className="bi bi-calendar-minus p-2"></i>
                    Eventos
                </Nav.Link>
                <br/>
                <Nav.Link variant="primary" href="/books">
                    <i className="bi bi-currency-dollar px-2"></i>
                    Compra de libros
                </Nav.Link>
                <br/>
                <Nav.Link>
                    <i className="bi bi-repeat px-2"></i>
                    Cambio de libros
                </Nav.Link>

                <hr/>

                <Button className="bg-dark border">Team  </Button>
            </div>
        </div>
    )
}
