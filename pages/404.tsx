import type { NextPage } from 'next'
import styled, { useTheme } from 'styled-components'
import Canvas from '../components/Canvas'
import { ButtonLink } from '../components/Link'
import { Title } from '../components/Text'
import Triangle from '../components/Triangle'

const NotFound: NextPage = () => (
   <Style>
      <Box>
         <Canvas frozen height='30vh' width='100%'>
            <Triangle theme={useTheme()} />
         </Canvas>
         <Title>404 - Not Found</Title>
         <ButtonLink href='/'>take me home</ButtonLink>
      </Box>
   </Style>
)

const Box = styled.section`
   min-width: 30vh;
   text-align: center;

   ${ButtonLink} {
      margin-top: 0.5rem;
   }
`

const Style = styled.section`
   display: grid;
   justify-content: center;
   align-items: center;
   min-height: 100vh;
`

export default NotFound
