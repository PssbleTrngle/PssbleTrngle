import {
   IParallax,
   Parallax as ParallaxParent,
   ParallaxLayer,
   ParallaxProps
} from '@react-spring/parallax'
import { forwardRef, ReactNode, useState } from 'react'
import styled, { StyledConfig } from 'styled-components'
import Footer from '../components/footer'
import Observable from '../components/Observable'
import Sidebar, { SIDEBAR_WIDTH } from '../components/Sidebar'
import TriangleCanvas from '../components/three/TriangleCanvas'
import Trail from '../components/Trail'
import { big, huge, small } from '../styles/media'

const Parallax = forwardRef<
   IParallax | null,
   {
      subpage?: boolean
      title?: ReactNode
   } & Omit<ParallaxProps, 'title'>
>(({ title, children, subpage = false, pages = 1, ...props }, ref) => {
   const [observed, setObserved] = useState(false)

   return (
      <ParallaxParent {...props} ref={ref} pages={pages}>
        
         <TrailLayer sticky={{ start: 0, end: pages }}>
            <Trail />
         </TrailLayer>

         <ParallaxLayer sticky={{ start: 0, end: 0.1 }}>{title}</ParallaxLayer>

         <ParallaxLayer offset={1.2} factor={pages - 1.2}>
            <Observable onChange={setObserved} />
         </ParallaxLayer>

         <SidebarLayer subpage={subpage} sticky={{ start: 0, end: pages }}>
            <Sidebar minimize={observed}>
               {subpage || <TriangleCanvas height='500px' width='500px' />}
            </Sidebar>
         </SidebarLayer>

         <ParallaxLayer factor={pages - 1} offset={1}>
            <Fadeout>
               {children}
               <Footer />
            </Fadeout>
         </ParallaxLayer>
      </ParallaxParent>
   )
})

const Fadeout = styled.section`
   width: 100%;
   height: 100%;
   background: linear-gradient(to bottom, transparent, ${p => p.theme.bg} 30%);
   cursor: initial;
`

const TrailLayer = styled(ParallaxLayer)`
   z-index: -1;
`
const config: StyledConfig = { shouldForwardProp: p => p !== 'subpage' }

const SidebarLayer = styled(ParallaxLayer).withConfig(config)<{ subpage: boolean }>`
   width: ${SIDEBAR_WIDTH} !important;
   margin-left: ${p => (p.subpage ? 0 : 'auto')};

   @media ${small} {
      z-index: -1;
   }
`

const Content = styled.div.withConfig(config)<{ subpage: boolean }>`
   @media ${big}, ${huge} {
      max-width: 60vw;
      margin-left: ${p => (p.subpage ? 'auto' : 0)};
   }
`

export default Parallax
