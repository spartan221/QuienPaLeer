import express from "express"
import mongoose from "mongoose"
import { router as authRoute } from "./routes/auth.js"
import { router as eventRoute } from "./routes/event.js"
import cors from "cors"

mongoose.connect(
    "mongodb+srv://admin:admin1234@cluster0.w44l4de.mongodb.net/quienPaLeer?retryWrites=true&w=majority"
)
    .then(() => console.log("Conexión a BD exitosa"))
    .catch((err) => console.log(err))

const app = express()

// Middlewares iniciales
app.use(express.json());
app.use(cors())

// Routers
app.use("/api/auth", authRoute);
app.use("/api/event", eventRoute)

app.listen(5000, () => {
    console.log("Servidor backend funcionando")
})