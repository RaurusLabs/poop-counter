"use client"

import { useState } from "react"
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
  const [shapeIndex, setShapeIndex] = useState(0)
  const [size, setSize] = useState("")
  const [color, setColor] = useState("")
  const [blood, setBlood] = useState(false)
  const [pain, setPain] = useState(false)
  const [notes, setNotes] = useState("")

  const handleSubmit = () => {
    console.log({ shape: shapes[shapeIndex].name, size, color, blood, pain, notes })
    onOpenChange(false)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-6">
          <div>
            <h3 className="mb-2 text-sm font-medium">Shape</h3>
            <Carousel
              setApi={(api) => {
                api?.on('select', () => {
                  setShapeIndex(api.selectedScrollSnap())
                })
              }}
            >
              <CarouselContent>
                {shapes.map((shape, index) => (
                  <CarouselItem key={index} className="basis-1/4 flex flex-col items-center">
                    <img src={shape.icon} alt={shape.name} className="w-20 h-20 mb-2" />
                    <p className="text-sm text-center">{shape.name}</p>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <Button
                  key={s}
                  variant="outline"
                  className={size === s ? 'border-primary' : ''}
                  onClick={() => setSize(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Color</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <Button
                  key={c}
                  className={`w-8 h-8 rounded-full relative ${color === c ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                >
                  {color === c && <Check className="absolute inset-0 m-auto text-white" size={16} />}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Label htmlFor="blood-switch" className="flex items-center gap-2">
              Blood
              <span className="text-sm text-muted-foreground">
                {blood ? 'Yes' : 'No'}
              </span>
            </Label>
            <Switch
              id="blood-switch"
              checked={blood}
              onCheckedChange={setBlood}
            />
          </div>
          <div className="flex justify-between items-center">
            <Label htmlFor="pain-switch" className="flex items-center gap-2">
              Pain
              <span className="text-sm text-muted-foreground">
                {pain ? 'Yes' : 'No'}
              </span>
            </Label>
            <Switch
              id="pain-switch"
              checked={pain}
              onCheckedChange={setPain}
            />
          </div>
          <Textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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