import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebaseApp from './firebase.js';

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
                        errorMessage = `El correo electrónico ${ email } ya se encuentra en uso`;                        
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
                        errorMessage = `El correo ${ email } NO se encuentra registrado`;
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
export const isUserAuthenticaded = ( req ,res, next ) => {
    
    const auth = getAuth( firebaseApp );
    const user = auth.currentUser;

    if (user) {
        // El usuario se encuentra logueado
        
        // Agrega el id del usuario autenticado al request
        req.userId = user.uid;

        next();
    }else{
        // El usuario no se encuentra logueado o cerró sesión
        res.statusCode = 403;
        res.json( { error : "El usuario no se encuentra logueado" } );
    }
};

// Cerrar Sesión
export const logOut = async() => {
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