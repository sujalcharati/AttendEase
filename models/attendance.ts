import mongoose from 'mongoose';
const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  classesAttended: {
    type: Number,
    default: 0
  },
  totalClasses: {
    type: Number,
    default: 0
  },
  userId: {
    type: String,
    required: true,
    index: true
  }
}, { timestamps: true });

export default mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);