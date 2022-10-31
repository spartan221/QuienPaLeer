import Event from "../models/Event.js"
import express from "express"
import { isUserAuthenticaded } from "../config/firebase/authentication.js"

const makeEventRouter = (database) => {
    const eventRouter = express.Router()

    // CREACIÓN
    //eventRouter.post("/create", isUserAuthenticaded,async (req, res) => {
    eventRouter.post("/create", isUserAuthenticaded, async (req, res) => {
        const newEvent = new Event({
            name: req.body.name,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            hour: req.body.hour,
            image: req.body.image,
            place: req.body.place,
            userId: req.userId
        })

        const response = await database.saveEvent(newEvent);
        // Evento sastifactoriamente almacenado en la BD
        if (response) {
            res.status(201).json('Evento almacenado en la BD satisfactoriamente.');
        }

    })

    //PAGINACIÓN
    eventRouter.get('/view/all', async (req, res) => {
        try {
            const events = await Event.find();
            res.status(200).json(events)
        } catch (err) {
            res.status(500).json(err)
        }
    })

    //VISUALIZACIÓN UN EVENTO
    eventRouter.get('/view/:id', async (req, res) => {
        try {
            const event = await Event.findById(req.params.id);
            res.status(200).json(event)
        } catch (err) {
            res.status(500).json(err)
        }
    })

    //BÚSQUEDA
    eventRouter.get('/search/:filter', async (req, res) => {
        try {
            const event = await Event.find({$text: {$search: req.params.filter}, $language: "none"});
            res.status(200).json(event)
        } catch (err) {
            res.status(500).json(err)
        }
    })

    return eventRouter
}

export default makeEventRouter