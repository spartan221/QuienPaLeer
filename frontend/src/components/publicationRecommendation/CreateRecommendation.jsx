import React from 'react'
import { useState } from 'react'
import { publicRequest } from '../../requestMethods'
import { uploadFile } from '../../../../backend/config/firebase/storage';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/CreateEvent.css'
import Swal from 'sweetalert2'
import RecommendIcon from '@mui/icons-material/Recommend';


const CreateRecommendation = ({ reloadPage, closeModal }) => {
    const [inputs, setInputs] = useState({})
    const [file, setFile] = useState(null)
    const [recommendation, setRecommendation] = useState({});
    const [errors, setErrors] = useState({ file: null })

    const recommendationOject = {
        name: "",
        title: "",
        author: "",
        recommendation: "",
        summary: ""
    }
    function handleChange(event) {
        const { name, value } = event.target
        setRecommendation({ ...recommendation, [name]: value })
        setInputs(prevInput => {
            return {
                ...prevInput, [event.target.name]: event.target.value
            }
        })

        if (!!errors[event.target.name])
            setErrors({
                ...errors,
                [event.target.name]: null
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
        const { name, title, author, recommendation, summary } = inputs
        const newErrors = {}
        if (!name || name === '') newErrors.name = 'Ingresa un nombre.'
        if (!title || title === '') newErrors.title = 'Ingresa un título.'
        if (!author || author === '') newErrors.author = 'Ingresa el nombre del autor.'
        if (!recommendation || recommendation === '') newErrors.recommendation = 'Ingresa la razón del porqué recomiendas este libro.'
        if (!summary || summary === '') newErrors.summary = 'Ingresa un resumen sobre el libro.'
        if (!file || file === '') newErrors.image = 'Sube una imagen.'
        return newErrors
    }

    const handleClick = (event) => {
        event.preventDefault()
        const formErrors = validateForm()
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
        } else {
            closeModal();
            uploadFile(file).then(async (downloadURL) => {
                const newRecommendation = { ...inputs, image: downloadURL };
                await publicRequest.post("/recommendation/create", newRecommendation, { withCredentials: true });
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Donación agregada.'
                })
                document.getElementById('recommendationForm').reset()
                reloadPage();
                setRecommendation(recommendationOject)
                setInputs({})

                //setDonation(donationOject)
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <div className='container rounded border p-4'>
            <div className='container row border-bottom border-secondary ms-1'>
                <h1 className="fs-4 text-start col-8 ps-0 ms-0">Crear Recomendación</h1>
                <i className="col-4 text-end bi bi-hand-thumbs-up"></i>
            </div>
            <form className="text-start mt-3" id="recommendationForm">
                <label htmlFor="title" className="form-label">Título de la publicación</label><br />
                <input className="form-control" name="title" id="title" type="text" value={recommendation.title} onChange={handleChange} ></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.title}</p>

                <label htmlFor="name" className="form-label">Nombre del libro</label><br />
                <input className="form-control" name="name" id="name" type="text" value={recommendation.name} onChange={handleChange} ></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.name}</p>

                <label htmlFor="author" className="form-label">Autor</label><br />
                <input className="form-control" name="author" id="author" type="text" value={recommendation.author} onChange={handleChange} ></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.author}</p>
                <div className='row'>
                    <div className='col'>
                        <label htmlFor="recommendation" className="form-label">Recomendación</label><br />
                        <textarea className="form-control" name="recommendation" id="recommendation" type="text" value={recommendation.recommendation} onChange={handleChange} ></textarea>
                        <p className="errorContainer ms-1 mt-2 text-danger">{errors.recommendation}</p>
                    </div>
                    <div className='col'>
                        <label htmlFor="summary" className="form-label">Resumen del libro</label><br />
                        <textarea className="form-control" name="summary" id="summary" type="text" value={recommendation.summary} onChange={handleChange} ></textarea>
                        <p className="errorContainer ms-1 mt-2 text-danger">{errors.summary}</p>
                    </div>
                </div>
                <label htmlFor="image" className="form-label">Imagen</label><br />
                <input className="form-control" type="file" name="image" accept="image/png, image/jpeg" id="image" onChange={handleChangeFile}></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.image}</p>
                <div className="d-flex justify-content-center mt-2">
                    <button className="btn btn-dark px-5" id='btnAddSellBookModal' variant="primary" onClick={handleClick}>Agregar</button>
                </div>
            </form>
        </div>
    );
}

export default CreateRecommendation
