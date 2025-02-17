import { HexColorInput, HexColorPicker } from "react-colorful"

interface ColorPickerProps {
  id: string
  value: string
  onPickerChange: (color: string) => void
}

const ColorPicker = ({ id, value, onPickerChange }: ColorPickerProps) => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center">
        <p>#</p>
        <HexColorInput
          id={id}
          color={value}
          onChange={onPickerChange}
          className="hex-input"
        />
      </div>
      <HexColorPicker color={value} onChange={onPickerChange} />
    </div>
  )
}

export default ColorPicker
