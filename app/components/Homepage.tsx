// "use client"

// import React, { useEffect, useState } from "react"
// import { Plus, Trash2 } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useSession } from "next-auth/react"

// interface Subject {
//   id: string
//   name: string
//   classesAttended: number
//   totalClasses: number
// }

// interface TimetableSlot {
//   day: string
//   time: string
//   subjectId: string | null
// }

// export function Homepage() {
//   const [subjects, setSubjects] = useState<Subject[]>([])
//   const [newSubject, setNewSubject] = useState("")
//   const [timetable, setTimetable] = useState<TimetableSlot[]>([])
//   const { data: session } = useSession();
//   // console.log(session);
 
//   if(session && session.user){
//     // console.log('user id:', (session.user as any).id);
//   }
//   const addSubject = async () => {
//     if (newSubject.trim()) {
//       const newSubjectData = {
//         // id: Date.now().toString(),
//         name: newSubject.trim(),
//         classesAttended: 0,
//         totalClasses: 0,
//       }

//       try {
//         const response = await fetch("/api/subjects", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newSubjectData),
//         })

//         if (response.ok) {
//           const data = await response.json();
//           console.log(data)
//           setSubjects(prevSubjects => Array.isArray(prevSubjects) ? [...prevSubjects, data] : [data])
//           setNewSubject("")
//         } else {
//           const errorData = await response.json();
//         console.error("Failed to add subject:", errorData);
//         alert(`Failed to add subject: ${errorData.error || 'Unknown error'}`);
//         }
//       }
//        catch (error) {
//         console.error("Error adding subject:", error)
//         alert("Error connecting to the server. Please try again.");
//       }
//     }
//   }

//   // Initialize timetable slots
//   useEffect(() => {
//     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
//     const times = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
    
//     const slots: TimetableSlot[] = []
//     days.forEach(day => {
//       times.forEach(time => {
//         slots.push({
//           day,
//           time,
//           subjectId: null
//         })
//       })
//     })
//     setTimetable(slots)
//   }, [])

//   const handleTimetableChange = async (day: string, time: string, subjectId: string) => {
//     const newSubjectId = subjectId === "none" ? null : subjectId;
    
//     // Create a new timetable array with the updated slot
//     const updatedTimetable = timetable.map(slot => {
//       if (slot.day === day && slot.time === time) {
//         return { ...slot, subjectId: newSubjectId };
//       }
//       return slot;
//     });

//     // Update the state
//     setTimetable(updatedTimetable);

//     // Save to backend
//     try {
//       const response = await fetch('/api/timetable', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           day,
//           time,
//           subjectId: newSubjectId
//         })
//       });

//       if (!response.ok) {
//         console.error('Failed to save timetable change');
//       }
//     } catch (error) {
//       console.error('Error saving timetable:', error);
//     }
//   }

//   // Load timetable data when component mounts
//   useEffect(() => {
//     const loadTimetable = async () => {
//       try {
//         const response = await fetch('/api/timetable');
//         if (response.ok) {
//           const data = await response.json();
//           setTimetable(data);
//         }
//       } catch (error) {
//         console.error('Error loading timetable:', error);
//       }
//     };

//     loadTimetable();
//   }, []);

//   // Add useEffect to debug timetable changes
//   useEffect(() => {
//     console.log('Timetable state changed:', timetable);
//   }, [timetable]);

//   // Add useEffect to debug subjects changes
//   useEffect(() => {
//     console.log('Subjects state changed:', subjects);
//   }, [subjects]);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       if (!session?.user) return; // Only fetch if user is logged in
      
//       try {
//         const response = await fetch('/api/subjects', {
//           method: 'GET',
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           console.log('Fetched subjects:', data);
//           setSubjects(data);
//         } else {
//           console.error("Failed to fetch subjects");
//         }
//       } catch (error) {
//         console.error("Error fetching subjects:", error);
//       }
//     };
    
//     fetchSubjects();
//   }, [session]);


//   const updateAttendance = (id: string, type: "attended" | "missed") => {
//     setSubjects(
//       subjects.map((subject) => {
//         if (subject.id === id) {
//           return {
//             ...subject,
//             classesAttended: type === "attended" ? subject.classesAttended + 1 : subject.classesAttended,
//             totalClasses: subject.totalClasses + 1,
//           }
//         }
//         return subject
//       }),
//     )
//   }

//   const deleteSubject = (id: string) => {
//     setSubjects(subjects.filter((subject) => subject.id !== id))
//   }

//   return (
//     <div className="container space-y-8 p-8">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-blue-600">Student Dashboard</h1>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Add New Subject</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="flex gap-4">
//             <Input
//               placeholder="Enter subject name"
//               value={newSubject}
//               onChange={(e) => setNewSubject(e.target.value)}
//               className="max-w-sm"
//             />
//             <Button onClick={addSubject}>
//               <Plus className="mr-2 h-4 w-4" />
//               Add Subject
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {Array.isArray(subjects) && subjects.map((subject) => (
//           <Card key={subject.id}>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-base font-medium">{subject.name}</CardTitle>
//               <Button variant="ghost" size="icon" onClick={() => deleteSubject(subject.id)}>
//                 <Trash2 className="h-4 w-4 text-muted-foreground" />
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-4">
//                   <Button size="sm" onClick={() => updateAttendance(subject.id, "attended")}>
//                     Present
//                   </Button>
//                   <span className="text-sm text-muted-foreground">
//                     {subject.classesAttended}/{subject.totalClasses} 
//                   </span>
//                   <Button size="sm" variant="outline" onClick={() => updateAttendance(subject.id, "missed")}>
//                     Absent
//                   </Button>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="h-2 w-full rounded-full bg-muted">
//                     <div
//                       className="h-2 rounded-full bg-blue-500"
//                       style={{
//                         width: `${(subject.classesAttended / (subject.totalClasses || 1)) * 100}%`,
//                       }}
//                     />
//                   </div>
//                   <p className="text-right text-sm text-muted-foreground">
//                     {((subject.classesAttended / (subject.totalClasses || 1)) * 100).toFixed(1)}% attendance
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
      
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-center text-xl">Weekly Timetable</CardTitle>
//         </CardHeader>
//         <CardContent className="overflow-x-auto">
//           <div className="grid grid-cols-[100px_repeat(5,1fr)] gap-2">
//             {/* Header Row */}
//             <div className="font-bold text-center p-2 bg-gray-100 rounded">Time</div>
//             {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
//               <div key={day} className="font-bold text-center p-2 bg-gray-100 rounded">{day}</div>
//             ))}

//             {/* Time Slot Rows */}
//             {["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((time) => (
//               <React.Fragment key={time}>
//                 {/* Time Cell */}
//                 <div className="font-medium flex items-center justify-center p-2 bg-gray-50 rounded">{time}</div>

//                 {/* Day Cells with Cards */}
//                 {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => {
//                   const slot = timetable.find(s => s.day === day && s.time === time);
//                   const selectedSubject = subjects.find(s => s.id === slot?.subjectId);
                  
//                   return (
//                     <Card key={`${day}-${time}`} className="shadow-sm border border-gray-200">
//                       <CardContent className="p-2">
//                         <Select
//                           value={slot?.subjectId || "none"}
//                           onValueChange={(value) => handleTimetableChange(day, time, value)}
//                         >
//                           <SelectTrigger className="w-full h-8">
//                             <SelectValue>
//                               {selectedSubject ? selectedSubject.name : "Select Subject"}
//                             </SelectValue>
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="none">None</SelectItem>
//                             {subjects.map((subject) => (
//                               <SelectItem key={subject.id} value={subject.id}>
//                                 {subject.name}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </CardContent>
//                     </Card>
//                   );
//                 })}
//               </React.Fragment>
//             ))}
//           </div>
//         </CardContent>
//       </Card>


//     </div>
//   )
// }





"use client"

import React, { useEffect, useState } from "react"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSession } from "next-auth/react"

interface Subject {
  id: string
  name: string
  classesAttended: number
  totalClasses: number
}

interface TimetableSlot {
  day: string
  time: string
  subjectId: string | null
}

export function Homepage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [newSubject, setNewSubject] = useState("")
  const [timetable, setTimetable] = useState<TimetableSlot[]>([])
  const { data: session } = useSession();
 
  if(session && session.user){
    // console.log('user id:', (session.user as any).id);
  }
  
  const addSubject = async () => {
    if (newSubject.trim()) {
      const newSubjectData = {
        name: newSubject.trim(),
        classesAttended: 0,
        totalClasses: 0,
      }

      try {
        const response = await fetch("/api/subjects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSubjectData),
        })

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setSubjects(prevSubjects => Array.isArray(prevSubjects) ? [...prevSubjects, data] : [data])
          setNewSubject("")
        } else {
          const errorData = await response.json();
          console.error("Failed to add subject:", errorData);
          alert(`Failed to add subject: ${errorData.error || 'Unknown error'}`);
        }
      } catch (error) {
        console.error("Error adding subject:", error)
        alert("Error connecting to the server. Please try again.");
      }
    }
  }

  // Initialize timetable slots
  useEffect(() => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    const times = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
    
    const slots: TimetableSlot[] = []
    days.forEach(day => {
      times.forEach(time => {
        slots.push({
          day,
          time,
          subjectId: null
        })
      })
    })
    setTimetable(slots)
  }, [])

  const handleTimetableChange = async (day: string, time: string, subjectId: string) => {
    console.log(`Changing timetable for ${day} at ${time} to subject ID: ${subjectId}`);
    
    const newSubjectId = subjectId === "none" ? null : subjectId;
    
    // Find the selected subject for logging
    const selectedSubject = subjects.find(s => s.id === newSubjectId);
    console.log(`Selected subject: ${selectedSubject?.name || 'None'}`);
    
    // Create a new timetable array with the updated slot
    const updatedTimetable = timetable.map(slot => {
      if (slot.day === day && slot.time === time) {
        return { ...slot, subjectId: newSubjectId };
      }
      return slot;
    });

    // Update the state
    setTimetable(updatedTimetable);
    console.log("Updated timetable:", updatedTimetable);

    // Save to backend
    try {
      const response = await fetch('/api/timetable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day,
          time,
          subjectId: newSubjectId
        })
      });

      if (!response.ok) {
        console.error('Failed to save timetable change');
      } else {
        console.log('Successfully saved timetable change to backend');
        
        // Reload timetable data after saving
        const refreshResponse = await fetch('/api/timetable');
        if (refreshResponse.ok) {
          const refreshedData = await refreshResponse.json();
          console.log('Refreshed timetable data:', refreshedData);
          setTimetable(refreshedData);
        }
      }
    } catch (error) {
      console.error('Error saving timetable:', error);
    }
  }

  // Load timetable data when component mounts or subjects change
  useEffect(() => {
    const loadTimetable = async () => {
      try {
        const response = await fetch('/api/timetable');
        if (response.ok) {
          const data = await response.json();
          console.log('Loaded timetable data:', data);
          setTimetable(data);
        }
      } catch (error) {
        console.error('Error loading timetable:', error);
      }
    };

    loadTimetable();
  }, []);

  // Load subjects when user is logged in
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!session?.user) return; // Only fetch if user is logged in
      
      try {
        const response = await fetch('/api/subjects', {
          method: 'GET',
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched subjects:', data);
          setSubjects(data);
        } else {
          console.error("Failed to fetch subjects");
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    
    fetchSubjects();
  }, [session]);

  const updateAttendance = (id: string, type: "attended" | "missed") => {
    setSubjects(
      subjects.map((subject) => {
        if (subject.id === id) {
          return {
            ...subject,
            classesAttended: type === "attended" ? subject.classesAttended + 1 : subject.classesAttended,
            totalClasses: subject.totalClasses + 1,
          }
        }
        return subject
      }),
    )
  }

  const deleteSubject = (id: string) => {
    setSubjects(subjects.filter((subject) => subject.id !== id))
  }

  return (
    <div className="container space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-600">Student Dashboard</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Subject</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Enter subject name"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="max-w-sm"
            />
            <Button onClick={addSubject}>
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(subjects) && subjects.map((subject) => (
          <Card key={subject.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">{subject.name}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => deleteSubject(subject.id)}>
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button size="sm" onClick={() => updateAttendance(subject.id, "attended")}>
                    Present
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {subject.classesAttended}/{subject.totalClasses} 
                  </span>
                  <Button size="sm" variant="outline" onClick={() => updateAttendance(subject.id, "missed")}>
                    Absent
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{
                        width: `${(subject.classesAttended / (subject.totalClasses || 1)) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-right text-sm text-muted-foreground">
                    {((subject.classesAttended / (subject.totalClasses || 1)) * 100).toFixed(1)}% attendance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">Weekly Timetable</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="grid grid-cols-[100px_repeat(5,1fr)] gap-2">
            {/* Header Row */}
            <div className="font-bold text-center p-2 bg-gray-100 rounded">Time</div>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
              <div key={day} className="font-bold text-center p-2 bg-gray-100 rounded">{day}</div>
            ))}

            {/* Time Slot Rows */}
            {["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((time) => (
              <React.Fragment key={time}>
                {/* Time Cell */}
                <div className="font-medium flex items-center justify-center p-2 bg-gray-50 rounded">{time}</div>

                {/* Day Cells with Cards */}
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => {
                  // Find the current slot in the timetable
                  const slot = timetable.find(s => s.day === day && s.time === time);
                  
                  // Log the slot for debugging
                  console.log(`Slot for ${day} at ${time}:`, slot);
                  
                  // Find the selected subject based on the slot's subjectId
                  const selectedSubject = subjects.find(s => s.id === slot?.subjectId);
                  console.log(`Selected subject:`, selectedSubject);
                  
                  // Determine the value for the Select component
                  const selectValue = slot?.subjectId || "none";
                  
                  return (
                    <Card key={`${day}-${time}`} className="shadow-sm border border-gray-200">
                      <CardContent className="p-2">
                        <Select
                          value={selectValue}
                          onValueChange={(value) => handleTimetableChange(day, time, value)}
                        >
                          <SelectTrigger className="w-full h-8">
                            <SelectValue placeholder="Select Subject">
                              {selectedSubject ? selectedSubject.name : "None"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {subjects.map((subject) => (
                              <SelectItem key={subject.id} value={subject.id}>
                                {subject.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </CardContent>
                    </Card>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
