import { cn } from "@/lib/utils"

interface ColorPickerProps {
  colors: string[]
  selectedColor?: string
  onColorChange: (color: string) => void
}

export function ColorPicker({ colors, selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <button
          key={color}
          className={cn(
            "h-6 w-6 rounded-full border-2 transition-all",
            selectedColor === color ? "border-primary" : "border-transparent"
          )}
          style={{ backgroundColor: color }}
          onClick={() => onColorChange(color)}
        />
      ))}
    </div>
  )
}

