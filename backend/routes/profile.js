import express from 'express'
import User from '../models/User.js';
import Event from '../models/Event.js'
import Book from '../models/Book.js'
import { isUserAuthenticaded } from '../config/firebase/authentication.js';

const makeProfileRouter = (database) => {
    const profileRouter = express.Router();

    //VISUALIZAR PERFIL
    profileRouter.get('/view/:userId', async (req, res) => {
        const user = await User.findById(req.params.userId);
        const events = await Event.find({ userId: req.params.userId });
        const books = await Book.find({ userId: req.params.userId })
        if (user) {
            res.status(201).json({ user, events, books });
        } else {
            res.status(500)
        }
    })

    profileRouter.get('/myInfo', isUserAuthenticaded, async (req, res) => {
        const user = await User.findById(req.userId);
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(500)
        }
    })

    return profileRouter
}

export default makeProfileRouter;