// import mongoose from "mongoose"

// const subjectSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: true
//     },
//     user: {
//          type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// })


// const AttendanceRecordSchema = new mongoose.Schema({
//     subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
//     date: { type: Date, required: true },
//     status: { type: String, enum: ['present', 'absent'], required: true },
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
//   });


// export const Subject = mongoose.model("Subject",subjectSchema);


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