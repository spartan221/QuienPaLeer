import React from 'react'
import { useState } from 'react'
import { publicRequest } from '../../requestMethods'
import { uploadFile } from '../../../../backend/config/firebase/storage';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/CreateEvent.css'


const CreateDonation = ({reloadPage,closeModal}) => {
    const [inputs, setInputs] = useState({})
    const [file, setFile] = useState(null)
    const [donation, setDonation] = useState({});
    const [errors, setErrors] = useState({ file: null })

    const donationOject = {
        name:"",
        title: "",
        author: "",
        editorial: ""
      }
    function handleChange(event) {
        const { name, value } = event.target
        setDonation({ ...donation, [name]: value })
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
        console.log("validte",name)
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
            closeModal();
            uploadFile(file).then(async (downloadURL) => {
                const newDonation = { ...inputs, image: downloadURL };
                await publicRequest.post("/donation/create", newDonation, { withCredentials: true });
                reloadPage();
                setDonation(donationOject)
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
                <h1 className="fs-4 text-start col-8 ps-0 ms-0">Crear Donación</h1>
                <i className="col-4 text-end  bi-bag-heart "></i>
            </div>
            <form className="text-start mt-3">
                <label htmlFor="title" className="form-label">Título de la publicación</label><br />
                <input className="form-control" name="title" id="title" type="text" value={donation.title} onChange={handleChange} ></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.title}</p>

                <label htmlFor="name" className="form-label">Nombre del libro</label><br />
                <input className="form-control" name="name" id="name" type="text" value={donation.name}  onChange={handleChange} ></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.name}</p>

                <label htmlFor="author" className="form-label">Autor</label><br />
                <input className="form-control" name="author" id="author" type="text" value={donation.author} onChange={handleChange} ></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.author}</p>

                <label htmlFor="editorial" className="form-label">Editorial</label><br />
                <input className="form-control" name="editorial" id="editorial" type="text" value={donation.editorial} onChange={handleChange} ></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.editorial}</p>
                
                <label htmlFor="image" className="form-label">Imagen</label><br />
                <input className="form-control" type="file" name="image" accept="image/png, image/jpeg" id="image" onChange={handleChangeFile}></input>
                <p className="errorContainer ms-1 mt-2 text-danger">{errors.image}</p>
                <div className="d-flex justify-content-center mt-2">
                    <button  className="btn btn-dark px-5" id='btnAddSellBookModal' variant="primary"   onClick={handleClick}>Agregar</button>
                </div>
            </form>
        </div>
    );
}

export default CreateDonation
