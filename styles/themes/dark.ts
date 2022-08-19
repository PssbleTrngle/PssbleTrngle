import { lighten } from 'polished'
import { DefaultTheme } from 'styled-components'

const theme: DefaultTheme = {
   bg: '#3e4247',
   sidebar: lighten(0.2, '#3e4247'),
   text: '#EEE',
   primary: '#ff69b4',
   secondary: '#EEE',
   triangle: {
      primary: '#ffa500',
      hover: '#ff69b4',
   },
   link: {
      default: '#ff69b4',
      visited: '#ff69b4',
   },
}

export default theme
