import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import type { NextPage } from 'next'
import styled from 'styled-components'
import Background from '../components/Background'
import Footer, { FOOTER_HEIGHT } from '../components/footer'
import { ButtonLink } from '../components/Link'
import { Title } from '../components/Text'
import TriangleCanvas from '../components/three/TriangleCanvas'
import Trail from '../components/Trail'

const NotFound: NextPage = () => (
   <>
      <Parallax pages={1.2}>
         <Background stars={20} />
         <ParallaxLayer sticky={{ start: 0, end: 9999 }}>
            <Trail />
         </ParallaxLayer>
         <ParallaxLayer sticky={{ start: 0, end: 9999 }}>
            <Style>
               <Box>
                  <TriangleCanvas height='30vh' width='100%' />
                  <Title>404 - Not Found</Title>
                  <ButtonLink href='/'>take me home</ButtonLink>
               </Box>
            </Style>
            <Footer />
         </ParallaxLayer>
      </Parallax>
   </>
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
   min-height: calc(100vh - ${FOOTER_HEIGHT});
`

export default NotFound
