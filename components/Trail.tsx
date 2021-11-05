import { config, SpringValue, useTrail } from '@react-spring/core'
import { animated } from '@react-spring/web'
import { lighten, mix } from 'polished'
import { FC, useCallback, useEffect } from 'react'
import styled, { keyframes, useTheme } from 'styled-components'

const Trail: FC = () => {
   const [trail, api] = useTrail(5, i => ({
      x: 0,
      y: 0,
      config: i ? config.gentle : { duration: 0 },
   }))

   const mouseMove = useCallback(
      (e: MouseEvent) => {
         api.start({
            x: e.clientX,
            y: e.clientY,
         })
      },
      [api]
   )

   useEffect(() => {
      window.addEventListener('mousemove', mouseMove)
      return () => window.removeEventListener('mousemove', mouseMove)
   }, [mouseMove])

   return (
      <Style>
         {[...trail].reverse().map((props, i) => (
            <Pointer key={i} size={(i + 1) / trail.length} {...props} />
         ))}
      </Style>
   )
}

const Pointer: FC<{
   x: SpringValue<number>
   y: SpringValue<number>
   size: number
}> = ({ x, y, size }) => {
   const theme = useTheme()
   return (
      <animated.div
         style={{
            top: y,
            left: x,
            width: `${size * 2}rem`,
            height: `${size * 2}rem`,
            opacity: size,
         }}
      />
   )
}

const animate = keyframes`
   from { outline-offset: 0.7rem }
   to { outline-offset: 1rem }
`

const Style = styled.div`
   height: 100%;
   width: 100%;

   & > div {
      position: absolute;
      border-radius: 9999px;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 1rem 0 ${p => lighten(0.1, p.theme.primary)};
      background: ${p => mix(0.2, p.theme.primary, p.theme.bg)};
      background: ${p => p.theme.bg};
      background: ${p => mix(0.2, p.theme.bg, lighten(0.05, p.theme.primary))};

      &:last-child {
         //outline: solid 1px ${p => '#FFF4'};
         will-change: outline-offset;
         animation: ${animate} 1s ease-in-out infinite alternate;
      }
   }
`

export default Trail
