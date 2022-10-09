import mongoose from "mongoose";

// TODO
// Agregar el id del usuario
const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    hour: { type: String, required: true },
    image: { type: String, required: true },
    place: { type: String, required: true },
    userId: { type: String, required: true }
},{
    timestamps:true
})

export default mongoose.model("Event", EventSchema)