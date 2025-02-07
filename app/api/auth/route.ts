// app/api/auth/route.ts
import { connectDB } from '@/lib/db'; // Adjust the import path as needed

// export async function GET() {
  await connectDB();

//   try {
//     // Your logic to handle the GET request
//     return new Response(JSON.stringify({ message: 'Success' }), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }
// }