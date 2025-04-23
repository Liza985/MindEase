import mongoose from "mongoose";


const RequestSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true
    },
    counselorId: {
      type: String,
      default: null
    },
    topic: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'cancelled'],
      default: 'pending'
    },
    notified: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });
  
  // Update the updatedAt field before saving
  RequestSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  
  const Request= mongoose.model('Request', RequestSchema);
  export default Request;
  