import { Dispatch, FC, useEffect, useState } from 'react'
import styled from 'styled-components'

const Observable: FC<{ onChange?: Dispatch<boolean> }> = ({ onChange, children }) => {
   const [element, ref] = useState<HTMLDivElement | null>(null)

   useEffect(() => {
      if (element && onChange) {
         const observer = new IntersectionObserver(entries => {
            const visible = entries.some(e => e.isIntersecting)
            onChange(visible)
         })
         observer.observe(element)
         return () => observer.disconnect()
      }
   }, [element, onChange])

   return <Style ref={ref}>{children}</Style>
}

const Style = styled.div`
   height: 1000%;
`

export default Observable
