import { ParallaxLayer } from '@react-spring/parallax'
import { transparentize } from 'polished'
import { FC, memo, useMemo } from 'react'
import styled from 'styled-components'
import { Offset } from './Panel'

const Background: FC<{ stars: number }> = ({ stars }) => (
   <>
      {new Array(stars).fill(null).map((_, i) => (
         <ParallaxLayer horizontal={i % 2 === 0} key={i} speed={0.1 + i / stars}>
            <Layer>
               <Bubble />
            </Layer>
         </ParallaxLayer>
      ))}
   </>
)

const Layer = styled.div`
   position: relative;
   height: 100vw;
   width: 100vw;
`

const Bubble: FC = () => {
   const x = useMemo(() => Math.random(), [])
   const y = useMemo(() => Math.random(), [])
   const opacify = useMemo(() => Math.random(), [])
   return <Style x={x} y={y} opacity={opacify} />
}

const Style = styled.div<Offset & { opacity: number }>`
   position: absolute;
   border-radius: 9999px;
   background: ${p => transparentize(1 - p.opacity, '#FFF')};
   box-shadow: 0 0 10px 0 ${p => transparentize((1 - p.opacity) * 1.5, '#FFF')};
   padding: 4px;
   top: ${p => p.y * 100}vh;
   left: ${p => p.x * 100}vw;
   width: fit-content;
`

export default memo(Background)
