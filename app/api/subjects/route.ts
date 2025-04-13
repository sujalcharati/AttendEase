


import { connectDB } from '@/lib/db';
import Subject from '@/models/attendance';
import { getServerSession } from 'next-auth';
import { NEXT_AUTH_CONFIG } from '@/lib/auth'; // Update with your actual path
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
export async function POST(request :NextRequest) {
  try {
    // Connect to database
    await connectDB();
    
    // Get current user session
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    console.log(session);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    
    const userId = session.user.id;

    
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
    user: userId,
    userId: new mongoose.Types.ObjectId(userId)
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