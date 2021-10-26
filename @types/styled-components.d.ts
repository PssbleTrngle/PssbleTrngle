import 'styled-components'

declare module 'styled-components' {
   interface DefaultTheme {
      bg: string
      sidebar: string
      primary: string
      secondary: string
      text: string
      triangle: {
         primary: string
         hover: string
      }
      link: {
         default: string
         visited: string
      }
   }
}
