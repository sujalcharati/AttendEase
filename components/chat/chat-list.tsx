"use client"

import { Hash } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface ChatProps {
  id: string
  name: string
  type: "direct" | "group"
  lastMessage?: string
  timestamp?: string
  unreadCount?: number
  avatar?: string
  isOnline?: boolean
}

const chats: ChatProps[] = [
  {
    id: "1",
    name: "Study Group A",
    type: "group",
    lastMessage: "Does anyone have the notes from today's class?",
    timestamp: "2:30 PM",
    unreadCount: 3,
  },
  {
    id: "2",
    name: "John Doe",
    type: "direct",
    lastMessage: "Thanks for helping with the assignment!",
    timestamp: "1:45 PM",
    isOnline: true,
  },
  {
    id: "3",
    name: "Physics Discussion",
    type: "group",
    lastMessage: "Meeting tomorrow at 3 PM",
    timestamp: "11:30 AM",
  },
  {
    id: "4",
    name: "Jane Smith",
    type: "direct",
    lastMessage: "Sure, I can help you with that",
    timestamp: "Yesterday",
    isOnline: false,
  },
]

interface ChatListProps {
  selectedChat?: string
  onSelectChat: (chatId: string) => void
}

export function ChatList({ selectedChat, onSelectChat }: ChatListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-10rem)]">
      <div className="flex flex-col gap-2 p-4">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={cn(
              "flex items-start gap-4 rounded-lg p-3 text-left transition-colors hover:bg-accent",
              selectedChat === chat.id && "bg-accent",
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
                {chat.timestamp && <span className="text-xs text-muted-foreground">{chat.timestamp}</span>}
              </div>
              {chat.lastMessage && <p className="line-clamp-1 text-sm text-muted-foreground">{chat.lastMessage}</p>}
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
  )
}

