import express from "express"
import { isUserAuthenticaded } from "../config/firebase/authentication.js"
import Donation from '../models/Donation.js';

const router = express.Router()

router.post("/create", isUserAuthenticaded, async (req, res) => {
    const newDonation = new Donation({
        name: req.body.name,
        title:req.body.title,
        author: req.body.author,
        editorial: req.body.editorial,
        year: req.body.year,
        userId: req.userId,
        image : req.body.image
    });
    try {
        const donationSaved = await newDonation.save()
        res.status(201).json(donationSaved)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get("/", async (req, res) => {
    const donations = await Donation.find();
    res.json(donations)
})



export default router
