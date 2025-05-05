import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { connectDB } from "@/lib/connectDB"
import Group from "../../../models/Group"
import crypto from "crypto"

// GET /api/groups - Get all groups for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as { id: string }).id
    await connectDB()

    // Find all groups where the user is a member
    const groups = await Group.find({
      members: userId
    }).sort({ updatedAt: -1 })

    return NextResponse.json(groups)
  } catch (error) {
    console.error("Error fetching groups:", error)
    return NextResponse.json(
      { error: "Failed to fetch groups" },
      { status: 500 }
    )
  }
}

// POST /api/groups - Create a new group
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = (session.user as { id: string }).id
    const { name, description, isPrivate } = await request.json()

    if (!name) {
      return NextResponse.json(
        { error: "Group name is required" },
        { status: 400 }
      )
    }

    await connectDB()

    // Generate a unique invite code for private groups
    const inviteCode = isPrivate ? crypto.randomBytes(4).toString('hex') : null

    // Create new group
    const group = await Group.create({
      name,
      description,
      creator: userId,
      members: [userId],
      admins: [userId],
      isPrivate,
      inviteCode,
      unreadCount: new Map([[userId, 0]])
    })

    return NextResponse.json(group)
  } catch (error) {
    console.error("Error creating group:", error)
    return NextResponse.json(
      { error: "Failed to create group" },
      { status: 500 }
    )
  }
} 