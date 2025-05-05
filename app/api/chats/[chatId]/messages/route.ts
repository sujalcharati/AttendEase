import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { connectDB } from "@/lib/connectDB"
import Message from "@/models/Message"
import Chat from "@/models/Chat"

// GET /api/chats/[chatId]/messages - Get messages for a chat
export async function GET(
  // request: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as {id: string}).id
    const { chatId } = params

    await connectDB()

    // Verify user is a participant in the chat
    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId
    })

    if (!chat) {
      return NextResponse.json(
        { error: "Chat not found or unauthorized" },
        { status: 404 }
      )
    }

    // Get messages for the chat
    const messages = await Message.find({ chatId })
      .sort({ createdAt: -1 })
      .limit(50)

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    )
  }
}

// POST /api/chats/[chatId]/messages - Send a new message
export async function POST(
  request: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as { id: string }).id
    const { chatId } = params
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json(
        { error: "Message text is required" },
        { status: 400 }
      )
    }

    await connectDB()

    // Verify user is a participant in the chat
    const chat = await Chat.findOne({
      _id: chatId,
      participants: userId
    })

    if (!chat) {
      return NextResponse.json(
        { error: "Chat not found or unauthorized" },
        { status: 404 }
      )
    }

    // Create new message
    const message = await Message.create({
      chatId,
      senderId: userId,
      text,
      readBy: [userId]
    })

    // Update chat's last message and unread counts
    chat.lastMessage = {
      text,
      senderId: userId,
      timestamp: new Date()
    }

    // Increment unread count for all participants except sender
    chat.participants.forEach((participantId: string) => {
      if (participantId !== userId) {
        const currentCount = chat.unreadCount.get(participantId) || 0
        chat.unreadCount.set(participantId, currentCount + 1)
      }
    })

    await chat.save()

    return NextResponse.json(message)
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
} 