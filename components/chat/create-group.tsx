"use client"

import * as React from "react"
import { Users2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CreateGroupDialog() {
  const [open, setOpen] = React.useState(false)

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating group...")
    // const name = e.target.name.value
    // const type = e.target.type.value
    // const description = e.target.description.value



    // Add logic to create group
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto">
          <Users2 className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Group</DialogTitle>
          <DialogDescription>Create a group chat for your study circle or project team.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateGroup}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Group Name</Label>
              <Input id="name" placeholder="Enter group name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Group Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select group type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="study">Study Group</SelectItem>
                  <SelectItem value="project">Project Team</SelectItem>
                  <SelectItem value="class">Class Group</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Brief description of the group" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Group</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

