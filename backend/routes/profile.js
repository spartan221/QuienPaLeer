import express from 'express'
import User from '../models/User.js';
import Event from '../models/Event.js'
import Book from '../models/Book.js'
import { isUserAuthenticaded } from '../config/firebase/authentication.js';

const makeProfileRouter = (database) => {
    const profileRouter = express.Router();

    //VISUALIZAR PERFIL DE OTRO USUARIO
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

    //VISUALIZAR PERFIL DEL USUARIO LOGUEADO
    profileRouter.get('/myInfo', isUserAuthenticaded, async (req, res) => {
        const user = await User.findById(req.userId);
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(500)
        }
    })

    //EDITAR PERFIL
    profileRouter.put('/update', isUserAuthenticaded, async (req, res) => {
        const user = await User.findById(req.userId);
        if (user.name) user.name = req.body.name
        if (user.lastName) user.lastName = req.body.lastName
        if (user.phone) user.phone = req.body.phone
        const response = await database.saveUser(user);
        if (response) {
            res.status(201).json('Perfil actualizado en la BD satisfactoriamente.');
        } else {
            res.status(500).json('Error al actualizar el perfil')
        }

    })

    return profileRouter
}

export default makeProfileRouter;