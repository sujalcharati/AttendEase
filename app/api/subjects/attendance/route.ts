import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Subject from "@/models/attendance";

export async function POST(request:NextRequest){
    try {
        await connectDB();
        console.log("Database connected");
        
        const session = await getServerSession(authOptions)
        console.log("Session:", session);
        
        if(!session){
            console.log("No session found");
            return NextResponse.json({error:"unauthorized"},{status:401})
        }

        // Get the current user's ID
        const userId = (session.user as { id: string }).id;
        
        const {subjectId,type} = await request.json();
        console.log("Request data:", { subjectId, type });

        // Find the subject and verify it belongs to the current user
        const subject = await Subject.findOne({ _id: subjectId, userId: userId });
        console.log("Found subject:", subject);
        
        if(!subject){
            console.log("Subject not found or unauthorized");
            return NextResponse.json({error:"subject not found or unauthorized"},{status:404})
        }
        
        if(type==="attended"){
            subject.classesAttended+=1;
        }
        subject.totalClasses+=1;
        await subject.save();
        console.log("Subject saved successfully");
        
        return NextResponse.json({subject, message:"attendance updated successfully"},{status:200})
    } catch (error) {
        console.error("Error updating attendance:", error);
        return NextResponse.json({error:"internal server error"},{status:500})
    }
}