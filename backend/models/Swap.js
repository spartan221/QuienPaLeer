import mongoose from "mongoose";

const SwapSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    interest: { type: String, required: true },
    userId: { type: String },
    image: { type: String, required: true }
}, {
    timestamps: true
});
const Swap = mongoose.model("Swap", SwapSchema)

export default Swap;