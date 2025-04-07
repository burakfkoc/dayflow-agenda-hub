
import { Button as TamaguiButton } from 'tamagui'
import { ReactNode } from 'react'

export interface ButtonProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline' | 'ghost' | 'icon'
  onPress?: () => void
  disabled?: boolean
  [key: string]: any // For other Tamagui button props
}

export const Button = ({
  children,
  size = 'md',
  variant = 'solid',
  ...props
}: ButtonProps) => {
  // Map our custom sizes to pixel values
  const sizeStyles = {
    sm: { paddingHorizontal: 12, paddingVertical: 6, fontSize: 14 },
    md: { paddingHorizontal: 16, paddingVertical: 8, fontSize: 16 },
    lg: { paddingHorizontal: 24, paddingVertical: 12, fontSize: 18 }
  }

  // Map our custom variants to Tamagui styling
  const getVariantStyles = (variant: string) => {
    switch(variant) {
      case 'solid':
        return {
          backgroundColor: '$primary',
          color: 'white',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: '$primary',
          color: '$primary',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: '$primary',
        };
      case 'icon':
        return {
          width: size === 'sm' ? 32 : size === 'md' ? 40 : 48,
          height: size === 'sm' ? 32 : size === 'md' ? 40 : 48,
          padding: 0,
          justifyContent: 'center',
          alignItems: 'center',
        };
      default:
        return {};
    }
  }

  return (
    <TamaguiButton
      borderRadius={8}
      {...sizeStyles[size]}
      {...getVariantStyles(variant)}
      {...props}
    >
      {children}
    </TamaguiButton>
  )
}
