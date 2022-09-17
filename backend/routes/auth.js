import express from "express";
import { getToken, isUserAuthenticaded, loginUser, logOut, registerUser, verifyUserByJwt } from "../config/firebase/authentication.js";
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
                res.json({error});
            });

    } catch (error) {
        res.statusCode = 500;
        res.json({error});
    }


});

// Login
authRouter.post('/login', async(req, res) => {

    try {
        // Loguear al usuario usando el servicio de Firebase
        const userUID = await loginUser( req.body.email, req.body.password );

        const token = getToken(userUID);

        res.statusCode = 200;

        // Retorna el token JWT de autenticación
        res.json({ token });      

    } catch (error) {
        res.statusCode = 500;
        res.json({error, mssg: "test"});
    }
});

// Cerrar sesión
authRouter.get('/logout', async(req, res) => {

    try {
        const message = await logOut();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({message});
    } catch (error) {
        res.statusCode = 500;
        res.json({error});
    }

});

authRouter.get('/test', verifyUserByJwt, async(req, res) => {
    
    const user = req.user;
    res.statusCode = 200;
    res.json( user );

});

export default authRouter;