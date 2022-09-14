import Event from "../models/Event.js"

import express from "express"
const router = express.Router()

//CREACIÓN
router.post("/create", async (req, res) => {
    const newEvent = new Event({
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        hour: req.body.hour,
        image: req.body.image,
        place: req.body.place
    })

    try {
        const savedEvent = await newEvent.save()
        res.status(201).json(savedEvent)
    } catch (err) {
        res.status(500).json(err)
    }

})

export { router }