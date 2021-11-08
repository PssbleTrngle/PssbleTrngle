import { FC, memo, useState } from 'react'
import { useTheme } from 'styled-components'
import Canvas, { CanvasProps } from './Canvas'
import Triangle from './Triangle'

const TriangleCanvas: FC<CanvasProps> = props => {
   const theme = useTheme()
   const [hovered, setHovered] = useState(false)
   return (
      <Canvas hovered={hovered && !props.frozen} {...props}>
         <Triangle onHover={setHovered} theme={theme} />
      </Canvas>
   )
}

export default memo(TriangleCanvas)
