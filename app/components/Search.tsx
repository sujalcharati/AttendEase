"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, UserPlus, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"
import { useDebounce } from "../hooks/use-debounce"
// import { cn } from "@/lib/utils"

interface User {
  _id: string
  name: string
  email: string
  image?: string
  isOnline?: boolean
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()
  const debouncedSearch = useDebounce(searchQuery, 500)

  const searchUsers = useCallback(async (query: string) => {
    if (!query.trim()) {
      setUsers([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error("Failed to search users")
      }
      const data = await response.json()
      console.log(data)
      setUsers(data)
    } catch (err) {
      setError("Failed to search users. Please try again.")
      console.error("Search error:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    searchUsers(debouncedSearch)
  }, [debouncedSearch, searchUsers])

  const handleAddFriend = async (userId: string) => {
    try {
      const response = await fetch("/api/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      })

      if (!response.ok) {
        throw new Error("Failed to add friend")
      }

      // Update the UI to show friend request sent
      setUsers(users.map(user => 
        user._id === userId ? { ...user, friendRequestSent: true } : user
      ))
    } catch (err) {
      console.error("Error adding friend:", err)
    }
  }

  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Find People</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by username or email..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-destructive">
              {error}
            </div>
          )}

          {!loading && !error && users.length === 0 && searchQuery && (
            <div className="text-center py-8 text-muted-foreground">
              No users found
            </div>
          )}

          {!loading && !error && users.length > 0 && (
            <div className="mt-6 space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={user.image} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {user.isOnline && (
                      <div className="flex items-center gap-1 text-sm text-green-500">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        Online
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddFriend(user._id)}
                      disabled={user._id === session?.userId}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Friend
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 