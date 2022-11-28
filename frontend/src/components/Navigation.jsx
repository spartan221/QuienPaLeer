import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/Navigation.css'
import { AnimatedPageNavBar } from './AnimationPage';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ApiHeroku = import.meta.env.VITE_API

function Navigation(user) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ place: 'events' })
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(0);
    const reloadPage = () => setReload(reload + 1);
    const [seed, setSeed] = useState(1);

    const handleChange = async (event) => {
        setInputs(prevInput => {
            return {
                ...prevInput, [event.target.name]: event.target.value
            }
        })
        console.log(inputs);
    }

    const handleSearch = async (event) => {
        if (inputs.filter == '') {
            navigate(`${inputs.place}/search/undefined`)
        } else {
            navigate(`${inputs.place}/search/${inputs.filter}`)
        }
    }
    const onEnter = async (event) => {
        navigate(`${inputs.place}/search/${inputs.filter}`)
    }

    return (
        <AnimatedPageNavBar>
            <Navbar id='navBarContainer' className="py-3 shadow-sm" >
                <Container className='container-fluid d-flex align-items-center justify-content-center'>
                    <Nav>
                        <Form.Select id="selectTypeSearch" className='w-50' onChange={handleChange} name='place'>
                            <option value="events">Eventos</option>
                            <option value="buyBooks">Compra/Venta de libros</option>
                            <option value='changeBooks'>Cambio de libros</option>
                            <option value='donationBooks'>Donación de libros</option>
                            <option value='recommendationBooks'>Recomendación de libros</option>
                        </Form.Select>

                        <InputGroup className="ps-3 w-100">
                            <Form.Control
                                type="search"
                                placeholder="Buscar..."
                                id='searchNavBar'
                                name='filter'
                                onChange={handleChange}
                                className='w-50'
                                onKeyPress={event => {
                                    if (event.key === 'Enter') {
                                        handleSearch();
                                    }
                                }}
                            />
                            <Button id="btnSearchNavBar" onClick={handleSearch}>
                                <i className="bi bi-search"></i>
                            </Button>
                        </InputGroup>
                    </Nav>
                </Container>
            </Navbar>
        </AnimatedPageNavBar>
    )
}

export default Navigation