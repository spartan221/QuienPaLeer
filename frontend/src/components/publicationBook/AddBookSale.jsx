import { useState } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { uploadFile } from '../../../../backend/config/firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import '../css/CreateBookSale.css'



const baseURL = 'http://127.0.0.1:5000/api/book/create'

function FormBook({reloadPage,closeModal}) {
  let re = /^\d+$/;
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [errors, setErrors] = useState({ file: null })
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
    console.log("click")
    e.preventDefault()

    const formErrors = validateForm()
    console.log('errores',formErrors)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    }else{
      closeModal();
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
      reloadPage();
      setBook(bookOject)
      setInputs({})
    }).catch((error) => {
      console.log(error);
    }) 
  }
  }

  const captureValues = (e) => {
    const { name, value } = e.target
    setBook({ ...book, [name]: value })
    setInputs(prevInput => {
      return {
          ...prevInput, [e.target.name]: e.target.value
      }
  })

    if (!!errors[e.target.name])
            setErrors({
                ...errors,
                [e.target.name]: null
            })

  }
  function handleChangeFile(event) {
    setFile(event.target.files[0]);
    if (!!errors[event.target.name])
        setErrors({
            ...errors,
            [event.target.name]: null
        })
}

  const validateForm = () => {
    const { name, title, author, editorial, year, image,price } = inputs
    const newErrors = {}
    if (!name || name === '') newErrors.name = 'Ingresa un nombre.'
    if (!title || title === '') newErrors.title = 'Ingresa un título.'
    if (!author || author === '') newErrors.author = 'Ingresa un autor.'
    if (!editorial || editorial === '') newErrors.editorial = 'Ingresa una editorial.'
    if (!year || year === '') newErrors.year = 'Ingresa el año de publicación.'
    if (!(re.test(year))) newErrors.year = 'Ingresa un número.'
    if (!file || file === '') newErrors.image = 'Sube una imagen.'
    if (!price || price === '') newErrors.price = 'Ingresa un precio.'
    if (!(re.test(price))) newErrors.price = 'Ingresa un número.'
    return newErrors
}


  return (
    <div className="px-4 ">
      <div className='container row border-bottom border-secondary ms-1 '>
        <h1 className="fs-4 text-start col-8 ps-0 ms-0">Agregar libro</h1>
        <div className="col-4 text-end"><AttachMoneyIcon /></div>
        
      </div>
      <br />
      <Form onSubmit={saveData} novalidate="novalidate"  >
              
            <Form.Group className="mb-3" controlId="formTitle"  >
            <Form.Label>Título de la venta</Form.Label>
                  <Form.Control  type="text"  name="title"  value={book.title} onChange={captureValues} />
                  <p className="errorContainer ms-1 mt-2 text-danger">{errors.title}</p>
            </Form.Group>

              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nombre del libro</Form.Label>
                <Form.Control  type="text"  name="name"  value={book.name} onChange={captureValues} />
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.name}</p>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formAuthor">
                <Form.Label>Autor</Form.Label>
                <Form.Control  type="text"  name="author"  value={book.author} onChange={captureValues} />
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.author}</p>
              </Form.Group>

              <Row>
                <Col sm={8}>
                  <Form.Group className="mb-3" controlId="formEditorial">
                    <Form.Label>Editorial</Form.Label>
                    <Form.Control  type="text"  name="editorial"  value={book.editorial} onChange={captureValues} />
                    <p className="errorContainer ms-1 mt-2 text-danger">{errors.editorial}</p>
                  </Form.Group>
                </Col>
                <Col sm={4}><Form.Group className="mb-3" controlId="formYear">
                  <Form.Label>Año</Form.Label>
                  <Form.Control  type="number"  name="year"  value={book.year} onChange={captureValues} />
                  <p className="errorContainer ms-1 mt-2 text-danger">{errors.year}</p>
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
                    <Form.Control  type="number"  name="price"  value={book.price} onChange={captureValues} />
                    <p className="errorContainer ms-1 mt-2 text-danger">{errors.price}</p>
                  </Form.Group>
                </Col>

              </Row>
              <Row>
                <Col>
                  <Form.Label htmlFor="image" className="form-label">Imagen</Form.Label>
                  <Form.Control className="form-control" type="file" name="image"  accept="image/png,  image/jpeg"   onChange={handleChangeFile} />
                  <p className="errorContainer ms-1 mt-2 text-danger">{errors.image}</p>
                </Col>
              </Row>

              <div className="d-flex justify-content-center mt-2">
                <style>
                  
                </style>
                <Button  className="btn btn-dark px-5" id='btnAddSellBookModal'  variant="primary" type="submit" style={{border:"none"}}>
                  Agregar
                </Button>
              </div>

            </Form>
          </div>)
}

export default FormBook;