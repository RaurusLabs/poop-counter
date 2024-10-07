"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

const shapes = [
  { name: "Hard lumps, like stones or nuts", icon: "/icon/1.png?height=80&width=80" },
  { name: "Sausage-shaped feces with lumps", icon: "/icon/2.png?height=80&width=80" },
  { name: "Sausage-shaped feces with cracks", icon: "/icon/3.png?height=80&width=80" },
  { name: "Soft snake-like feces", icon: "/icon/4.png?height=80&width=80" },
  { name: "Feces in the form of soft lumps", icon: "/icon/5.png?height=80&width=80" },
  { name: "Porous and soft feces", icon: "/icon/6.png?height=80&width=80" },
  { name: "Watery stool", icon: "/icon/7.png?height=80&width=80" },
]
const sizes = ["XS", "S", "M", "L", "XL"]
const colors = ["#D2B48C", "#8B4513", "#A0522D", "#000000", "#DAA520", "#556B2F", "#808080"]

interface AddLogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddLog({ open, onOpenChange }: AddLogProps) {
  const [shapeIndex, setShapeIndex] = useState(2)
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [size, setSize] = useState("")
  const [color, setColor] = useState("")
  const [blood, setBlood] = useState(false)
  const [pain, setPain] = useState(false)
  const [notes, setNotes] = useState("")
  const [keyboardVisible, setKeyboardVisible] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setKeyboardVisible(window.visualViewport!.height < window.innerHeight)
    }

    window.visualViewport?.addEventListener('resize', handleResize)
    return () => window.visualViewport?.removeEventListener('resize', handleResize)
  }, [])

  const handleSubmit = () => {
    console.log({ shape: shapes[shapeIndex].name, size, color, blood, pain, notes })
    onOpenChange(false)
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className={keyboardVisible ? 'h-screen' : ''}>
        <DrawerHeader>
          <DrawerTitle>Add New</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-6 overflow-y-auto">
          <div>
          <h3 className="mb-2 text-md font-medium flex items-center">
            Shape 
            <button 
              className="ml-2 text-gray-500 hover:text-gray-700"
              onClick={openModal}
              aria-label="More information about shape types"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a7 7 0 100 14A7 7 0 009 2zM8 11V9h2v2H8zm0-3V6h2v2H8z" />
              </svg>
            </button>
          </h3>
            {shapeIndex !== null && (
              <p className="text-sm text-gray-500 mb-4">{shapes[shapeIndex].name}</p>
            )}
            <Carousel
              setApi={(api) => {
                api?.on('select', () => {
                  setShapeIndex(api.selectedScrollSnap())
                })
              }}
            >
              <CarouselContent>
                {shapes.map((shape, index) => (
                  <CarouselItem key={index} className="basis-1/4 sm:basis-1/4 md:basis-1/5">
                    <Card 
                      className={`h-full cursor-pointer transition-all ${
                        shapeIndex === index 
                          ? 'border-primary ring-primary ring-offset-2' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => setShapeIndex(index)}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-2 h-full">
                        <img src={shape.icon} alt={shape.name} className="w-16 h-16 mb-2" />
                        {/* <p className="text-xs text-center">{shape.name}</p> */}
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {/* Modal for additional info */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Shape Information</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    The shape of your stool can indicate the health of your digestive system. 
                    Here are some general insights about different stool shapes and what they may signify:
                  </p>
                  <ul className="list-disc list-inside">
                    {shapes.map((shape, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {shape.name}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-right">
                    <button 
                      className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <h3 className="mb-2 text-md font-medium">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <Button
                  key={s}
                  variant={size === s ? "default" : "outline"}
                  className={size === s ? 'ring-primary ring-offset-2' : 'hover:border-primary/50'}
                  onClick={() => setSize(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-md font-medium">Color</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <Button
                  key={c}
                  className={`w-10 h-10 rounded-full relative transition-all ${
                    color === c 
                      ? 'ring-primary ring-offset-2 border-2 border-gray' // Add border when selected
                      : 'hover: hover:ring-primary/50 hover:ring-offset-2'
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                >
                  {color === c && <Check className="absolute inset-0 m-auto text-white" size={20} />}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Label htmlFor="blood-switch" className="flex items-center gap-2 text-md">
              Blood
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {blood ? 'Yes' : 'No'}
              </span>
              <Switch
                id="blood-switch"
                checked={blood}
                onCheckedChange={setBlood}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Label htmlFor="pain-switch" className="flex items-center gap-2 text-md">
              Pain
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {pain ? 'Yes' : 'No'}
              </span>
              <Switch
                id="pain-switch"
                checked={pain}
                onCheckedChange={setPain}
              />
            </div>
          </div>
          <Textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[50px]"
          />
        </div>
        <DrawerFooter>
          <Button onClick={handleSubmit}>Add Entry</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}