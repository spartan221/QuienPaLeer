import express from "express";
import { registerUser } from "../config/firebase/authentication.js";
import User from '../models/User.js'

const makeAuthRouter = (database) => {

    const authRouter = express.Router();

    // Registro
    authRouter.post("/register", async (req, res) => {


        try {
            // Comprobar que tengan todos los campos requeridos
            if
                (
                !(
                    req.body.email &&
                    req.body.password &&
                    req.body.name &&
                    req.body.lastName &&
                    req.body.email &&
                    req.body.phone 
                )
            ) 
            {
                throw 'Falta un dato del usuario para poder realizar el registro';
            }


            // Registrar el usuario con el servicio de Firebase
            const userUID = await registerUser(req.body.email, req.body.password);

            const newUser = new User({
                _id: userUID,
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone
            });

            // Almacenar el nuevo usuario registrado en la BD
            const response = await database.saveUser(newUser);

            // Usuario sastifactoriamente almacenado en la BD
            if (response) {
                res.status(201).json({ message: `El usuario ${newUser.name} se ha creado sastifactoriamente` });
            }


        } catch (error) {
            res.status(500).json({ message: error });
        }


    });

    return authRouter;
}

export default makeAuthRouter;