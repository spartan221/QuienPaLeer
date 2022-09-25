import mongoose from "mongoose";

// const urlDb = "mongodb+srv://admin:admin1234@cluster0.w44l4de.mongodb.net/quienPaLeer?retryWrites=true&w=majority";

const urlDb = 'mongodb://localhost:27017/BookSale';

const connection = mongoose.connect(urlDb)
    .then(() => console.log("Conexión a BD exitosa"))
    .catch((err) => console.log("Error en la conexión a BD"));


// Almacenar usuario en la BD
const saveUser = async(user) => {
    return new Promise((resolve, reject) => {
        user.save()
            .then(() => {
                // Se registra correctamente el usuario en la BD
                resolve(true);
            })
            .catch(() => {
                // Ha ocurrido un error en registrar el usuario en la BD
                reject(false);
            });
    });
};

const database = {
    saveUser
};

export default database;