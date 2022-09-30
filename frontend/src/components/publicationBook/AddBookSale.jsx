import { useState } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { uploadFile } from '../../../../backend/config/firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';



const baseURL = 'http://127.0.0.1:5000/api/book/create'

function FormBook() {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [file, setFile] = useState(null)
  const [show, setShow] = useState(false);
  const [book, setBook] = useState({});
  const bookOject = {
    name: '',
    title: '',
    author: '',
    editorial: '',
    year: '',
    price: '',
    cathegory: '',
    image: ''

  }

  function handleChangeFile(event) {
    setFile(event.target.files[0]);
    if (!!errors[event.target.name])
        setErrors({
            ...errors,
            [event.target.name]: null
        })
}
  const saveData = async (e) => {
    e.preventDefault()


    uploadFile(file).then(async (downloadURL) => {

      const newBook = {
        name: book.name,
        title: book.title,
        author: book.author,
        editorial: book.editorial,
        year: book.year,
        price: book.price,
        cathegory: book.cathegory,
        image: downloadURL
      }
      console.log('nuevo libro: ',newBook)
      await axios.post(baseURL, newBook);
      
    }).catch((error) => {
      console.log(error);
    })

    //setBook({ ...bookOject })
  }

  const captureValues = (e) => {
    const { name, value } = e.target
    setBook({ ...book, [name]: value })

  }


  return (
    <div className="px-4 ">
      <div className='container row border-bottom border-secondary ms-1 '>
        <h1 className="fs-4 text-start col-8 ps-0 ms-0">Agregar libro</h1>
        <div className="col-4 text-end"><AttachMoneyIcon /></div>
        
      </div>
      <br />
      <Form onSubmit={saveData} >
              
            <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Título de la venta</Form.Label>
                  <Form.Control required type="text"  name="title" value={book.title} onChange={captureValues} />
            </Form.Group>

              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre del libro</Form.Label>
                <Form.Control required type="text"  name="name" value={book.name} onChange={captureValues} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAuthor">
                <Form.Label>Autor</Form.Label>
                <Form.Control required type="text"  name="author" value={book.author} onChange={captureValues} />
              </Form.Group>


              <Row>
                <Col sm={8}>
                  <Form.Group className="mb-3" controlId="formEditorial">
                    <Form.Label>Editorial</Form.Label>
                    <Form.Control required type="text"  name="editorial" value={book.editorial} onChange={captureValues} />
                  </Form.Group>
                </Col>
                <Col sm={4}><Form.Group className="mb-3" controlId="formYear">
                  <Form.Label>Año</Form.Label>
                  <Form.Control required type="Number"  name="year" value={book.year} onChange={captureValues} />
                </Form.Group></Col>
              </Row>


              <Row>
                <Col>
                <Form.Label>Categoría</Form.Label>
                  <Form.Select aria-label="Default select example" name="cathegory" onChange={captureValues}>
                    <option>Seleccione la categoría</option>
                    <option value="romantico">Biografias</option>
                    <option value="drama">Ciencia</option>
                    <option value="educacion">Comics</option>
                    <option value="suspenso">Cuentos</option>
                    <option value="novela">Otros</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formPrice">
                    <Form.Label style={{color:"#FF9F43",fontWeight:"bold"}}>Precio</Form.Label>
                    <Form.Control required type="text"  name="price" value={book.price} onChange={captureValues} />
                  </Form.Group>
                </Col>

              </Row>
              <Row>
                <Col>
                  <Form.Label htmlFor="image" className="form-label">Imagen</Form.Label>
                  <Form.Control className="form-control" type="file" name="image" accept="image/png,  image/jpeg" id="image"  onChange={handleChangeFile} />
                </Col>
              </Row>

              <div className="d-flex justify-content-center mt-2">
                <style>
                  
                </style>
                <Button  className="bg-dark estilos" onClick={handleClose} variant="primary" type="submit" style={{border:"none"}}>
                  Agregar
                </Button>
              </div>

            </Form>
          </div>)
}

export default FormBook;