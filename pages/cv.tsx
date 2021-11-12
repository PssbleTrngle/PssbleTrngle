import type { NextPage } from 'next'
import { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import Head from '../components/Head'
import { useSidebar } from '../components/Sidebar'
import { Title } from '../components/Text'
import Timeline, { Point } from '../components/Timeline'

const panels = [
   {
      title: 'Birth',
      text: 'I was born and raised in the jungle, where sticks and stones served as my only nourishment',
   },
   {
      title: 'Birth',
      text: 'I was born and raised in the jungle, where sticks and stones served as my only nourishment',
   },
   {
      title: 'Birth',
      text: 'I was born and raised in the jungle, where sticks and stones served as my only nourishment',
   },
   {
      title: 'Birth',
      text: 'I was born and raised in the jungle, where sticks and stones served as my only nourishment',
   },
]

const CV: NextPage = () => {
   const timeline = useMemo(
      () =>
         panels.map((p, i) => {
            const point = { x: Math.random() * 10 - 5, y: i * 300 }
            return { ...p, ...point, key: i }
         }),
      [panels]
   )

   const setSidebar = useSidebar()
   useEffect(() => setSidebar('none'), [setSidebar])

   return (
      <>
         <Head title='CV' />
         <PageTitle>Curriculum Vitae</PageTitle>
         <Wrapper>
            <Timeline points={timeline} />
            {timeline.map(({ title, text, key, ...point }) => (
               <Panel key={key} {...point}>
                  <h3>{title}</h3>
                  <p>{text}</p>
               </Panel>
            ))}
         </Wrapper>
      </>
   )
}

const Wrapper = styled.section`
   position: relative;
   min-height: 1000px;
`

const Panel = styled.div<Point>`
   position: absolute;
   left: ${p => 50 + p.x}%;
   top: ${p => p.y}px;
   transform: translateX(-50%);

   background: #0001;
   padding: 2rem;
`

const PageTitle = styled(Title)`
   padding: 2rem 0;
`

export default CV
