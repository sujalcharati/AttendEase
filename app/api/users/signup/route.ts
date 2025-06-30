// import { connectDB } from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    // await connectDB();
    const { username, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/login'
      }
    });
  } catch (error: unknown) {
    console.error('Error in signup:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ 
        error: "Server error",
        details: error instanceof Error ? error.message : 'An unknown error occurred'
      }), 
      {
        status: 500,
      }
    );
  }
}