import { FC, useMemo } from 'react'
import styled from 'styled-components'

export interface Point {
   x: number
   y: number
}

const Timeline: FC<{ points: Point[] }> = ({ points }) => {
   const lines = useMemo(() => points.slice(1).map((p, i) => [points[i], p]), [points])

   return (
      <Style>
         {points.map(({ x, y }, i) => (
            <circle key={i} cx={`${50 + x}%`} cy={y} r={3} fill='#FFF' />
         ))}
         {lines.map(([p1, p2], i) => (
            <Line
               key={i}
               x1={`${50 + p1.x}%`}
               x2={`${50 + p2.x}%`}
               y1={p1.y}
               y2={p2.y}
               stroke='#FFF'
            />
         ))}
      </Style>
   )
}

const Style = styled.svg`
   position: absolute;
   cursor: default;
   height: 100%;
   width: 100%;
   top: 0;
   left: 0;
`

const Line = styled.line``

export default Timeline
