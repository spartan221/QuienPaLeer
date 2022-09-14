import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebaseApp from './firebase.js';

const auth = getAuth(firebaseApp);

// Registro de usuario
export const registerUser = async (email, password) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Registrado
                // TODO: Crear model para usuarios
                // el uid creado por el firebase auth va a ser la llave de cada usuario
                // Nombre, apellido, correo, telefono

                resolve(userCredential.user);
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
                resolve(userCredential.user);
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