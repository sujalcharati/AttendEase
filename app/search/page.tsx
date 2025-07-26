"use client"
import SearchPage from "../components/Search"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session) router.push("/signin")
  }, [session, status, router])

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session) {
    return null // Will redirect
  }

  return (
    <div>
      <SearchPage/>
    </div>
  )
}
