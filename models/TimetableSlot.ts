import mongoose from 'mongoose'

const timetableSlotSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  subjectId: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
})

// Create a compound index for userId, day, and time to ensure uniqueness
timetableSlotSchema.index({ userId: 1, day: 1, time: 1 }, { unique: true })

// Update the updatedAt field before saving
timetableSlotSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

// Create the model if it doesn't exist, otherwise use the existing one
const TimetableSlot = mongoose.models.TimetableSlot || mongoose.model('TimetableSlot', timetableSlotSchema)

export default TimetableSlot 