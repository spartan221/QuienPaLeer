import Event from "../models/Event.js"
import express from "express"

const makeEventRouter = (database) => {
    const eventRouter = express.Router()

    // CREACIÓN
    // TODO
    // - Agregar Middleware de Autenticación
    // - Agregar ID y nombre del Usuario a la tabla
    eventRouter.post("/create", async (req, res) => {
        const newEvent = new Event({
            name: req.body.name,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            hour: req.body.hour,
            image: req.body.image,
            place: req.body.place
        })

        const response = await database.saveEvent(newEvent);
        // Evento sastifactoriamente almacenado en la BD
        if (response) {
            res.status(201).json('Evento almacenado en la BD satisfactoriamente.');
        }

    })


    //VISUALIZACIÓN
    eventRouter.get('/view/:id', async (req, res) => {
        try {
            const event = await Event.findById(req.params.id);
            res.status(200).json(event)
        } catch (err) {
            res.status(500).json(err)
        }
    })

    return eventRouter
}

export default makeEventRouter