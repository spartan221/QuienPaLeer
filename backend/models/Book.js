import mongoose from "mongoose";

const BookSchema= new mongoose.Schema({
    name: { type: String, required: true,trim:true },
    title:{type:String,required:true,trim:true},
    author: { type: String, required: true},
    editorial: { type: String, required: true},
    year: { type: String, required: true},
    price :{ type:Number, required: true},
    cathegory : {type:String},  
    //user:{ type: mongoose.Schema.ObjectId,ref:"UserPrueba"},
    user:{ type:String},
    image:{type:String}
},{
    timestamps:true
});
const Book = mongoose.model("Book", BookSchema)

export default Book;