// import { connectDB } from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
// connectDB();

export async function POST(req:Request) {
    try{

        const {email, password} = await req.json();
        const user = await User.findOne({email})

        if(!user){
            return Response.json({error: 'user does not exists'})
        }

        console.log('user exists')

        if (!user.password) {
            return Response.json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password as string);


        if (!isMatch) {
            return Response.json({ error: 'Invalid credentials' });
        }


        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        if (!process.env.TOKEN_SECRET) {
            throw new Error('TOKEN_SECRET is not defined');
        }
        const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: 'logged in successfully',
            success: 'true'
        });


        response.cookies.set("token",token,{
            httpOnly:true
        })
        
        return response

    


    } catch (error: unknown) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        } else {
            return new Response(JSON.stringify({ error: 'An unknown error occurred' }), { status: 500 });
        }
    }
}