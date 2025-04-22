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

export function Homepage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [newSubject, setNewSubject] = useState("")
  const { data: session } = useSession();
  // console.log(session);
 
  if(session && session.user){
    // console.log('user id:', (session.user as any).id);
  }
  const addSubject = async () => {
    if (newSubject.trim()) {
      const newSubjectData = {
        // id: Date.now().toString(),
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
      }
       catch (error) {
        console.error("Error adding subject:", error)
        alert("Error connecting to the server. Please try again.");
      }
    }
  }




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
    <div  className="grid grid-cols-[100px_repeat(5,1fr)] gap-2">
      {/* Header Row */}
      <div className="font-bold text-center">Time</div>
      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
        <div key={day} className="font-bold text-center">{day}</div>
      ))}

      {/* Time Slot Rows */}
      {["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((time) => (
        <React.Fragment key={time}>
          {/* Time Cell */}
          <div className="font-medium flex items-center justify-center">{time}</div>

          {/* Day Cells with Cards */}
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
            <Card key={`${day}-${time}`} className="shadow-md border border-gray-300">
              <CardContent className="p-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.isArray(subjects) && subjects.map((subject: any) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          ))}
        </React.Fragment>
      ))}
    </div>
  </CardContent>
</Card>


    </div>
  )
}

