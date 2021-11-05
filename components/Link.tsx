import NextLink, { LinkProps } from 'next/link'
import { FC } from 'react'
import styled, { css } from 'styled-components'
import { ButtonStyle } from './Button'

interface StyleProps {
   underline: 'always' | 'hover' | 'none'
   newTab?: boolean
}

const Style = styled.a<StyleProps>`
   text-decoration: ${p => (p.underline === 'always' ? 'underline' : 'none')};
   color: ${p => p.theme.text};
   cursor: pointer;
   ${p =>
      p.underline === 'hover' &&
      css`
         &:hover {
            text-decoration: underline;
         }
      `}
`

const Link: FC<LinkProps & Partial<StyleProps>> = ({ children, newTab, href, as, ...props }) =>
   newTab ? (
      <Style underline='hover' target='_blank' rel='noopener noreferrer' href={href.toString()} {...props}>
         {children}
      </Style>
   ) : (
      <NextLink {...props} href={href} passHref>
         <Style underline='hover' {...props}>
            {children}
         </Style>
      </NextLink>
   )

export const ButtonLink = styled(Link)`
   ${ButtonStyle};
   display: inline-block;
`

export default Link
