import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["direct", "group"],
    required: true
  },
  participants: [{
    type: String, // user IDs
    required: true
  }],
  lastMessage: {
    text: String,
    senderId: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  unreadCount: {
    type: Map,
    of: Number,
    default: {}
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  avatar: String
}, {
  timestamps: true
})

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema)

export default Chat 