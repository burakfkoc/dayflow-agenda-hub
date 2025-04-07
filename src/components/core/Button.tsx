
import { Button as TamaguiButton } from 'tamagui'
import type { ButtonProps as TamaguiButtonProps } from 'tamagui'
import { ReactNode } from 'react'

export interface ButtonProps extends TamaguiButtonProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline' | 'ghost' | 'icon'
}

export const Button = ({
  children,
  size = 'md',
  variant = 'solid',
  ...props
}: ButtonProps) => {
  const sizeStyles = {
    sm: { paddingHorizontal: 12, paddingVertical: 6, fontSize: 14 },
    md: { paddingHorizontal: 16, paddingVertical: 8, fontSize: 16 },
    lg: { paddingHorizontal: 24, paddingVertical: 12, fontSize: 18 }
  }

  const variantStyles = {
    solid: {
      backgroundColor: '$primary',
      color: 'white',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '$primary',
      color: '$primary',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '$primary',
    },
    icon: {
      width: size === 'sm' ? 32 : size === 'md' ? 40 : 48,
      height: size === 'sm' ? 32 : size === 'md' ? 40 : 48,
      padding: 0,
      justifyContent: 'center',
      alignItems: 'center',
    }
  }

  return (
    <TamaguiButton
      borderRadius={8}
      {...sizeStyles[size]}
      {...variantStyles[variant]}
      {...props}
    >
      {children}
    </TamaguiButton>
  )
}
