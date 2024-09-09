import NextLink, { LinkProps } from 'next/link'
import { FC, PropsWithChildren } from 'react'
import styled, { css } from 'styled-components'
import { ButtonStyle } from './Button'

interface StyleProps {
   underline: 'always' | 'hover' | 'none'
   newTab?: boolean
}

const Style = styled(NextLink)<StyleProps>`
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

const Link: FC<PropsWithChildren<LinkProps & Partial<StyleProps>>> = ({
   children,
   newTab,
   href,
   as,
   ...props
}) =>
   newTab ? (
      <Style underline='hover' target='_blank' rel='noopener noreferrer' href={href} {...props}>
         {children}
      </Style>
   ) : (
      <Style underline='hover' href={href} {...props}>
         {children}
      </Style>
   )

export const ButtonLink = styled(Link)`
   ${ButtonStyle};
   display: inline-block;
`

export default Link
