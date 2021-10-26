import NextLink, { LinkProps } from 'next/link'
import { FC } from 'react'
import styled from 'styled-components'
import { ButtonStyle } from './Button'

const Link: FC<LinkProps> = ({ children, href, ...props }) => (
   <NextLink {...props} href={href} passHref>
      <a {...props}>{children}</a>
   </NextLink>
)

export const ButtonLink = styled(Link)`
   ${ButtonStyle};
`

export default Link
