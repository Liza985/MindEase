import mongoose from "mongoose";

const activityLogSchema=mongoose.model({
    activityId:{
        type:String,
        ref:"activity"
    },
    reviewId:{
         type: mongoose.Schema.Types.ObjectId,
        ref: "feedback"
    }
},{
    timestamps:true,
})

const activityLog=mongoose.model("activityLog",activityLogSchema);
export default activityLog;