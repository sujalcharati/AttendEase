import { Subject } from '@/models/attendance';
import { NextResponse } from 'next/server';

const POST = async (request: Request) => {
    try {
        const subjectname = await request.json()
        
        if(!subjectname){
         return NextResponse.json({
            msg: 'name field not found'
         }, { status: 400 });
        }

        try {
            const userId = request.headers.get('user-id');
            if (!userId) {
                return NextResponse.json({
                    msg: 'User ID not found in headers'
                }, { status: 400 });
            }

            const existingSubject = await Subject.findOne({ 
                name: subjectname.name.trim(),
                user: userId
            });
            if (existingSubject) {
              console.log('Subject found:', existingSubject);
            } else {
              console.log('No subject found with the given name.');
            }
          } catch (error) {
            console.error('Error querying the database:', error);
          }


        const subject = new Subject ({
            name:subjectname.trim(),

        })

        

        const data = await request.json();

        return NextResponse.json({ message: 'Data received successfully', data }, { status: 200 });
    } catch (error) {
        
    }
};