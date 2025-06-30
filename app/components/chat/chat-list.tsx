"use client"

import { Hash, Plus, Users } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Chat {
  _id: string
  name: string
  type: "direct" | "group"
  lastMessage?: {
    text: string
    timestamp: string
  }
  unreadCount?: number
  isOnline?: boolean
  avatar?: string
}

interface Group {
  _id: string
  name: string
  description?: string
  creator: string
  members: string[]
  admins: string[]
  isPrivate: boolean
  inviteCode?: string
  lastMessage?: {
    text: string
    timestamp: string
  }
  unreadCount?: number
}

interface ChatListProps {
  selectedChat?: string
  onSelectChat: (chatId: string) => void
}

export function ChatList({ selectedChat, onSelectChat }: ChatListProps) {
  const [chats, setChats] = useState<Chat[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreatingGroup, setIsCreatingGroup] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupDescription, setNewGroupDescription] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)
  const { data: session } = useSession()

  const fetchChats = async () => {
    try {
      const response = await fetch('/api/chats')
      if (response.ok) {
        const data = await response.json()
        setChats(data)
      }
    } catch (error) {
      console.error('Error fetching chats:', error)
    }
  }

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/groups')
      if (response.ok) {
        const data = await response.json()
        setGroups(data)
      }
    } catch (error) {
      console.error('Error fetching groups:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session?.user) {
      fetchChats()
      fetchGroups()
    }
  }, [session])

  const createNewGroup = async () => {
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newGroupName,
          description: newGroupDescription,
          isPrivate
        })
      })

      if (response.ok) {
        const newGroup = await response.json()
        setGroups(prev => [newGroup, ...prev])
        setIsCreatingGroup(false)
        setNewGroupName("")
        setNewGroupDescription("")
      } else {
        console.error('Failed to create group')
      }
    } catch (error) {
      console.error('Error creating group:', error)
    }
  }

  if (loading) {
    return (
      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="flex flex-col gap-2 p-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-4 rounded-lg p-3 animate-pulse">
              <div className="h-10 w-10 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 bg-gray-200 rounded" />
                <div className="h-3 w-2/3 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Dialog open={isCreatingGroup} onOpenChange={setIsCreatingGroup}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              New Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Group name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
              <Input
                placeholder="Description (optional)"
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="private"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
                <label htmlFor="private">Private Group</label>
              </div>
              <Button onClick={createNewGroup} className="w-full">
                Create Group
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs defaultValue="chats" className="flex-1">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chats">Chats</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>
        <TabsContent value="chats" className="h-[calc(100vh-15rem)]">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-2 p-4">
              {chats.map((chat) => (
                <button
                  key={chat._id}
                  onClick={() => onSelectChat(chat._id)}
                  className={cn(
                    "flex items-start gap-4 rounded-lg p-3 text-left transition-colors hover:bg-accent",
                    selectedChat === chat._id && "bg-accent",
                  )}
                >
                  <div className="relative">
                    {chat.type === "direct" ? (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-sm font-semibold">
                          {chat.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Hash className="h-5 w-5" />
                      </div>
                    )}
                    {chat.type === "direct" && chat.isOnline && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{chat.name}</span>
                      {chat.lastMessage?.timestamp && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(chat.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                    {chat.lastMessage?.text && (
                      <p className="line-clamp-1 text-sm text-muted-foreground">
                        {chat.lastMessage.text}
                      </p>
                    )}
                  </div>
                  {chat.unreadCount ? (
                    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-xs text-primary-foreground">
                      {chat.unreadCount}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        <TabsContent value="groups" className="h-[calc(100vh-15rem)]">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-2 p-4">
              {groups.map((group) => (
                <button
                  key={group._id}
                  onClick={() => onSelectChat(group._id)}
                  className={cn(
                    "flex items-start gap-4 rounded-lg p-3 text-left transition-colors hover:bg-accent",
                    selectedChat === group._id && "bg-accent",
                  )}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{group.name}</span>
                      {group.lastMessage?.timestamp && (
                        <span className="text-xs text-muted-foreground">
                          {new Date(group.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {group.members.length} members
                      </span>
                      {group.isPrivate && (
                        <span className="text-xs text-muted-foreground">
                          • Private
                        </span>
                      )}
                    </div>
                    {group.lastMessage?.text && (
                      <p className="line-clamp-1 text-sm text-muted-foreground">
                        {group.lastMessage.text}
                      </p>
                    )}
                  </div>
                  {group.unreadCount ? (
                    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-xs text-primary-foreground">
                      {group.unreadCount}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
} 