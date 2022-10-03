import mongoose from "mongoose";

const SwapSchema= new mongoose.Schema({
    title:{type:String,required:true,trim:true},
    author: { type: String, required: true},
    description:{type: String,required:true},
    interest:{type:String,required:true},
    user:{ type:String},
    image:{type:String}
},{
    timestamps:true
});
const Swap = mongoose.model("Swap", SwapSchema)

export default Swap;