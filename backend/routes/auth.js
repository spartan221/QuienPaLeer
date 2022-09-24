<<<<<<< HEAD
import User from "../models/User.js"
=======
import express from "express";
import { getToken, loginUser, registerUser, isUserAuthenticaded } from "../config/firebase/authentication.js";
import User from '../models/User.js'
>>>>>>> aa52f8ee8127baf482d5a139d4e56fe7f9875a65

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
            ) {
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

    // Login
    authRouter.post('/login', async (req, res) => {

        try {
            // Loguear al usuario usando el servicio de Firebase
            const userUID = await loginUser(req.body.email, req.body.password);

            const token = getToken(userUID);

            // Se envia al cliente una cookie con la clave "acces_token"
            // y como valor el token generado
            res.cookie("access_token", token, {
                httpOnly: true
            });

            res.statusCode = 200;

            // Mensaje de login sastifactorio
            res.json({ message: "El login se ha compleado sastifactoriamente" , token});

        } catch (error) {
            res.statusCode = 500;
            res.json({ message: error });
        }
    });

    // Cerrar sesión
    authRouter.get('/logout', isUserAuthenticaded, async (req, res) => {

        res.clearCookie("access_token");

        res.statusCode = 200;

        res.json({ message: "Se ha cerrado sesión correctamente" });

    });

    authRouter.get('/myInfo', isUserAuthenticaded, async (req, res) => {

        const user = await User.findById(req.userId);
        res.statusCode = 200;
        res.json(user);
    });

    return authRouter;

};


export default makeAuthRouter;