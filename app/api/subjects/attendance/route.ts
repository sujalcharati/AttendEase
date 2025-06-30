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
        
        const {subjectId,type} = await request.json();
        console.log("Request data:", { subjectId, type });

        const subject = await Subject.findById(subjectId);
        console.log("Found subject:", subject);
        
        if(!subject){
            console.log("Subject not found");
            return NextResponse.json({error:"subject not found"},{status:404})
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