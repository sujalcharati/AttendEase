import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { connectDB } from "@/lib/connectDB"
import TimetableSlot from "@/models/TimetableSlot"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const userId = (session.user as any).id

    // Get the user's timetable slots
    const timetableSlots = await TimetableSlot.find({ userId })

    return NextResponse.json(timetableSlots)
  } catch (error) {
    console.error("Error fetching timetable:", error)
    return NextResponse.json(
      { error: "Failed to fetch timetable" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { day, time, subjectId } = await request.json()
    const userId = (session.user as any).id

    await connectDB()

    // Check if the slot already exists
    const existingSlot = await TimetableSlot.findOne({ userId, day, time })

    if (existingSlot) {
      // Update existing slot
      existingSlot.subjectId = subjectId
      await existingSlot.save()
      return NextResponse.json(existingSlot)
    } else {
      // Create new slot
      const newSlot = await TimetableSlot.create({
        userId,
        day,
        time,
        subjectId
      })
      return NextResponse.json(newSlot)
    }
  } catch (error) {
    console.error("Error saving timetable:", error)
    return NextResponse.json(
      { error: "Failed to save timetable" },
      { status: 500 }
    )
  }
} 