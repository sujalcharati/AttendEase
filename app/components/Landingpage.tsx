"use client" 
import { signIn } from 'next-auth/react';
import React from 'react'
import { FcGoogle } from 'react-icons/fc';


const Landingpage = () => {
    return (
        <div>
            <div className="flex flex-col justify-start items-start  font-semibold text-5xl text-left text-gray-900 pl-28">
                <div className='mt-28'>

                <div className="mb-4">Effortlessly</div>
                <div className="mb-4">track</div>
                <div className="mb-4">attendance</div>
                </div>
            </div>
            <div className='text-black flex flex-col pl-28 mt-4 text-2xl'>
                <div>Say goodbye to boring forms.Meet Attendease — intuitive </div>
                <div> the free,you’ve been looking for.</div>
                   
            </div>
            <button 
                className='ml-28 mt-10 bg-blue-500 w-64 h-16 rounded-md flex items-center justify-center text-white' 
                onClick={() => signIn('google', { callbackUrl: '/homepage' })}
            >
                <FcGoogle className='w-10 h-10 mr-2 bg-white rounded-sm' />
                Signup with Google
            </button>
                </div>
    );
};

export default Landingpage