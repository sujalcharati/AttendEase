import { connectDB } from '@/lib/connectDB';
import Subject from '@/models/attendance';
import { getServerSession } from 'next-auth';
import  {authOptions}  from '@/app/api/auth/[...nextauth]/route'; // Update with your actual path
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';




export async function GET(request:NextRequest){
 
  try{
          
    await connectDB();
    const session = await getServerSession(authOptions);

    if(!session || !session.user){
     return NextResponse.json(
      {error:"Not authenticated"},
      { status:401}
     )
    }

    const userId = new mongoose.Types.ObjectId(session.user.id);

    const subject = await Subject.findOne({ userId });
    return NextResponse.json(
      {subject},
      {status:201}
    )
    
  }
  catch(error: any){
   console.log(" error in fetching the subject",error);
   return NextResponse.json(
    {
      error:" there is error in fetching the subjects ",
      details: error.message
    },
    {status:501}
   )
  }
} 

export async function POST(request :NextRequest) {
  try {
    // Connect to database
    await connectDB();
    
    // Get current user session
    const session = await getServerSession(authOptions);
    console.log(session);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    
    // const userId = session.user.id;
    const userId = new mongoose.Types.ObjectId(session.user.id);

    
    // Get data from request body
    const body = await request.json();
    const { name, classesAttended, totalClasses } = body;
    
    if (!name) {
      return NextResponse.json({ error: 'Subject name is required' }, { status: 400 });
    }
    
// Create new subject
  const newSubject = await Subject.create({
    name,
    classesAttended: classesAttended || 0,
    totalClasses: totalClasses || 0,
    // user: userId,
    userId
  });
    
    return NextResponse.json(newSubject, { status: 201 });
  } catch (error: any) {
    console.error('Error creating subject:', error);
    return NextResponse.json(
      { error: 'Failed to create subject', details: error.message },
      { status: 500 }
    );
  }
}