import {
   IParallax,
   Parallax as ParallaxParent,
   ParallaxLayer,
   ParallaxProps
} from '@react-spring/parallax'
import { FC, ReactNode, Ref, useState } from 'react'
import styled from 'styled-components'
import Background from '../components/Background'
import Footer from '../components/footer'
import Observable from '../components/Observable'
import Sidebar, { SIDEBAR_WIDTH } from '../components/Sidebar'
import TriangleCanvas from '../components/three/TriangleCanvas'
import Trail from '../components/Trail'
import { big, huge, small } from '../styles/media'

const Parallax: FC<
   {
      subpage?: boolean
      title?: ReactNode
      ref?: Ref<IParallax>
   } & Omit<ParallaxProps, 'title'>
> = ({ title, children, subpage = false, pages = 1, ...props }) => {
   const [observed, setObserved] = useState(false)

   return (
      <ParallaxParent {...props} key={pages} pages={pages}>
         <Background stars={30} />

         <TrailLayer sticky={{ start: 0, end: 9999 }}>
            <Trail />
         </TrailLayer>

         <ParallaxLayer sticky={{ start: 0, end: 0.1 }}>
            <Content subpage={subpage}>{title}</Content>
         </ParallaxLayer>

         <ParallaxLayer offset={1.2} factor={pages - 1.2}>
            <Observable onChange={setObserved} />
         </ParallaxLayer>

         <SidebarLayer subpage={subpage} sticky={{ start: 0, end: 9999 }}>
            <Sidebar minimize={observed}>
               {subpage || <TriangleCanvas height='500px' width='500px' />}
            </Sidebar>
         </SidebarLayer>

         <ParallaxLayer factor={pages - 1} offset={1}>
            <Fadeout>
               <Content subpage={subpage}>{children}</Content>
               <Footer />
            </Fadeout>
         </ParallaxLayer>
      </ParallaxParent>
   )
}

const Fadeout = styled.section`
   width: 100%;
   height: 100%;
   background: linear-gradient(to bottom, transparent, ${p => p.theme.bg} 30%);
   cursor: initial;
`

const TrailLayer = styled(ParallaxLayer)`
   z-index: -1;
`

const SidebarLayer = styled(ParallaxLayer)<{ subpage: boolean }>`
   width: ${SIDEBAR_WIDTH} !important;
   margin-left: ${p => (p.subpage ? 0 : 'auto')};

   @media ${small} {
      z-index: -1;
   }
`

const Content = styled.div<{ subpage: boolean }>`
   background: red;
   @media ${big}, ${huge} {
      max-width: 60vw;
      margin-left: ${p => (p.subpage ? 'auto' : 0)};
   }
`

export default Parallax
