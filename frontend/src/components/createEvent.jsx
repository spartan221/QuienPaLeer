import React from 'react'
import { useState } from 'react'
import { publicRequest } from '../requestMethods'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../../backend/config/firebase/firebase"
import axios from 'axios';

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

    const handleClick = (event) => {
        event.preventDefault()
        const fileName = new Date().getTime() + file.name
        const storage = getStorage(app)
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error);
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const newEvent = { ...inputs, image: downloadURL };
                    axios.post("http://localhost:5000/api/event/create", newEvent);
                });
            }
        );
    }

    return (
        <div>
            <h1>Crear Evento</h1>
            <form>
                <label htmlFor="image" n>Imagen</label><br />
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
