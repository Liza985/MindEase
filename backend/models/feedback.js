import mongoose, { Schema } from "mongoose";


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
    activityId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"activity"
    },
    //this can be changed if we use different types of feedbacks
    feedback:{
        type:String,
        required:true
    }
    
},{
    timestamps:true,
})

const feedback=mongoose.model("feedback",feedbackSchema);
export default feedback;