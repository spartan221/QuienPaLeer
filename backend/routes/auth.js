import * as User from "../models/User.js"

import express from "express"
const router = express.Router()

//REGISTRO
router.post("/register", async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }

})

export { router }