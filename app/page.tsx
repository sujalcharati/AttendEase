"use client"
import { signIn, signOut } from "next-auth/react";
import Landingpage from "./components/Landingpage";

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <nav className="flex justify-between items-center p-4 bg-gray-100">
        <div className="text-blue-600 text-4xl font-serif pl-28">Attendease</div>

        <div className="flex space-x-4">
          <button onClick={ ()=> signIn()} className="text-black py-2">Log in</button>
          <button  className="bg-blue-500 text-white px-4 py-2 rounded">Get started</button>
        </div>
        {/* <button className="bg-blue-500 text-white px-4 py-2 rounded">Get started</button> */}
      </nav>
      <Landingpage/>
    </div>
  );
}
