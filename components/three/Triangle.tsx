import { animated, useSpring } from '@react-spring/three'
import React, { Dispatch, FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import { DefaultTheme } from 'styled-components'
import { Mesh, Object3D } from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const loader = new OBJLoader()

function useModel(name: string) {
   const [model, setModel] = useState<Object3D>()

   const path = useMemo(() => `object/${name}.obj`, [name])

   useEffect(() => {
      loader.loadAsync(path).then(setModel).catch(console.error)
   }, [path])

   return model
}

const Triangle: FC<{
   theme: DefaultTheme
   onHover?: Dispatch<boolean>
}> = ({ theme, onHover }) => {
   const ref = useRef<Mesh>()
   const [hovered, setHover] = useState(false)

   const { primary, hover } = theme.triangle
   const { color } = useSpring({
      color: hovered ? hover : primary,
      config: { duration: 100 },
   })

   useEffect(() => onHover?.(hovered), [hovered, onHover])

   const model = useModel('triangle')
   if (!model) return null

   const [triangle] = model.children as [Mesh]

   return (
      <animated.mesh
         ref={ref}
         onPointerOver={() => setHover(true)}
         onPointerOut={() => setHover(false)}
         args={[triangle.geometry]}>
         <animated.meshStandardMaterial attach='material' color={color} />
      </animated.mesh>
   )
}

export default memo(Triangle)
