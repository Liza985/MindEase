import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    volunteerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Volunteer",
    },
    image:{
        public_id:{
            type:String,
            default: "",
        },
        url:{
            type:String,
            default: "",
        }
    },
    title:{
        type:String,
        required:true,
    },
    topic:[{
        type:String,
        required:true,
    }],
    description:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    }


},{
    timestamps:true
})

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;