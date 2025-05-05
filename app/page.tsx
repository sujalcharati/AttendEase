"use client"
// import { signIn, signOut } from "next-auth/react";
import Landingpage from "./components/Landingpage";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Landingpage/>
    </div>
  );
}
