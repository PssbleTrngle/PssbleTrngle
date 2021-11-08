import { darken } from 'polished'
import { FC, memo } from 'react'
import styled from 'styled-components'
import Socials from './Socials'

const FOOTER_MARGIN = '80px'
export const FOOTER_HEIGHT = `(5rem + ${FOOTER_MARGIN})`

const Footer: FC = () => {
   return (
      <Style>
         <span />
         <Copyright>&copy; All rights included</Copyright>
         <Socials />
      </Style>
   )
}

const Copyright = styled.span`
   grid-area: copyright;
`

const Style = styled.footer`
   position: absolute;
   cursor: initial;
   width: 100%;
   bottom: 0;
   padding: 0.5rem;
   height: calc(${FOOTER_HEIGHT} - ${FOOTER_MARGIN});
   text-align: center;
   background: ${p => darken(0.1, p.theme.bg)};

   border-top: 5px solid ${p => darken(0.07, p.theme.bg)};

   display: grid;
   justify-content: center;
   align-items: center;
   gap: 1rem;
   grid-template:
      'socials copyright stuff'
      /1fr 10fr 1fr;
`

export default memo(Footer)
