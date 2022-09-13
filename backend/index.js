const express = require("express")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")

mongoose.connect(
    "mongodb+srv://admin:admin1234@cluster0.w44l4de.mongodb.net/quienPaLeer?retryWrites=true&w=majority"
)
    .then(() => console.log("Conexión a BD exitosa"))
    .catch((err) => console.log("Error en la conexión a BD"))

const app = express()

app.use(express.json())
app.use("/api/auth", authRoute)
app.listen(5000, () => {
    console.log("Servidor backend funcionando")
})