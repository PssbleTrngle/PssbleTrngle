import NextHead from 'next/head'
import { FC, useEffect } from 'react'
import { SidebarPos, useSidebar } from './Sidebar'

const Head: FC<{ title?: string; sidebar?: SidebarPos }> = ({ title, sidebar }) => {
   const fullTitle = 'Niklas Widmann' + (title ? ` - ${title}` : '')

   const setSidebar = useSidebar()
   useEffect(() => {
      if (sidebar) setSidebar(sidebar)
   }, [sidebar, setSidebar])

   return (
      <NextHead>
         <title>{fullTitle}</title>
         <link rel='shortcut icon ' href='/favicon.png' />

         <meta name='viewport' content='initial-scale=1.0, width=device-width' />
         <meta property='og:title' content={fullTitle} />
         <meta property='og:type' content='website' />
      </NextHead>
   )
}

export default Head
