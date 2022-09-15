import express from "express";
import { registerUser } from "../config/firebase/authentication.js";
import User from '../models/User.js'

const authRouter = express.Router();

// Registro
authRouter.post("/register", async(req, res) => {

    try {
        // Registrar el usuario con el servicio de Firebase
        const userUID = await registerUser( req.body.email, req.body.password );     
                
        const newUser = new User({
            _id: userUID,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone
        });
        
        // Almacenar el nuevo usuario registrado en la BD
        newUser.save()
            .then((user) => {
                // Se registra correctamente el usuario en la BD
                res.statusCode = 201;
                res.json(user);
            })
            .catch((error) => {
                // Ha ocurrido un error en registrar el usuario en la BD
                res.statusCode = 500;
                res.json(error);
            });

    } catch (error) {
        res.statusCode = 500;
        res.json({error});
    }


});



export default authRouter;