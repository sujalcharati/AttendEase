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

    // Get all subjects without filtering by userId
    const subjects = await Subject.find({});
    console.log("Found subjects:", subjects);

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
    
    
    // const userId = session.user.id;
    // const userId = new mongoose.Types.ObjectId(session.userId);
    const userId = session.userId;

    
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

    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get('id');

    if (!subjectId) {
      return NextResponse.json({ error: 'Subject ID is required' }, { status: 400 });
    }

    // Delete the subject
    const deletedSubject = await Subject.findByIdAndDelete(subjectId);

    if (!deletedSubject) {
      return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
    }   

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
