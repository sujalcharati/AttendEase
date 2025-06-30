"use client"
import React, { useState } from 'react'
// import axios from 'axios'

const Signup = () => {
    const [, setFormdata] = useState({
        username: "",
        email: "",
        password: "",
    })

    // interface FormData {
    //     username: string;
    //     email: string;
    //     password: string;
    // }

    const handlesubmit = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormdata((prevFormdata) => ({
            ...prevFormdata,
            [name]: value,
        }));
    };
  
    
// const submitform = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try{
//         const result =await axios.post('http://localhost:3000/api/users/signup',formdata);
//         console.log(result);
    
//         }
    
     
        
    
//     catch(e){
//         console.error('error message',e);
//     }
    
// };


return (
    <div className="flex min-h-screen bg-gray-100">
        <div className="bg-white  ml-28 mt-36 rounded-md shadow-md w-[34rem]">
            <h2 className="text-4xl font-bold mb-6 text-center text-blue-900 pt-5">signup to your account</h2>
            <form  
        className="space-y-4 px-8 pb-8">
                <div>
                    <label className="block text-2xl font-medium text-gray-700">Username</label>
                    <input 
                        name="username"
                        onChange={handlesubmit}
                        type="text" 
                        placeholder="Enter username" 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  text-black shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-2xl font-medium text-gray-700">Email</label>
                    <input
                        name="email"
                        onChange={handlesubmit}
                        type="email" 
                        placeholder="Enter email" 
                        className="mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        
                    />
                </div>
                <div>
                <input
                        name="password"
                        onChange={handlesubmit}
                        type="password" 
                        placeholder="Password" 
                        className="mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                       
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full text-2xl flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm  font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                 >
                    Continue
                </button>
            </form>
        </div>
    </div>
  )
}

export default Signup