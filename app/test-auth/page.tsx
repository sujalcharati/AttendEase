"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export default function AuthTest() {
  const { data: session, status } = useSession()

  if (status === "loading") return <p>Loading...</p>

  if (session) {
    return (
      <div className="p-8">
        <h1>Signed in as {session.user?.email}</h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <button 
          onClick={() => signOut()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Sign out
        </button>
      </div>
    )
  }
  
  return (
    <div className="p-8">
      <h1>Not signed in</h1>
      <button 
        onClick={() => signIn("google")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  )
}
