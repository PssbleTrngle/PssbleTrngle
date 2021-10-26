import { Canvas as BaseCanvas } from '@react-three/fiber'
import React, { FC, ReactText, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { useDebouncedCallback } from 'use-debounce'
import Controls, { INITIAL } from './Controls'

function usePolygon(points: number, rand = 0) {
   return useMemo(() => {
      const xy = new Array(points).fill(null).map((_, i) => {
         const radius = 1 - Math.random() * Math.abs(rand)
         const offset = Math.random() * rand
         return [Math.sin, Math.cos]
            .map(fn => fn((i / points + offset) * Math.PI * 2))
            .map(v => v * radius)
            .map(v => ((v + 1) / 2) * 100)
      })
      return `polygon(${xy.map(([x, y]) => `${x}% ${y}%`).join()})`
   }, [points, rand])
}

const Canvas: FC<{ height?: ReactText; width?: ReactText, frozen?: boolean }> = ({ children, frozen, ...props }) => {
   const div = useRef<HTMLDivElement>(null)
   const [zoom, setZoom] = useState(20)

   const updateZoom = useDebouncedCallback(
      () => setZoom((div.current?.offsetHeight ?? 500) / 25),
      100
   )

   useEffect(() => {
      window.addEventListener('resize', updateZoom)
      return () => window.removeEventListener('resize', updateZoom)
   })

   return (
      <Style ref={div} {...props}>
         <BaseCanvas
            orthographic
            camera={{ zoom, position: INITIAL.pos, quaternion: INITIAL.quat }}>
            <ambientLight />
            <pointLight position={[5, -10, 8]} />^{children}
            <Controls enabled={!frozen} zoom={zoom} />
         </BaseCanvas>
      </Style>
   )
}

const Style = styled.div<{ height?: ReactText; width?: ReactText }>`
   height: ${p => p.height};
   width: ${p => p.width};
`

export default Canvas
