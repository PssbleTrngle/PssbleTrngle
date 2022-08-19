import type { AppProps } from 'next/app'
import { darken } from 'polished'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Head from '../components/Head'
import Sidebar from '../components/Sidebar'
import Trail from '../components/Trail'
import '../styles/fonts.css'
import '../styles/reset.css'
import dark from '../styles/themes/dark'

function App({ Component, pageProps }: AppProps) {
   return (
      <ThemeProvider theme={dark}>
         <Head />
         <Globals />
         <Trail />
         <Sidebar>
            <Component {...pageProps} />
         </Sidebar>
      </ThemeProvider>
   )
}

const Globals = createGlobalStyle`

  body, html {
    background: ${p => p.theme.bg};
    color: ${p => p.theme.text};
    font-family: sans-serif;
  }

  section {
    cursor: none;
  }

  ::selection {
    background: ${p => p.theme.primary};
  }

  ::-webkit-scrollbar {
    width: 0;
    display: none;
    opacity: 0;
  }

  ::-webkit-scrollbar-track {
    background: linear-gradient(
        transparent,
        ${p => darken(0.02, p.theme.bg)} 5%,
        ${p => darken(0.02, p.theme.bg)} 95%,
        transparent
    );
  }

  ::-webkit-scrollbar-thumb {
    background: ${p => darken(0.1, p.theme.bg)};
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${p => darken(0.07, p.theme.bg)};
  }

`

export default App
