import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import passportJwt from 'passport-jwt';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import firebaseApp from './firebase.js';
import User from '../../models/User.js';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const auth = getAuth(firebaseApp);

// Registro de usuario
export const registerUser = async (email, password) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                resolve(userCredential.user.uid);
            })
            .catch((error) => {
                const errorCode = error.code;

                // El mensaje de error por defecto es
                // el arrojado por Firebase ej:  auth/email-already-in-use
                let errorMessage = errorCode;


                // Se controla dos tipos de errores con mensajes personalizados: 
                // - Correo en uso
                // - Contraseña < 6 caracteres
                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        errorMessage = `El correo electrónico ${email} ya se encuentra en uso`;
                        break;

                    case 'auth/weak-password':
                        errorMessage = `La contraseña debe de ser al menos de 6 carácteres`;
                        break;
                }

                reject(errorMessage);

            });
    }
    );
};

// Login de usuario
export const loginUser = async (email, password) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Logueado
                resolve(userCredential.user.uid);
            })
            .catch((error) => {
                const errorCode = error.code;

                // El mensaje de error por defecto es
                // el arrojado por Firebase ej:  auth/email-already-in-use 
                let errorMessage = errorCode;

                // Se controla dos tipos de errores con mensajes personalizados: 
                // - No existe una cuenta con el correo especificado
                // - La contraseña no es correcta
                switch (errorCode) {
                    case 'auth/user-not-found':
                        errorMessage = `El correo ${email} NO se encuentra registrado`;
                        break;
                    case 'auth/wrong-password':
                        errorMessage = `La contraseña es incorrecta`;
                        break;
                }
                reject(errorMessage);
            });
    });
};

// Middleware para verificar que el usuario se encuentra logueado
// y agrega el id de este usuario al objeto req
// export const isUserAuthenticaded = (req, res, next) => {

//     const auth = getAuth(firebaseApp);
//     const user = auth.currentUser;

//     if (user) {
//         // El usuario se encuentra logueado

//         // Agrega el id del usuario autenticado al request
//         req.userId = user.uid;

//         next();
//     } else {
//         // El usuario no se encuentra logueado o cerró sesión
//         res.statusCode = 403;
//         res.json({ error: "El usuario no se encuentra logueado" });
//     }
// };

// Cerrar Sesión
export const logOut = async () => {
    return new Promise((resolve, reject) => {
        signOut(auth)
            .then(() => {
                resolve("Se ha cerrado sesión correctamente");
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// Manejo de persistencia a través de JWT tokens 
const secretKey = 'foo';


// Metodo para generar Tokens basados en los usuarios
// En la generación del token solamente quedará encriptado el id del usuario
export const getToken = (userId) => {
    return jwt.sign(
        { _id: userId },
        secretKey,
        {
            // El token tiene un tiempo de vida util de 2 dias
            expiresIn: '48h'
        }
    );
};


// Configuración para el método passport-JWT
const options = {
    secretOrKey: secretKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// Definición de passwort (middleware) usando JWT
passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
        console.log("test");
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

// Middleware que se va utilizar para realizar la autenticación con el JWT
// Establece la información del usuario en el objeto req.user
export const verifyUserByJwt = passport.authenticate('jwt', { session: null });