import mongoose from "mongoose";


const feedbackSchema=mongoose.Schema({
    feedbackId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        default: () => new mongoose.Types.ObjectId()
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    rating:{
        type:Number,
        required:true
    },
    feedback:{
        type:String,
        required:true
    }
    
},{
    timestamps:true,
})

const feedback=mongoose.model("feedback",feedbackSchema);
export default feedback;