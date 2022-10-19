import Book from "../models/Book.js"
import express from "express"
import { isUserAuthenticaded } from '../config/firebase/authentication.js'

const router = express.Router()

//CREACIÓN
router.post("/create", isUserAuthenticaded, async (req, res) => {
    const newBook = new Book({
        name: req.body.name,
        author: req.body.author,
        title: req.body.title,
        editorial: req.body.editorial,
        year: req.body.year,
        price: req.body.price,
        image: req.body.image,
        userId: req.userId
    });
    try {
        const bookSaved = await newBook.save()
        res.status(201).json(bookSaved)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Lectura
router.get("/view/all", async (req, res) => {
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
                foreignField: "_id",
                as: "userPublic"
            }
        },
        {
            $unwind: "$userPublic"
        }
    ])
    res.json(books);
})

//búsqueda
router.get('/search/:filter', async (req, res) => {
    try {
        const book = await Book.find({$text: {$search: req.params.filter}, $language: "none"});
        res.status(200).json(book)
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router