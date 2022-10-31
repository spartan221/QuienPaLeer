import Swap from "../models/Swap.js"
import express from "express"
import { isUserAuthenticaded } from '../config/firebase/authentication.js'

const router = express.Router()

//CREACIÓN
router.post("/create", isUserAuthenticaded, async (req, res) => {
    const newSwap = new Swap({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        interest: req.body.interest,
        userId: req.userId,
        image: req.body.image,
    });
    try {
        const swapSaved = await newSwap.save()
        res.status(201).json(swapSaved)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Lectura
router.get("/view/all", async (req, res) => {
    const swap = await Swap.find();
    res.json(swap)
})

router.get('/search/:filter', async (req, res) => {
    try {
        const swap = await Swap.find({$text: {$search: req.params.filter}, $language: "none"});
        res.status(200).json(swap)
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router