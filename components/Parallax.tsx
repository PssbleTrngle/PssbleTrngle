import {
   IParallax,
   Parallax as ParallaxParent,
   ParallaxLayer,
   ParallaxProps
} from '@react-spring/parallax'
import { forwardRef, ReactNode, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import Footer from '../components/footer'
import Observable from '../components/Observable'
import { big, huge } from '../styles/media'
import Background from './Background'
import { useSidebar } from './Sidebar'

const Parallax = forwardRef<
   IParallax | null,
   {
      subpage?: boolean
      title?: ReactNode
   } & Omit<ParallaxProps, 'title'>
>(({ title, children, subpage = false, pages = 1, ...props }, ref) => {
   const setSidebar = useSidebar()

   useEffect(() => setSidebar(subpage ? 'none' : 'right'), [subpage, setSidebar])

   const setObserved = useCallback(
      (v: boolean) => {
         if (subpage) return
         if (v) setSidebar('top_right')
         else setSidebar('right')
      },
      [subpage, setSidebar]
   )

   return (
      <ParallaxParent {...props} ref={ref} pages={pages}>
         <Background stars={30} />

         <ParallaxLayer>{title}</ParallaxLayer>

         <ParallaxLayer offset={1.2} factor={pages - 1.2}>
            <Observable onChange={setObserved} />
         </ParallaxLayer>

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

const Content = styled.div<{ subpage: boolean }>`
   @media ${big}, ${huge} {
      max-width: 60vw;
      margin-left: ${p => (p.subpage ? 'auto' : 0)};
   }
`

export default Parallax
