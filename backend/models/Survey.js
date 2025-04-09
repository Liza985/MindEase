import mongoose from "mongoose";

const surveySchema = mongoose.Schema({
	surveyId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
        default: () => new mongoose.Types.ObjectId(),
	},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    questions:[{
        question:{
            type:String,
            required:true,
        },
        options:[{
            type:String,
            required:true,
        }],
        type:{
            type:String,
            required:true,
        },
    }],
    result:{
        type:String,
        required:true
    }
},{
    timestamps:true,
});

const survey=mongoose.model("survey",surveySchema);
export default survey;
