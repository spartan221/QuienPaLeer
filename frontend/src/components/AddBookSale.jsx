import { useState, useEffect } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseURL = 'http://localhost:5000/api/book/create'

function FormBook() {

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
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Agregar libro
        </button>
        
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <Form onSubmit={saveData}>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese nombre del libro" value={book.name} onChange={captureValues} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formISBN">
                <Form.Label>ISBN:</Form.Label>
                <Form.Control type="text" placeholder="ISBN del libro" value={book.isbn} onChange={captureValues} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAuthor">
                <Form.Label>Autor:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el autor" value={book.author} onChange={captureValues} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEditorial">
                <Form.Label>Editorial:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese la editorial" value={book.editorial} onChange={captureValues} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formYear">
                <Form.Label>Año:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el año de publiación" value={book.year} onChange={captureValues} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>precio $:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese el precio" value={book.price} onChange={captureValues} />
            </Form.Group>

            <Form.Label>Categoría:</Form.Label>
            <Form.Select aria-label="Default select example">

                <option>Seleccione la categoría</option>
                <option value="1">Romántico</option>
                <option value="2">Drama</option>
                <option value="3">Educación</option>
                <option value="4">Suspenso</option>
                <option value="5">Novela</option>
            </Form.Select>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

    </div>)
}

export default FormBook;