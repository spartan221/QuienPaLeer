import { useState } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { uploadFile } from '../../../../backend/config/firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AttachMoneyIcon from '@mui/icons-material/ChangeCircleOutlined';
import '../css/CreateBookSale.css'



const baseURL = 'http://127.0.0.1:5000/api/swap/create'

function FormSwap({ reloadPage }) {
    let re = /^\d+$/;
    const [inputs, setInputs] = useState({})
    const [file, setFile] = useState(null)
    const [errors, setErrors] = useState({ file: null })
    const [swap, setSwap] = useState({});
    const swapOject = {
        title: '',
        author: '',
        description: '',
        interest: '',
        image: '',
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
        //console.log("click")
        e.preventDefault()

        const formErrors = validateForm()
        console.log('errores', formErrors)
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
        } else {
            uploadFile(file).then(async (downloadURL) => {
                const newSwap = {
                    title: swap.title,
                    author: swap.author,
                    description: swap.description,
                    interest: swap.interest,
                    image: downloadURL
                }
                console.log('nuevo intercambio: ', newSwap,)
                await axios.post(baseURL, newSwap,{withCredentials: true});
                reloadPage();
                setSwap(swapOject)
            }).catch((error) => {
                console.log(error);
            })
        }
    }
    const captureValues = (e) => {
        const { name, value } = e.target
        setSwap({ ...swap, [name]: value })
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
        const { title, author, description, interest, image } = inputs
        const newErrors = {}
        if (!title || title === '') newErrors.title = 'Ingresa un título.'
        if (!author || author === '') newErrors.author = 'Ingresa un autor.'
        if (!description || description === '') newErrors.description = 'Ingresa una descripción.'
        if (!interest || interest === '') newErrors.interest = 'Ingresa tus intereses.'
        if (!file || file === '') newErrors.image = 'Sube una imagen.'
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
                    <Form.Label>Nombre del libro</Form.Label>
                    <Form.Control type="text" name="title" value={swap.title} onChange={captureValues} />
                    <p className="errorContainer ms-1 mt-2 text-danger">{errors.title}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAuthor">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control type="text" name="author" value={swap.author} onChange={captureValues} />
                    <p className="errorContainer ms-1 mt-2 text-danger">{errors.author}</p>
                </Form.Group>

                <Row>
                    <Col >
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Descripción </Form.Label>
                            <Form.Control as="textarea" rows={2} name="description" value={swap.description} onChange={captureValues} />
                            <p className="errorContainer ms-1 mt-2 text-danger">{errors.description}</p>
                        </Form.Group>
                    </Col>
                    <Col >
                        <Form.Group className="mb-3" controlId="formInterest">
                            <Form.Label>Interés</Form.Label>
                            <Form.Control as="textarea" rows={2} name="interest" value={swap.interest} onChange={captureValues} />
                            <p className="errorContainer ms-1 mt-2 text-danger">{errors.interest}</p>
                        </Form.Group>
                    </Col>
                </Row>


                <Row>
                    <Col>
                        <Form.Label htmlFor="image" className="form-label">Imagen</Form.Label>
                        <Form.Control className="form-control" type="file" name="image" accept="image/png,  image/jpeg" onChange={handleChangeFile} />
                        <p className="errorContainer ms-1 mt-2 text-danger">{errors.image}</p>
                    </Col>
                </Row>

                <div className="d-flex justify-content-center mt-2">
                    <style>

                    </style>
                    <Button className="mt-4" id='btnAddSellBookModal' variant="primary" type="submit" style={{ border: "none" }}>
                        Agregar
                    </Button>
                </div>

            </Form>
        </div>)
}
export default FormSwap;