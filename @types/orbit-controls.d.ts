import { MutableRefObject } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

declare global {
   namespace JSX {
      interface IntrinsicElements {
         orbitControls: Partial<OrbitControls> & {
            ref: MutableRefObject<OrbitControls | undefined>
            args: ConstructorParameters<typeof OrbitControls>
         }
      }
   }
}
