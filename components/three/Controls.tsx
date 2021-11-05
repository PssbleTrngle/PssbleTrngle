import { AnimationResult, config, SpringValue, useSpring } from '@react-spring/core'
import { extend, useFrame, useThree } from '@react-three/fiber'
import React, { Dispatch, FC, useCallback, useEffect, useRef, useState } from 'react'
import { Event, Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

interface Values {
   pos: [number, number, number]
   quat: [number, number, number, number]
   target: [number, number, number]
}

export const INITIAL: Values = {
   pos: [-5.7410315329449535, -3.46659086468632, -9.042776520443246],
   quat: [-0.11731762862289866, 0.8788996300839971, -0.28058553458730234, -0.3674830227818292],
   target: [1.0496749711071243, 3.3160550932734916, -2.3418535461885215],
}

function useEvent<S, C>(
   v:
      | { addEventListener: (s: S, c: C) => void; removeEventListener: (s: S, c: C) => void }
      | undefined
      | null,
   s: S,
   listener: C
) {
   useEffect(() => {
      if (v) {
         v.addEventListener(s, listener)
         return () => v.removeEventListener(s, listener)
      }
   }, [listener, v, s])
}

const Controls: FC<{
   zoom: number
   enabled?: boolean
   onMoving?: Dispatch<boolean>
}> = ({ zoom, enabled = true, onMoving }) => {
   const { camera, gl } = useThree()
   const ref = useRef<OrbitControls>()
   const controls = ref.current

   useFrame(() => controls?.update())

   const onChange = useCallback(
      ({ value }: AnimationResult<SpringValue<Values>>) => {
         controls?.target.set(...value.target)
         camera.position.set(...value.pos)
         camera.quaternion.set(...value.quat)
      },
      [camera, controls]
   )

   const [moving, setMoving] = useState(false)

   useEffect(() => onMoving?.(moving), [moving, onMoving])

   const [, api] = useSpring(() => ({ ...INITIAL, onChange, config: config.default }), [onChange])
   useEvent(controls, 'start', () => setMoving(true))
   useEvent(controls, 'end', () => setMoving(false))
   useEvent(controls, 'change', (e: Event) => {
      if (moving)
         api.set({
            target: e.target.target.toArray(),
            pos: camera.position.toArray(),
            quat: camera.quaternion.toArray(),
         } as Values)
   })

   useEvent(gl.domElement, 'pointerout', () => api.start(INITIAL))

   useEffect(() => {
      camera.zoom = zoom
      camera.updateProjectionMatrix()
   }, [zoom, camera])

   return (
      <orbitControls
         enabled={enabled}
         enableZoom={false}
         enablePan={false}
         ref={ref}
         target={new Vector3(...INITIAL.target)}
         args={[camera, gl.domElement]}
         rotateSpeed={0.5}
      />
   )
}

export default Controls
