"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Calendar, Settings, Moon, Sun, BugPlay, Info } from "lucide-react"
import Link from "next/link"
import AddLog from './AddLog'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"

type PoopLog = {
  type: string;
  description: string;
  time: string;
}

const typeToEmoji: { [key: string]: string } = {
  "Normal": "🟤",
  "Constipation": "🟠",
}

export default function Component() {
  const [isAddLogOpen, setIsAddLogOpen] = useState(false)
  const [poopLogs, setPoopLogs] = useState<PoopLog[]>([])
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Debug: Add initial logs to localStorage
    const debugLogs = [
      { type: "Normal", description: "Medium, Firm", time: "12:40" },
      { type: "Constipation", description: "Extra Small, Blood", time: "12:47" }
    ]
    localStorage.setItem('poopLogs', JSON.stringify(debugLogs))

    // Load logs from localStorage
    const storedLogs = localStorage.getItem('poopLogs')
    if (storedLogs) {
      setPoopLogs(JSON.parse(storedLogs))
    }
  }, [])

  const handleAddLog = (newLog: PoopLog) => {
    const updatedLogs = [...poopLogs, newLog]
    setPoopLogs(updatedLogs)
    localStorage.setItem('poopLogs', JSON.stringify(updatedLogs))
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="bg-card p-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-semibold">Logs</h1>
        <div className="flex space-x-2">
          <Link href="/calendar-view">
            <Button variant="ghost" size="icon">
              <Calendar className="h-5 w-5" />
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    <span>Dark Mode</span>
                    <Moon className="h-4 w-4" />
                  </Label>
                  {mounted && (
                    <Switch
                      id="dark-mode"
                      checked={theme === 'dark'}
                      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                    />
                  )}
                </div>
                <Button variant="outline" className="w-full" onClick={() => window.open('mailto:tobidsn@gmail.com?subject=Bug%20Report')}>
                  <BugPlay className="mr-2 h-4 w-4" /> Report a Bug
                </Button>
                <Button variant="outline" className="w-full" onClick={() => alert('Poop Logger v1.0\nDeveloped with ❤️ by tobidsn')}>
                  <Info className="mr-2 h-4 w-4" /> About
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Today&apos;s Logs</h2>
            {poopLogs.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">No logs yet. Start tracking your poop!</p>
                  <Button onClick={() => setIsAddLogOpen(true)}>Add Your First Log</Button>
                </CardContent>
              </Card>
            ) : (
              poopLogs.map((log, index) => (
                <Card key={index} className="mb-2">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{typeToEmoji[log.type]}</span>
                      <div>
                        <p className="font-medium">{log.type}</p>
                        <p className="text-sm text-muted-foreground">{log.description}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{log.time}</span>
                  </CardContent>
                </Card>
              ))
            )}
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

      <AddLog open={isAddLogOpen} onOpenChange={setIsAddLogOpen} onAddLog={handleAddLog} />
    </div>
  )
}