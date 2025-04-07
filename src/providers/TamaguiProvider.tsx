
import { TamaguiProvider as Provider } from 'tamagui'
import config from '../tamagui.config'

interface TamaguiProviderProps {
  children: React.ReactNode
}

export const TamaguiProvider: React.FC<TamaguiProviderProps> = ({ children }) => {
  return (
    <Provider config={config} defaultTheme="light">
      {children}
    </Provider>
  )
}
