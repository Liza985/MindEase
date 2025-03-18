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
        category: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Published','Draft','Under Review'],
            default: 'Draft',
        },
        views: {
            type: Number,
            default: 0,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
},{
    timestamps: true,
})

const activity=mongoose.model("activity",activitySchema);
export default activity;