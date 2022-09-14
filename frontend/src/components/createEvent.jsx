import React from 'react'
import { publicRequest } from '../requestMethods'

const createEvent = () => {
    return (
        <div>
            <h1>Crear Evento</h1>
            <form>
                <input type="file" name="imagen" accept="image/png, image/jpeg"></input>
                <input></input>
                <input></input>
                <input></input>
                <input></input>
                <input></input>
                <input></input>
            </form>
        </div>
    )
}

export default createEvent
