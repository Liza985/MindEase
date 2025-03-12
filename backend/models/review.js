import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    volunteerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
    }
},{
    timestamps:true,
})

const Review = mongoose.model("Review",reviewSchema);
export default Review;