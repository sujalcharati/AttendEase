import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { connectDB } from "@/lib/connectDB"
import Chat from "@/models/Chat"
// import Message from "@/models/Message"

// GET /api/chats - Get all chats for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as { id: string }).id
    await connectDB()

    // Find all chats where the user is a participant
    const chats = await Chat.find({
      participants: userId
    }).sort({ updatedAt: -1 })

    return NextResponse.json(chats)
  } catch (error) {
    console.error("Error fetching chats:", error)
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 }
    )
  }
}

// POST /api/chats - Create a new chat
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as { id: string }).id
    const { name, type, participants } = await request.json()

    if (!name || !type || !participants) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    await connectDB()

    // Create new chat
    const chat = await Chat.create({
      name,
      type,
      participants: [...participants, userId], // Include the creator
      unreadCount: new Map([[userId, 0]])
    })

    return NextResponse.json(chat)
  } catch (error) {
    console.error("Error creating chat:", error)
    return NextResponse.json(
      { error: "Failed to create chat" },
      { status: 500 }
    )
  }
} 