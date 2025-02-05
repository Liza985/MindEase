import mongoose,{ Schema } from mongoose;

const activitySchema=mongoose.Schema({
        activityId:{
            type:mongoose.Schema.type.objectId,
            required:true,
            default: () => new mongoose.schema.Types.ObjectId()
        },
        name:{
            type:String,
            required:true,
        },
        typeOfActivity:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        instructions:{
            type:String,
            required:true,
        },
        resources:[{
            typeOfResources:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }]
})

const activity=mongoose.model("activity",activitySchema);
export default activity;