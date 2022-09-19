import React from 'react'
import { useState } from 'react'
import { publicRequest } from '../requestMethods'
import { uploadFile } from '../../../backend/config/firebase/storage';

const CreateEvent = () => {
    const [inputs, setInputs] = useState({})
    const [file, setFile] = useState(null)

    function handleChange(event) {
        setInputs(prevInput => {
            return {
                ...prevInput, [event.target.name]: event.target.value
            }
        })
    }

    //Se sube la imagen a Firebase, por consola se visualiza el porcentaje de subida
    const handleClick = (event) => {
        event.preventDefault()
        uploadFile(file).then((downloadURL) => {
            const newEvent = { ...inputs, image: downloadURL };
            publicRequest.post("/event/create", newEvent);
        }).catch((error) => {
            console.log(error);
        })
    }

    //TODO
    // Comprobar que los campos del form no estén vacíos antes de envíarlo
    return (
        <div>
            <h1>Crear Evento</h1>
            <form>
                <label htmlFor="image">Imagen</label><br />
                <input type="file" name="image" accept="image/png, image/jpeg" id="image" onChange={(e) => setFile(e.target.files[0])}></input><br />
                <label htmlFor="name">Nombre</label><br />
                <input name="name" id="name" type="text" onChange={handleChange}></input><br />
                <label htmlFor="description">Descripción</label><br />
                <input name="description" id="description" type="text" onChange={handleChange}></input><br />
                <label htmlFor="startDate">Fecha Inicio</label><br />
                <input type="date" name="startDate" id="startDate" onChange={handleChange}></input><br />
                <label htmlFor="endDate">Fecha Fin</label><br />
                <input type="date" name="endDate" id="endDate" onChange={handleChange}></input><br />
                <label htmlFor="hour">Hora</label><br />
                <input type="time" name="hour" id="hour" onChange={handleChange}></input><br />
                <label htmlFor="place">Lugar</label><br />
                <input name="place" id="place" type="text" onChange={handleChange}></input><br />
                <input type="submit" onClick={handleClick}></input>
            </form>
        </div>
    )
}

export default CreateEvent
