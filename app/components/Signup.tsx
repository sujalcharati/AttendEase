import React from 'react'

const Signup = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
        <div className="bg-white  ml-28 mt-36 rounded-md shadow-md w-[34rem]">
            <h2 className="text-4xl font-bold mb-6 text-center text-blue-900 pt-5">signup to your account</h2>
            <form className="space-y-4 px-8 pb-8">
                <div>
                    <label className="block text-2xl font-medium text-gray-700">Username</label>
                    <input 
                        type="email" 
                        placeholder="Enter username" 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-2xl font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        placeholder="Enter email" 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-2xl font-medium text-gray-700">Password</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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