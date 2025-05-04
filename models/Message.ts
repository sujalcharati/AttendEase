import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true
  },
  senderId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  readBy: [{
    type: String, // user IDs
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Create indexes for faster queries
messageSchema.index({ chatId: 1, createdAt: -1 })
messageSchema.index({ senderId: 1, createdAt: -1 })

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema)

export default Message 