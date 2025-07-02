import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        
        return NextResponse.json({
            name: session?.user?.name,
            email: session?.user?.email,
            id: (session.user as { id: string }).id
        })
    } catch (error) {
        console.error("Error fetching user:", error)
        return NextResponse.json(
            { error: "Failed to fetch user data" },
            { status: 500 }
        )
    }
}
