"use client"
import React, { useState, useEffect } from 'react';

interface Subject {
  id: string;
  name: string;
  classesAttended: number;
  totalClasses: number;
}

interface TimetableEntry {
  day: string;
  time: string;
  subject: string;
}

const Homepage: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('subjects');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newSubject, setNewSubject] = useState('');
  const [timetable, setTimetable] = useState<TimetableEntry[]>(() => {
    const saved = localStorage.getItem('timetable');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
    localStorage.setItem('timetable', JSON.stringify(timetable));
  }, [subjects, timetable]);

  // Attendance Handlers
  const updateAttendance = (id: string, type: 'attended' | 'missed') => {
    setSubjects(subjects.map(subject => {
      if (subject.id === id) {
        return {
          ...subject,
          [type === 'attended' ? 'classesAttended' : 'totalClasses']: 
            Math.max(0, subject[type === 'attended' ? 'classesAttended' : 'totalClasses'] + (type === 'attended' ? 1 : -1))
        };
      }
      return subject;
    }));
  };

  // Subject Management
  const addSubject = () => {
    if (newSubject.trim()) {
      setSubjects([...subjects, {
        id: Date.now().toString(),
        name: newSubject.trim(),
        classesAttended: 0,
        totalClasses: 0
      }]);
      setNewSubject('');
    }
  };

  const deleteSubject = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  // Timetable Management
  const updateTimetable = (day: string, time: string, subject: string) => {
    setTimetable(prev => {
      const existing = prev.find(entry => entry.day === day && entry.time === time);
      if (existing) {
        return prev.map(entry => 
          entry.day === day && entry.time === time ? { ...entry, subject } : entry
        );
      }
      return [...prev, { day, time, subject }];
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-100">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Student Dashboard</h1>

      {/* Add Subject Section */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-black">Manage Subjects</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Enter new subject"
            className="flex-1 p-2 border rounded text-black"
          />
          <button 
            onClick={addSubject}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Subject
          </button>
        </div>
      </div>

      {/* Attendance Tracking */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map(subject => (
          <div key={subject.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-medium text-black">{subject.name}</h3>
              <button 
                onClick={() => deleteSubject(subject.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
            
            <div className="flex items-center gap-4 mb-3">
              <button 
                onClick={() => updateAttendance(subject.id, 'attended')}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                attended
              </button>
              <span>{subject.classesAttended}/{subject.totalClasses}</span>
                <button 
                onClick={() => updateAttendance(subject.id, 'missed')}
                className="bg-red-500 text-white px-3 py-1 rounded"
                >
                Missed
                </button>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
              className="bg-blue-500 rounded-full h-2"
              style={{ 
                width: `${(subject.classesAttended / (subject.totalClasses || 1)) * 100}%`
              }}
              />
            </div>
            <div className="text-right text-sm text-gray-600">
              {((subject.classesAttended / (subject.totalClasses || 1)) * 100).toFixed(2)}%
            </div>
          </div>
        ))}
      </div>

      {/* Timetable Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-black">Weekly Timetable</h2>
        <div className="grid grid-cols-5 gap-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
            <div key={day} className="border p-2 rounded">
              <h3 className="font-medium mb-2 text-black">{day}</h3>
              {['9:00', '11:00', '14:00', '16:00'].map(time => (
                <select
                  key={time}
                  value={timetable.find(entry => entry.day === day && entry.time === time)?.subject || ''}
                  onChange={(e) => updateTimetable(day, time, e.target.value)}
                  className="w-full mb-2 p-1 border rounded text-black"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.name}>
                      {subject.name}

                      </option>
                    ))}
                  </select>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Homepage;
