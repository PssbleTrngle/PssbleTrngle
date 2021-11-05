import NextHead from 'next/head'
import { FC } from 'react'

const Head: FC<{ title?: string }> = ({ title }) => {
   const fullTitle = 'Niklas Widmann' + (title ? ` - ${title}` : '')

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
