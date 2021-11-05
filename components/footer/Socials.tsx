import { Curseforge } from '@styled-icons/simple-icons/Curseforge'
import { Github } from '@styled-icons/simple-icons/Github'
import { Linkedin } from '@styled-icons/simple-icons/Linkedin'
import { StyledIconBase } from '@styled-icons/styled-icon'
import { FC } from 'react'
import styled from 'styled-components'
import Link from '../Link'

const Socials: FC = () => (
   <Icons>
      <Link newTab href='https://github.com/PssbleTrngle'>
         <Github />
      </Link>
      <Link newTab href='https://www.curseforge.com/members/possible_triangle/projects'>
         <Curseforge />
      </Link>
      <Link newTab href='https://www.linkedin.com/in/niklas-widmann-22b630221'>
         <Linkedin />
      </Link>
   </Icons>
)

const Icons = styled.div`
   display: grid;
   grid-auto-flow: column;
   gap: 1rem;
   padding: 1rem;
   justify-content: center;
   align-items: center;
   grid-area: socials;

   ${StyledIconBase} {
      height: 2rem;
      transition: color 0.2s ease;
      &:hover {
         color: ${p => p.theme.primary};
      }
   }
`

export default Socials
