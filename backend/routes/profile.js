import express from 'express'
import User from '../models/User.js';
import { isUserAuthenticaded } from '../config/firebase/authentication.js';

const makeProfileRouter = (database) => {
    const profileRouter = express.Router();

    //VISUALIZAR PERFIL
    profileRouter.get('/view/:userId', async (req, res) => {
        const user = await User.findById(req.params.userId);
        if (user) {
            res.status(201).json(user);
        }
    })

    profileRouter.get('/myInfo', isUserAuthenticaded, async (req, res) => {
        const user = await User.findById(req.userId);
        res.statusCode = 200;
        res.json(user);
    });

    return profileRouter
}

export default makeProfileRouter;