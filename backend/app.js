import cookieParser from "cookie-parser";
import express from "express";
import makeAuthRouter from "./routes/auth.js";
import bookRoute from './routes/book.js'
import cors from 'cors'



const makeApp = (database) => {

    const app = express();

    // Middlewares iniciales
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors())

    app.get('', (req, res) => {
        res.status(200).json({ message: "test" });
    });

    // Routers
    const authRouter = makeAuthRouter(database);
    app.use("/api/auth", authRouter);
    app.use("/api/book",bookRoute)

    return app;
}

export default makeApp;