import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";

// const urlDb = "mongodb+srv://admin:admin1234@cluster0.w44l4de.mongodb.net/quienPaLeer?retryWrites=true&w=majority";

const urlDb = 'mongodb://127.0.0.1:27017/quienPaLeer';

mongoose.connect( urlDb )
    .then(() => console.log("Conexión a BD exitosa"))
    .catch((err) => console.log("Error en la conexión a BD"));


const app = express();

// Middlewares iniciales
app.use(express.json());

// Routers
app.use("/api/auth", authRouter);


app.listen(5000, () => {
    console.log("Servidor backend funcionando");
    console.log(`http://127.0.0.1:5000`);
});