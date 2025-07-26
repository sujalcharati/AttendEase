"use client"
import React from 'react'
import { Card,CardContent,CardHeader,CardTitle } from '@/components/ui/card'
import { Select ,SelectTrigger,SelectValue,SelectContent,SelectItem} from '@/components/ui/select'
import { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface Subject {
    id: string
    name: string
    classesAttended: number
    totalClasses: number
  }

const Timetable = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [subjects, ] = useState<Subject[]>([])

  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session) router.push("/signin")
  }, [session, status, router])

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session) {
    return null // Will redirect
  }

  return (
    <div className='container space-y-8 p-8' >
         
<Card>
        <CardHeader>
          <CardTitle>Weekly Timetable</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
              <div key={day} className="space-y-2">
                <h3 className="font-medium">{day}</h3>
                {["9:00", "11:00", "14:00", "16:00"].map((time) => (
                  <Select key={`${day}-${time}`}>
                    <SelectTrigger>
                      <SelectValue placeholder={time} />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject:Subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Timetable