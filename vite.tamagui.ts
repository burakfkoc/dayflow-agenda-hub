
import { TamaguiPlugin } from '@tamagui/vite-plugin'
import { join } from 'path'

export default function tamaguiPlugin() {
  return TamaguiPlugin({
    components: ['tamagui'],
    config: join(__dirname, 'src/tamagui.config.ts'),
    // Add these options to avoid build issues
    disableExtraction: process.env.NODE_ENV === 'development',
    exclude: ['node_modules'],
  })
}
