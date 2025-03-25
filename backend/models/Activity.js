import mongoose,{ Schema } from mongoose;

const activitySchema=mongoose.Schema({
        activityId:{
            type:mongoose.Schema.type.objectId,
            required:true,
            default: () => new mongoose.schema.Types.ObjectId()
        },
        books:{
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
            default:"admin"
        },
        link:{
            type:String,
            default:null
        },
        status: {
            type: String,
            enum: ['Published','Draft','Under Review'],
            default: 'Published',
        },
        views: {
            type: Number,
            default: 0,
        },
},{
    timestamps: true,
})

const activity=mongoose.model("activity",activitySchema);
export default activity;