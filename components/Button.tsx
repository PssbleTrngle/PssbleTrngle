import { invert, transparentize } from 'polished'
import styled, { css } from 'styled-components'

export const ButtonStyle = css`
   background: ${p => p.theme.secondary};
   color: ${p => invert(p.theme.secondary)};
   padding: 1rem 2rem;
   text-align: center;

   transition: 0.1s ease;

   &:hover {
      background: ${p => p.theme.primary};
      color: ${p => p.theme.text};
   }

   :focus {
      box-shadow: 0 0 0 5px ${p => transparentize(0.8, p.theme.primary)};
      outline: 3px solid ${p => p.theme.primary};
   }
`

const Button = styled.button`
   ${ButtonStyle};
`

export default Button
