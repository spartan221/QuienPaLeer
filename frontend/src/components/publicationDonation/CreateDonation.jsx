import React from 'react'
import { useState } from 'react'
import { publicRequest } from '../../requestMethods'
import { uploadFile } from '../../../../backend/config/firebase/storage';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import '../css/CreateEvent.css'

const CreateDonation = ({reloadPage}) => {
    const [inputs, setInputs] = useState({})
    const [file, setFile] = useState(null)
    const [errors, setErrors] = useState({ file: null })

    function handleChange(event) {
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
        const { name, title, author, editorial } = inputs
        const newErrors = {}
        if (!name || name === '') newErrors.name = 'Ingresa un nombre.'
        if (!title || title === '') newErrors.title = 'Ingresa un título.'
        if (!author || author === '') newErrors.author = 'Ingresa el nombre del autor.'
        if (!editorial || editorial === '') newErrors.editorial = 'Ingresa la editorial del libro.'
        if (!file || file === '') newErrors.image = 'Sube una imagen.'
        return newErrors
    }

    const handleClick = (event) => {
        event.preventDefault()
        const formErrors = validateForm()
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
        } else {
            uploadFile(file).then((downloadURL) => {
                const newDonation = { ...inputs, image: downloadURL };
                publicRequest.post("/donation/create", newDonation, {withCredentials: true});
                reloadPage();
                
            }).catch((error) => {
                console.log(error);
            })
            
        }
    }

    return (
        <div className='container rounded border p-4'>
            <div className='container row border-bottom border-secondary ms-1'>
                <h1 className="fs-4 text-start col-8 ps-0 ms-0">Crear Donación</h1>
                <div className="col-4 text-end"><VolunteerActivismIcon /></div>
            </div>
            <form className="text-start mt-3">
                <label htmlFor="name" className="form-label">Título de la publicación</label><br />
                <input className="form-control" name="name" id="name" type="text" onChange={handleChange} ></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.title}</p>

                <label htmlFor="title" className="form-label">Nombre del libro</label><br />
                <input className="form-control" name="title" id="title" type="text" onChange={handleChange} ></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.name}</p>

                <label htmlFor="author" className="form-label">Autor</label><br />
                <input className="form-control" name="author" id="author" type="text" onChange={handleChange} ></input>

                <label htmlFor="editorial" className="form-label">Editorial</label><br />
                <input className="form-control" name="editorial" id="editorial" type="text" onChange={handleChange} ></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.editorial}</p>
                
                <label htmlFor="image" className="form-label">Imagen</label><br />
                <input className="form-control" type="file" name="image" accept="image/png, image/jpeg" id="image" onChange={handleChangeFile}></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.image}</p>
                <div className="text-center">
                    <button className="btn btn-dark px-5" id='btnCreateEventModal' type="submit" onClick={handleClick}>Agregar</button>
                </div>
            </form>
        </div>
    );
}

export default CreateDonation
