"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Calendar, Settings } from "lucide-react"
import Link from "next/link"
import React, { useState } from 'react'
import AddLog from './AddLog'

const poopLogs = [
  { type: "Normal", description: "Medium, Firm", time: "12:40" },
  { type: "Constipation", description: "Extra Small, Blood", time: "12:47" }
]

const typeToEmoji: { [key: string]: string } = {
  "Normal": "🟤",
  "Constipation": "🟠",
}

export default function Component() {
  const [isAddLogOpen, setIsAddLogOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white p-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-semibold">Logs</h1>
        <div className="flex space-x-2">
          <Link href="/calendar-view">
            <Button variant="ghost" size="icon">
              <Calendar className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Today's Logs</h2>
            {poopLogs.map((log, index) => (
              <Card key={index} className="mb-2">
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{typeToEmoji[log.type]}</span>
                    <div>
                      <p className="font-medium">{log.type}</p>
                      <p className="text-sm text-gray-500">{log.description}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{log.time}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </main>

      <div className="fixed bottom-6 right-6">
        <Button 
          size="icon" 
          className="rounded-full w-14 h-14 shadow-lg"
          onClick={() => setIsAddLogOpen(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <AddLog open={isAddLogOpen} onOpenChange={setIsAddLogOpen} />
    </div>
  )
}