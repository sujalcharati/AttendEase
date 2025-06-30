"use client"
import { signIn } from 'next-auth/react'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const Signin = () => {


    //  const googleprovider = async ()=>{

    // const response = await fetch('api/auth/callback/google');
    // const data =response.json();
    // console.log(data);

    // }
  return (
    <div className="flex min-h-screen bg-gray-100">
        <div className="bg-white  ml-28 mt-36 rounded-md shadow-md w-[34rem]">
            <h2 className="text-4xl font-bold mb-6 text-center text-blue-900 pt-6">Login to your account</h2>
            <form className="space-y-4 px-8 pb-8">
                <div>
                    <label className="block text-2xl font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        placeholder="Enter email" 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-1px text-black"
                    />
                </div>
                <div>
                    <label className="block text-2xl font-medium text-gray-700">Password</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-1px text-black"
                        
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-2xl font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Continue 
                </button>

                <div className='flex items-center justify-center my-4'>
                    <hr className='w-full border-gray-300' />
                    <span className='px-4 text-black'>OR</span>
                    <hr className='w-full border-gray-300' />
                </div>
                <button  onClick={ ()=>{ signIn('google') }} className=' mt-20 text-black  h-16 border border-solid border-black rounded-md flex items-center justify-center  w-full text-2xl'>
                    <FcGoogle className='w-10 h-10 mr-2 bg-white' />
                    Continue with Google
                </button>
            </form>
        </div>
    </div>
  )
}

export default Signin
