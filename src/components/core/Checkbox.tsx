
import { Check } from 'lucide-react'
import { Checkbox as TamaguiCheckbox, Label, XStack } from 'tamagui'
import { useState } from 'react'

export interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
  className?: string
  [key: string]: any // For other Tamagui checkbox props
}

export const Checkbox = ({
  checked: controlledChecked,
  onCheckedChange,
  label,
  disabled = false,
  className,
  ...props
}: CheckboxProps) => {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(false)
  
  // Controlled veya uncontrolled checkbox olarak kullanılabilir
  const isChecked = controlledChecked !== undefined ? controlledChecked : uncontrolledChecked
  
  const handleChange = (checked: boolean) => {
    if (controlledChecked === undefined) {
      setUncontrolledChecked(checked)
    }
    onCheckedChange?.(checked)
  }
  
  return (
    <XStack alignItems="center" space="$2">
      <TamaguiCheckbox
        id={`checkbox-${label || Math.random().toString(36).substr(2, 9)}`}
        checked={isChecked}
        onCheckedChange={handleChange}
        disabled={disabled}
        opacity={disabled ? 0.5 : 1}
        {...props}
      >
        <TamaguiCheckbox.Indicator>
          <Check size={16} />
        </TamaguiCheckbox.Indicator>
      </TamaguiCheckbox>
      
      {label && (
        <Label
          htmlFor={`checkbox-${label}`}
          opacity={disabled ? 0.5 : 1}
        >
          {label}
        </Label>
      )}
    </XStack>
  )
}
