import { useState, useEffect } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const baseURL = 'http://localhost:5000/api/book/create'

function FormBook() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [book, setBook] = useState('');
    const bookOject = {
        name: '',
        isbn: '',
        author: '',
        editorial: '',
        year: '',
        price: '',
        cathegory: '',
        user: ''
    }

    const handleChangeFile=(event) => {
        setFile(event.target.files[0]);
        if (!!errors[event.target.name])
            setErrors({
                ...errors,
                [event.target.name]: null
            })
    }
    const saveData = async (e) => {
        e.preventDefault()
        const newBook = {
            name: book.name,
            isbn: book.isbn,
            author: book.author,
            editorial: book.editorial,
            year: book.year,
            price: book.price,
            cathegory: book.cathegory
        }
        await axios.post(baseURL, newBook)
        setBook({ ...bookOject })
    }

    const captureValues = (e) => {
        const { name, value } = e.target
        setBook({ ...book, [name]: value })
        console.log(book)
    }

    return (<div>
        <Button variant="primary" onClick={handleShow}>
            Agregar libro
        </Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar libro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="px-4">
                    <Form onSubmit={saveData}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese nombre del libro" value={book.name} onChange={captureValues} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formAuthor">
                            <Form.Label>Autor:</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el autor" value={book.author} onChange={captureValues} />
                        </Form.Group>


                        <Row>
                            <Col sm={8}>
                                <Form.Group className="mb-3" controlId="formEditorial">
                                    <Form.Label>Editorial:</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese la editorial" value={book.editorial} onChange={captureValues} />
                                </Form.Group>
                            </Col>
                            <Col sm={4}><Form.Group className="mb-3" controlId="formISBN">
                                <Form.Label>ISBN:</Form.Label>
                                <Form.Control type="text" placeholder="ISBN del libro" value={book.isbn} onChange={captureValues} />
                            </Form.Group></Col>
                        </Row>


                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formYear">
                                    <Form.Label>Año:</Form.Label>
                                    <Form.Control type="Number" placeholder="Ingrese el año de publiación" value={book.year} onChange={captureValues} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formPrice">
                                    <Form.Label>precio $:</Form.Label>
                                    <Form.Control type="text" placeholder="Ingrese el precio" value={book.price} onChange={captureValues} />
                                </Form.Group>
                            </Col>

                        </Row>

                        <Row>
                            <Col>
                                <Form.Label>Categoría:</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>Seleccione la categoría</option>
                                    <option value="1">Romántico</option>
                                    <option value="2">Drama</option>
                                    <option value="3">Educación</option>
                                    <option value="4">Suspenso</option>
                                    <option value="5">Novela</option>
                                </Form.Select>
                            </Col>

                            <Col>
                                <Form.Label htmlFor="image" className="form-label">Imagen</Form.Label>
                                <Form.Control className="form-control" type="file" name="image" accept="image/png, image/jpeg" id="image" onChange={handleChangeFile}/>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-center mt-2">
                            <Button className="bg-dark" variant="primary" type="submit">
                                Agregar
                            </Button>
                        </div>

                    </Form>
                </div>

            </Modal.Body>
        </Modal>


    </div >)
}

export default FormBook;