import { useRouter } from 'next/dist/client/router'
import { createContext, Dispatch, FC, useContext, useMemo, useReducer } from 'react'
import { animated, useSpring } from 'react-spring'
import styled, { css, useTheme } from 'styled-components'
import { small } from '../styles/media'
import TriangleCanvas from './three/TriangleCanvas'

export const SIDEBAR_WIDTH = '600px'

const smallBlob = {
   transform: 'translate(130 20) scale(0.3,0.3)',
   offset: [130, 20, 0.3, 0.3],
   strokeWidth: 0,
   d: `
      M48.9,-61.8
      C64.1,-56.3,77.5,-42.9,83.2,-26.7
      C88.9,-10.5,86.8,8.5,80.6,25.8
      C74.5,43.1,64.3,58.8,50.2,69.9
      C36,81,18,87.5,0,87.6
      C-18.1,87.6,-36.1,81.1,-47.2,69
      C-58.3,56.9,-62.4,39.3,-68.3,22
      C-74.3,4.7,-82,-12.2,-78.1,-25.7
      C-74.1,-39.1,-58.5,-49,-43.5,-54.6
      C-28.5,-60.1,-14.3,-61.4,1.3,-63.2
      C16.9,-65,33.7,-67.3,48.9,-61.8
      Z
   `,
}

const bigBlob = {
   ...smallBlob,
   transform: 'translate(140 55) scale(1,1)',
   offset: [140, 55, 1, 1],
   strokeWidth: 10,
   d: `
      M39.3,-59.2
      C48.9,-47.1,53.2,-32.9,54,-20
      C54.8,-7.1,52,4.4,49.5,17.3
      C46.9,30.1,44.7,44.3,36.5,52
      C28.3,59.8,14.1,61.1,2.1,58.3
      C-10,55.4,-19.9,48.3,-23.6,39
      C-27.2,29.8,-24.4,18.4,-24.1,10
      C-23.9,1.6,-26.1,-3.8,-30.9,-16.5
      C-35.6,-29.2,-43,-49.2,-38.3,-62.9
      C-33.5,-76.6,-16.8,-83.9,-1,-82.6
      C14.9,-81.3,29.7,-71.3,39.3,-59.2
      Z
   `,
}

const leftBlob = {
   ...smallBlob,
   transform: 'translate(-40 15) scale(0.3,0.3)',
   offset: [-40, 15, 0.3, 0.3],
   d: `
      M53.8,-74.1
      C68.9,-63.1,79.7,-46.3,79.2,-29.9
      C78.7,-13.6,66.9,2.1,58.6,16.3
      C50.2,30.5,45.3,43.1,36.1,53.6
      C27,64.1,13.5,72.4,0.7,71.5
      C-12.1,70.5,-24.2,60.2,-34,50
      C-43.9,39.7,-51.5,29.4,-60.9,16.1
      C-70.4,2.7,-81.8,-13.8,-79.9,-27.8
      C-77.9,-41.9,-62.6,-53.4,-47,-64.2
      C-31.5,-75,-15.7,-85.1,1.8,-87.6
      C19.4,-90.1,38.7,-85,53.8,-74.1
      Z
   `,
}
const transitionBlob = {
   ...leftBlob,
   transform: 'translate(40 20) scale(0.5,1)',
   offset: [40, 20, 0.5, 1],
}

export type SidebarPos = 'right' | 'left' | 'top_right' | 'none'

const CTX = createContext<Dispatch<SidebarPos>>(() => console.warn('Sidebar Provider missing'))

export function useSidebar() {
   return useContext(CTX)
}

function getBlob(pos: SidebarPos) {
   switch (pos) {
      case 'left':
         return leftBlob
      case 'right':
         return bigBlob
      default:
         return smallBlob
   }
}

const Sidebar: FC = ({ children }) => {
   const theme = useTheme()
   const router = useRouter()

   const startPos = useMemo<SidebarPos>(() => {
      if (router.pathname === '/') return 'right'
      else return 'left'
   }, [router])
   const [{ offset, ...props }, api] = useSpring(() => getBlob(startPos))

   const [pos, set] = useReducer((previous: SidebarPos, value: SidebarPos) => {
      if (previous === value) return previous
      const blob = getBlob(value)
      const withTransition = [previous, value].includes('left')
      api.start({
         to: async next => {
            if (withTransition) await next({ ...transitionBlob, config: { duration: 200 } })
            await next(blob)
         },
      })
      return value
   }, startPos)

   return (
      <CTX.Provider value={set}>
         <Fixed>
            <SVG viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
               <animated.path
                  fill={theme.sidebar}
                  {...props}
                  transform={offset.to((x, y, sx, sy) => `translate(${x},${y}) scale(${sx},${sy})`)}
               />
            </SVG>
            <Style pos={pos}>
               <animated.section
                  style={offset.to(
                     (x, y) => `
                     position: absolute,
                     left: ${x}%,
                     top: ${y}%,
                  `
                  )}>
                  <TriangleCanvas height='500px' width='500px' />
               </animated.section>
            </Style>
         </Fixed>
         {children}
      </CTX.Provider>
   )
}

const behind = css`
   z-index: 0;
`

const old = css<{ pos: SidebarPos }>`
   top: ${p => (p.pos === 'left' ? `calc(${SIDEBAR_WIDTH} * -0.2)` : 0)};
   left: ${p =>
      p.pos === 'left' ? `calc(${SIDEBAR_WIDTH} * -0.2)` : `calc(100vw - ${SIDEBAR_WIDTH})`};
`

const Style = styled.div<{ pos?: SidebarPos }>`
   position: fixed;
   z-index: 100;
   height: 100%;
   width: ${SIDEBAR_WIDTH} !important;
   transition: left 0.5s ease, top 0.5s ease;

   ${p => p.pos === 'none' && `display: none`};
   ${p => p.pos === 'left' && behind};

   @media ${small} {
      ${behind}
   }
`

const SVG = styled.svg`
   height: 100%;
   width: 100%;
   cursor: none;
   filter: drop-shadow(0 0 20px #0002);

   path {
      cursor: default;
   }
`

const Fixed = styled.section`
   position: fixed;
   height: 100vh;
   width: 100vw;
`

export default Sidebar
