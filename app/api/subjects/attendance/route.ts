import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Subject from "@/models/attendance";


export async function POST(request:NextRequest){
    try {
        await connectDB();
        const session= await getServerSession(authOptions)
        if(!session){
            return NextResponse.json({error:"unauthorized"},{status:401})
        }
        const {subjectId,type}= await request.json();
        const userId= session.userId;

        if(!userId){
            return NextResponse.json({error:"user not found"},{status:404})
        }

        const subject= await Subject.findById(subjectId);
        if(!subject){
            return NextResponse.json({error:"subject not found"},{status:404})
        }
        
        if(type==="attended"){
            subject.classesAttended+=1;
        }
        subject.totalClasses+=1;
        await subject.save();
        
        return NextResponse.json({subject, message:"attendance updated successfully"},{status:200})
    } catch (error) {
        console.error("Error updating attendance:", error);
        return NextResponse.json({error:"internal server error"},{status:500})
    }
}