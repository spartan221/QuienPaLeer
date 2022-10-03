import cookieParser from "cookie-parser";
import express from "express";
import makeAuthRouter from "./routes/auth.js";
import cors from "cors"
import makeEventRouter from "./routes/event.js";
import bookRoute from './routes/book.js'
import swapRoute from './routes/swap.js'

const makeApp = (database) => {

    const app = express();

    // Middlewares iniciales
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({origin: true, credentials: true }));

    app.get('', (req, res) => {
        res.status(200).json({ message: "test" });
    });

    // Routers
    const authRouter = makeAuthRouter(database);
    app.use("/api/auth", authRouter);
    const eventRouter = makeEventRouter(database);
    app.use("/api/event", eventRouter);
    app.use("/api/book",bookRoute);
    app.use('/api/swap',swapRoute);

    return app;
}

export default makeApp;
