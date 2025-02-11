"use client"
import { useState } from 'react';
import { Calendar } from 'lucide-react';

// Mock student data
const students = [
  { id: 1, name: 'Alice Johnson', class: 'Grade 10A' },
  { id: 2, name: 'Bob Smith', class: 'Grade 10A' },
  { id: 3, name: 'Charlie Brown', class: 'Grade 10A' },
  // Add more students...
];

export default function Homepage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState<Record<number, string>>({});

  const handleAttendanceChange = (studentId: number, status: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 border-green-500';
      case 'absent': return 'bg-red-100 border-red-500';
      case 'late': return 'bg-yellow-100 border-yellow-500';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">
            Student Attendance Tracker
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white px-4 py-2 rounded-lg border">
              <Calendar className="w-5 h-5 mr-2 text-gray-500" />
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="outline-none"
              />
            </div>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-gray-500 text-sm mb-2">Total Students</h3>
            <p className="text-3xl font-bold text-gray-800">{students.length}</p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-green-600 text-sm mb-2">Present Today</h3>
            <p className="text-3xl font-bold text-green-700">
              {Object.values(attendance).filter(s => s === 'present').length}
            </p>
          </div>
          <div className="bg-red-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-red-600 text-sm mb-2">Absent Today</h3>
            <p className="text-3xl font-bold text-red-700">
              {Object.values(attendance).filter(s => s === 'absent').length}
            </p>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-500">
            <div className="col-span-2">Student ID</div>
            <div className="col-span-4">Student Name</div>
            <div className="col-span-3">Class</div>
            <div className="col-span-3">Attendance Status</div>
          </div>

          {students.map(student => (
            <div 
              key={student.id}
              className="grid grid-cols-12 items-center px-6 py-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <div className="col-span-2 font-medium">#{student.id.toString().padStart(3, '0')}</div>
              <div className="col-span-4">{student.name}</div>
              <div className="col-span-3">{student.class}</div>
              <div className="col-span-3">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(attendance[student.id])}`}>
                  <select
                    value={attendance[student.id] || ''}
                    onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                    className="bg-transparent outline-none text-sm"
                  >
                    <option value="">Select Status</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Save Draft
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Submit Attendance
          </button>
        </div>
      </div>
    </div>
  );
}


