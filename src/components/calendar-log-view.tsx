'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const typeToEmoji: { [key: string]: string } = {
  "Normal": "🟤",
  "Constipation": "🟠",
  "Diarrhea": "💩",
}

type LogEntry = {
  date: string;
  logs: {
    type: string;
    description: string;
    time: string;
  }[];
};

const logData: LogEntry[] = [
  {
    date: "2024-01-22",
    logs: [
      { type: "Normal", description: "Medium, Firm", time: "12:40" },
      { type: "Constipation", description: "Extra Small, Blood", time: "12:47" }
    ]
  },
  {
    date: "2024-01-23",
    logs: [
      { type: "Diarrhea", description: "Watery, Frequent", time: "08:15" }
    ]
  }
]

export default function CalendarLogView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedLogType, setSelectedLogType] = useState<string | null>(null)

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    // Render each day
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
      const hasLogs = logData.some(entry => entry.date === currentDateString)

      // Determine button color based on logs and selection
      const buttonColor = hasLogs ? (selectedLogType ? (typeToEmoji[selectedLogType] === typeToEmoji['Diarrhea'] ? 'bg-red-500' : selectedLogType === 'Constipation' ? 'bg-orange-500' : 'bg-brown-500') : 'bg-blue-500') : '';

      days.push(
        <Button
          key={i}
          variant={hasLogs ? "default" : "ghost"}
          className={`p-2 ${isToday(new Date(currentDate.getFullYear(), currentDate.getMonth(), i)) ? 'bg-green-500 text-white' : buttonColor}`}
          onClick={() => hasLogs && setSelectedLogType(hasLogs ? logData.find(entry => entry.date === currentDateString)?.logs[0].type || null : null)}
        >
          {i}
        </Button>
      )
    }

    return days
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white p-4 flex justify-between items-center border-b">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Logs</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => navigateMonth('prev')}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => navigateMonth('next')}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                  {daysOfWeek.map(day => (
                    <div key={day} className="text-sm font-medium text-gray-500">{day}</div>
                  ))}
                  {renderCalendar()}
                </div>
              </CardContent>
            </Card>

            {logData.map((entry, index) => (
              <div key={index} className="mb-4">
                <h2 className="text-lg font-semibold mb-2">{new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h2>
                {entry.logs.map((log, logIndex) => (
                  <Card key={logIndex} className="mb-2">
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
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}
