import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    hour: { type: String, required: true },
    image: { type: String },
    place: { type: String, required: true }
})

export default mongoose.model("Event", EventSchema)