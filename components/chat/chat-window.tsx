"use client"

import * as React from "react"
import { SendHorizontal, Paperclip, SmilePlus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: string
  timestamp: string
  isSent: boolean
}

// interface ChatWindowProps {
//   chatId: string
// }

const messages: Message[] = [
  {
    id: "1",
    content: "Hey! How's your preparation for the test going?",
    sender: "John Doe",
    timestamp: "2:30 PM",
    isSent: false,
  },
  {
    id: "2",
    content: "Pretty good! Just reviewing the last chapter. How about you?",
    sender: "You",
    timestamp: "2:31 PM",
    isSent: true,
  },
  {
    id: "3",
    content: "Same here. Would you like to join our study group session tonight?",
    sender: "John Doe",
    timestamp: "2:32 PM",
    isSent: false,
  },
  {
    id: "4",
    content: "What time are you planning to meet?",
    sender: "You",
    timestamp: "2:33 PM",
    isSent: true,
  },
]

export function ChatWindow() {
  const [newMessage, setNewMessage] = React.useState("")
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    // Add logic to send message
    setNewMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col">
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex max-w-[80%] flex-col gap-1", message.isSent ? "ml-auto items-end" : "items-start")}
            >
              <div
                className={cn(
                  "rounded-lg px-4 py-2",
                  message.isSent ? "bg-primary text-primary-foreground" : "bg-muted",
                )}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {message.isSent ? "You" : message.sender} • {message.timestamp}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-end gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="min-h-[80px]"
          />
          <div className="flex flex-col gap-2">
            <Button size="icon" variant="ghost">
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Attach file</span>
            </Button>
            <Button size="icon" variant="ghost">
              <SmilePlus className="h-4 w-4" />
              <span className="sr-only">Add emoji</span>
            </Button>
            <Button size="icon" onClick={handleSendMessage}>
              <SendHorizontal className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

