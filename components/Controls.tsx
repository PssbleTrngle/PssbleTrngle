import { useFrame, useThree } from '@react-three/fiber'
import React, { FC, useEffect, useRef } from 'react'
import { Quaternion, Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const INITIAL = {
   pos: new Vector3(-5.7410315329449535, -3.46659086468632, -9.042776520443246),
   quat: new Quaternion(
      -0.11731762862289866,
      0.8788996300839971,
      -0.28058553458730234,
      -0.3674830227818292
   ),
   target: new Vector3(1.0496749711071243, 3.3160550932734916, -2.3418535461885215),
}

const Controls: FC<{ zoom: number; enabled?: boolean }> = ({ zoom, enabled = true }) => {
   const { camera, gl } = useThree()
   const controls = useRef<OrbitControls>()

   useFrame(() => controls.current?.update())

   useEffect(() => {
      camera.zoom = zoom
      camera.updateProjectionMatrix()
   }, [zoom, camera])

   //@ts-ignore
   return (
      <orbitControls
         enabled={enabled}
         enableZoom={false}
         enablePan={false}
         target={INITIAL.target}
         ref={controls}
         args={[camera, gl.domElement]}
         rotateSpeed={0.5}
      />
   )
}

export default Controls
