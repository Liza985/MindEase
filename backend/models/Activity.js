import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Assistance Programs', 'Volunteers', 'Resources', 'Events', 'Community'], 
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    link: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ['Published', 'Draft', 'Under Review'],
        default: 'Published',
    },
    views: {
        type: Number,
        default: 0,
    },
    contentType: {
        type: String,
        enum: ['Video', 'PDF Document', 'Image', 'Article'], 
        required: true,
    },
    media: {
        public_id: {
            type: String,
            default: "",
        },
        url: {
            type: String,
            default: "",
        },
    },
}, {
    timestamps: true,
});

const Activity = mongoose.model('Activity', contentSchema);
export default Activity;