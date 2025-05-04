"use client"

import * as React from "react"
import { ChatList } from "@/components/chat/chat-list"
import { ChatWindow } from "@/components/chat/chat-window"
import { CreateGroupDialog } from "@/components/chat/create-group"

export default function SocialPage() {
  const [selectedChat, setSelectedChat] = React.useState<string>()

  return (
    <div className="grid h-[calc(100vh-4rem)] grid-cols-[350px_1fr]">
      <div className="border-r">
        <div className="p-4">
          <CreateGroupDialog />
        </div>
        <ChatList selectedChat={selectedChat} onSelectChat={setSelectedChat} />
      </div>
      <div className="flex flex-col">
        {selectedChat ? (
          <ChatWindow chatId={selectedChat} />
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}

