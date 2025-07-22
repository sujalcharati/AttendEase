import { connectDB } from '@/lib/connectDB';
import Subject from '@/models/attendance';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(){
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    console.log("Session in GET:", session);

    if(!session || !session.user){
      return NextResponse.json(
        {error:"Not authenticated"},
        { status:401}
      )
    }

    // Get the current user's ID
    const userId = (session.user as { id: string }).id;
    
    // Filter subjects by the current user's ID
    const subjects = await Subject.find({ userId: userId });
    console.log("Found subjects for user:", userId, subjects);

    return NextResponse.json(subjects, {status: 200});
  }
  catch(error: unknown) {
    if (error instanceof Error) {
      console.log("Error in fetching the subject:", error.message);
    } else {
      console.log("An unknown error occurred:", error);
    }
    return NextResponse.json(
      {
        error:" there is error in fetching the subjects ",
        details: error instanceof Error ? error.message : "An unknown error occurred"
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
    
    // Get the current user's ID properly
    const userId = (session.user as { id: string }).id;

    
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating subject:', error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
    return NextResponse.json(
      { error: 'Failed to create subject', details: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get the current user's ID
    const userId = (session.user as { id: string }).id;

    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get('id');

    if (!subjectId) {
      return NextResponse.json({ error: 'Subject ID is required' }, { status: 400 });
    }

    // Find the subject and verify it belongs to the current user
    const subject = await Subject.findOne({ _id: subjectId, userId: userId });

    if (!subject) {
      return NextResponse.json({ error: 'Subject not found or unauthorized' }, { status: 404 });
    }

    // Delete the subject
    await Subject.findByIdAndDelete(subjectId);

    return NextResponse.json({ message: 'Subject deleted successfully' }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting subject:', error.message);
    } else {
      console.error('An unknown error occurred:', error);
    }
    return NextResponse.json(
      { error: 'Failed to delete subject', details: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
