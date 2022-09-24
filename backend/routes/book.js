import Book from "../models/Book.js"
import express from "express"
import {isUserAuthenticaded} from '../config/firebase/authentication.js'
import mongoose from 'mongoose'
const router = express.Router()

//CREACIÓN

router.post("/create", isUserAuthenticaded, async (req, res) => {
    const newBook = new Book({
        name: req.body.name,
        author: req.body.author,
        isbn:req.body.isbn,
        editorial: req.body.editorial,
        year: req.body.year,
        price: req.body.price,
        user:req.userId  
    });
    try {
        const bookSaved = await newBook.save()
        res.status(201).json(bookSaved)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Lectura
router.get("/", async (req, res) => {
    const books = await Book.find();
    res.json(books)
})

//Lectura con usuarios
router.get("/getWithUsers", async (req, res) => {
    const books = await Book.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField :"_id",
                as:"userPublic"
            }
        },
        {
            $unwind:"$userPublic"
        }
    ])
    res.json(books);
})

export default router