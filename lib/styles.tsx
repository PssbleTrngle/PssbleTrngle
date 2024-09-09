'use client'

import { useServerInsertedHTML } from 'next/navigation'
import { darken } from 'polished'
import React, { useState } from 'react'
import { createGlobalStyle, ServerStyleSheet, StyleSheetManager } from 'styled-components'

export function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
   // Only create stylesheet once with lazy initial state
   // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
   const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

   useServerInsertedHTML(() => {
      const styles = styledComponentsStyleSheet.getStyleElement()
      styledComponentsStyleSheet.instance.clearTag()
      return <>{styles}</>
   })

   if (typeof window !== 'undefined') return <>{children}</>

   return (
      <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{children}</StyleSheetManager>
   )
}

export const Globals = createGlobalStyle`

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
