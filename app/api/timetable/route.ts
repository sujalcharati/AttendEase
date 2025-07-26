import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { connectDB } from "@/lib/connectDB"
import TimetableSlot from "@/models/TimetableSlot"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.userId || (session.user as { id: string }).id;
    console.log("User ID in timetable GET:", userId);
    await connectDB()

    const slots = await TimetableSlot.find({ userId })
    return NextResponse.json(slots)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching timetable:", error.message)
    } else {
      console.error("An unknown error occurred:", error)
    }
    return NextResponse.json(
      { 
        error: "Failed to fetch timetable",
        details: error instanceof Error ? error.message : "An unknown error occurred"
      },
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

    // Get userId properly from session
    const userId = session.userId || (session.user as { id: string }).id;
    console.log("User ID in timetable POST:", userId);
    if (!userId) {
      console.error("No userId found in session:", session.user)
      return NextResponse.json(
        { error: "User ID not found in session" },
        { status: 400 }
      )
    }

    const { day, time, subjectId } = await request.json()

    if (!day || !time) {
      return NextResponse.json(
        { error: "Day and time are required" },
        { status: 400 }
      )
    }

    await connectDB()

    // Log the data being saved
    console.log("Saving timetable slot:", { userId, day, time, subjectId })

    // Find existing slot
    const existingSlot = await TimetableSlot.findOne({
      userId,
      day,
      time
    })

    let slot
    if (existingSlot) {
      // Update existing slot
      existingSlot.subjectId = subjectId
      slot = await existingSlot.save()
    } else {
      // Create new slot
      slot = await TimetableSlot.create({
        userId,
        day,
        time,
        subjectId
      })
    }

    return NextResponse.json(slot)
  } catch (error: unknown) {
    if (error instanceof Error) {
      // More detailed error logging
      console.error("Error saving timetable:", {
        message: error.message,
        stack: error.stack
      })
    } else {
      console.error("An unknown error occurred:", error)
    }
    return NextResponse.json(
      { 
        error: "Failed to save timetable",
        details: error instanceof Error ? error.message : "An unknown error occurred"
      },
      { status: 500 }
    )
  }
} 