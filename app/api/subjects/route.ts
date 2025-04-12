// import { Subject } from '@/models/attendance';
// import { NextResponse } from 'next/server';

// export const POST = async (request: Request) => {

//     try {
//         const subjectname = await request.json()
        
//         if(!subjectname){
//          return NextResponse.json({
//             msg: 'name field not found'
//          }, { status: 400 });
//         }

//         try {
//             const userId = request.headers.get('user-id');
//             if (!userId) {
//                 return NextResponse.json({
//                     msg: 'User ID not found in headers'
//                 }, { status: 400 });
//             }

//             const existingSubject = await Subject.findOne({ 
//                 name: subjectname.name.trim(),
//                 user: userId
//             });
//             if (existingSubject) {
//               console.log('Subject found:', existingSubject);
//             } else {
//               console.log('No subject found with the given name.');
//             }
//           } catch (error) {
//             console.error('Error querying the database:', error);
//           }


//         const subject = new Subject({
//             name: subjectname.name.trim(),
//             user: request.headers.get('user-id')
//         });

//         await subject.save();
//         console.log('New subject created:', subject);
//         return NextResponse.json({ message: 'Data received successfully', subjectname }, { status: 200 });
//     } catch (error) {
        
//     }
// };

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import {NEXT_AUTH_CONFIG}  from '@/lib/auth';
import { Subject } from '@/models/attendance';

export const POST = async (request: Request) => {
  const session = await getServerSession( NEXT_AUTH_CONFIG );
  console.log(session)
  

  if (!session || !session.user?.id) {
    return NextResponse.json({ msg: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  if (!body?.name || typeof body.name !== 'string') {
    return NextResponse.json({ msg: 'name field is required' }, { status: 400 });
  }

  const existingSubject = await Subject.findOne({
    name: body.name.trim(),
    user: session.user.id,
  });

  if (existingSubject) {
    return NextResponse.json({ msg: 'Subject already exists' }, { status: 409 });
  }

  const subject = new Subject({
    name: body.name.trim(),
    user: session.user.id,
  });

  await subject.save();

  return NextResponse.json(
    { message: 'Subject created successfully', subject },
    { status: 201 }
  );
};
