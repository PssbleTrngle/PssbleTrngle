'use client'

import { ThemeProvider } from 'styled-components'
import Head from '../components/Head'
import Sidebar from '../components/Sidebar'
import Trail from '../components/Trail'
import { Globals, StyledComponentsRegistry } from '../lib/styles'
import '../styles/fonts.css'
import '../styles/reset.css'
import dark from '../themes/dark'

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html>
         <body>
            <StyledComponentsRegistry>
               <ThemeProvider theme={dark}>
                  <Head />
                  <Globals />
                  <Trail />
                  <Sidebar>{children}</Sidebar>
               </ThemeProvider>
            </StyledComponentsRegistry>
         </body>
      </html>
   )
}
