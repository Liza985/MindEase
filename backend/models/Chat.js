import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true
  },
  senderType: {
    type: String,
    enum: ['user', 'volunteer'],
    required: true
  },
  recipientId: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
});

const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    default: 'Anonymous User'
  },
  volunteerId: {
    type: String,
    default: null
  },
  volunteerName: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'ended'],
    default: 'pending'
  },
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  assignedAt: {
    type: Date,
    default: null
  },
  endedAt: {
    type: Date,
    default: null
  },
  unreadUser: {
    type: Number,
    default: 0
  },
  unreadVolunteer: {
    type: Number,
    default: 0
  }
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;