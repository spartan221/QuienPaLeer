import express from "express";
import makeAuthRouter from "./routes/auth.js" ;


const makeApp = (database) => {

    const app = express();
    
    // Middlewares iniciales
    app.use(express.json());

    app.get('', (req, res) => {
        res.status(200).json({message: "test"}); 
    });

    // Routers
    const authRouter = makeAuthRouter(database);
    app.use("/api/auth", authRouter);

    return app;
}

export default makeApp;