import { FC, useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'

function createBlob() {
   const start = 0
   const end = 0

   const amount = 6
   const points = new Array(amount).fill(null).map((_, i) => {
      const x = Math.random() * 10 + 5 * (i % 2)
      const y = ((i + 1) / amount) * 100
      return { x, y }
   })

   const tangents = points.map((p, i) => {
      const prev = points[i - 1] ?? { ...p, y: p.y - 10 }
      const next = points[i + 1] ?? { ...p, y: p.y + 10 }
   })

   const curves = points.map(({ x, y }, i) => {
      return `C${x},${y},${x},${y},${x},${y}`
   })

   return `
      M100,0
      L${start},0
      ${curves.join('')}
      L${end},100
      L100,100
      Z
   `
}

const smallBlob = {
   transform: 'translate(30 20) scale(0.3,0.3)',
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
   transform: 'translate(45 55) scale(1,1)',
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
      Z`,
}

const Sidebar: FC = ({ children }) => {
   const { sidebar, bg } = useTheme()
   const [small, setSmall] = useState(false)
   const blob = useMemo(() => (small ? smallBlob : bigBlob), [small])

   useEffect(() => {
      const listener = () => setSmall(document.documentElement.scrollTop >= 200)
      window.addEventListener('scroll', listener)
      return () => window.removeEventListener('scroll', listener)
   })

   return (
      <Style>
         {/*<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
         <path
            fill={sidebar}
            d={path}
         />
      </svg>*/}
         <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
            <path fill={sidebar} {...blob} />
         </svg>
         {children}
      </Style>
   )
}

const Style = styled.section`
   position: fixed;
   height: 100%;
   grid-area: sidebar;
   right: 0;
   width: 600px;

   svg {
      position: absolute;
      height: 100%;
      filter: drop-shadow(0 0 20px #0002);

      path {
         transition: 1s ease;
      }
   }
`

export default Sidebar
