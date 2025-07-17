"use client" 
import { signIn } from 'next-auth/react';
import React from 'react'
import { FcGoogle } from 'react-icons/fc';

const Landingpage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Hero Section */}
            <div className="container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    
                    {/* Left Content */}
                    <div className="lg:w-1/2 mb-12 lg:mb-0">
                        <div className="space-y-2 mb-8">
                            <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                                Effortlessly
                            </h1>
                            <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                                track
                            </h1>
                            <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                                attendance
                            </h1>
                        </div>
                        
                        <div className="text-gray-600 text-xl lg:text-2xl mb-8 leading-relaxed">
                            <p className="mb-2">Say goodbye to boring forms.</p>
                            <p>Meet <span className="font-semibold text-blue-600">Attendease</span> — the intuitive,</p>
                            <p>free solution you&apos;ve been looking for.</p>
                        </div>

                        <div className="space-y-4">
                            <button 
                                className="group bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 text-gray-700 font-semibold py-4 px-8 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
                                onClick={() => signIn('google', { callbackUrl: '/homepage' })}
                            >
                                <FcGoogle className='w-6 h-6 mr-3' />
                                Continue with Google
                            </button>
                            
                            {/* Feature highlights */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <div className="flex items-center text-sm text-gray-500">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                    Free forever
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                                    No setup required
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                                    Instant access
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Visual Element */}
                    <div className="lg:w-1/2 flex justify-center">
                        <div className="relative">
                            {/* Floating Cards */}
                            <div className="relative w-80 h-96">
                                {/* Card 1 */}
                                <div className="absolute top-0 left-0 w-64 h-40 bg-white rounded-2xl shadow-xl p-6 transform rotate-6 hover:rotate-3 transition-transform duration-300">
                                    <div className="flex items-center mb-4">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                        </div>
                                        <span className="ml-2 text-sm font-medium text-gray-600">Present</span>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-800">127</div>
                                    <div className="text-sm text-gray-500">Students attended</div>
                                </div>

                                {/* Card 2 */}
                                <div className="absolute top-20 right-0 w-64 h-40 bg-white rounded-2xl shadow-xl p-6 transform -rotate-6 hover:-rotate-3 transition-transform duration-300">
                                    <div className="flex items-center mb-4">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                        </div>
                                        <span className="ml-2 text-sm font-medium text-gray-600">Today&apos;s Rate</span>
                                    </div>
                                    <div className="text-2xl font-bold text-gray-800">94%</div>
                                    <div className="text-sm text-gray-500">Attendance rate</div>
                                </div>

                                {/* Card 3 */}
                                <div className="absolute bottom-0 left-8 w-64 h-40 bg-white rounded-2xl shadow-xl p-6 transform rotate-3 hover:rotate-1 transition-transform duration-300">
                                    <div className="flex items-center mb-4">
                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                            <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                                        </div>
                                        <span className="ml-2 text-sm font-medium text-gray-600">Quick Scan</span>
                                    </div>
                                    <div className="text-lg font-bold text-gray-800">2.3s</div>
                                    <div className="text-sm text-gray-500">Average check-in time</div>
                                </div>
                            </div>

                            {/* Background decorative elements */}
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
                        </div>
                    </div>
                </div>
             
            </div>
        </div>
    );
};

export default Landingpage