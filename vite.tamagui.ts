
import { TamaguiPlugin } from '@tamagui/vite-plugin'
import { join } from 'path'

export default function tamaguiPlugin() {
  return TamaguiPlugin({
    components: ['tamagui'],
    config: join(__dirname, 'src/tamagui.config.ts'),
  })
}
