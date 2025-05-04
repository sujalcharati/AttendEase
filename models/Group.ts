import mongoose from "mongoose"

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  creator: {
    type: String, // user ID
    required: true
  },
  members: [{
    type: String, // user IDs
    required: true
  }],
  admins: [{
    type: String, // user IDs
    required: true
  }],
  isPrivate: {
    type: Boolean,
    default: false
  },
  inviteCode: {
    type: String,
    unique: true,
    sparse: true
  },
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Create indexes for faster queries
groupSchema.index({ members: 1, updatedAt: -1 })
groupSchema.index({ inviteCode: 1 }, { unique: true, sparse: true })

const Group = mongoose.models.Group || mongoose.model("Group", groupSchema)

export default Group 