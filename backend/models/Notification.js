import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['request_update', 'chat_created', 'new_message', 'system'],
      required: true
    },
    message: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      default: false
    },
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Notification = mongoose.model('Notification', NotificationSchema);
    export default Notification;