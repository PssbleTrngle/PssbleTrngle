import { DateTime } from 'luxon'
import type { GetStaticProps, NextPage } from 'next'
import { darken } from 'polished'
import { useMemo } from 'react'
import styled from 'styled-components'
import Head from '../components/Head'
import { PanelData } from '../components/Panel'
import { Title } from '../components/Text'
import Time from '../components/Time'
import Timeline, { Point } from '../components/Timeline'
import parseYAML from '../lib/static'

interface Props {
   panels: PanelData[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
   const panels = parseYAML<PanelData>('timeline').sort((a, b) => {
      const [ta, tb] = [a, b].map(({ time }) => time?.[0] && DateTime.fromObject(time[0]))
      if (!ta || !tb) return 0
      return ta.diff(tb).toMillis()
   })

   return { props: { panels } }
}

const CV: NextPage<Props> = ({ panels }) => {
   const timeline = useMemo(
      () =>
         panels.map((p, i) => {
            const point = { x: Math.random() * 10 - 5, y: i * 300 }
            return { ...p, ...point, key: i }
         }),
      [panels]
   )

   return (
      <>
         <Head title='CV' sidebar='left' />
         <PageTitle>Curriculum Vitae</PageTitle>
         <Wrapper size={timeline.length}>
            <Timeline points={timeline} />
            {timeline.map(({ title, text, key, time, ...point }) => (
               <Panel key={key} {...point}>
                  <h3>{title}</h3>
                  {time && <Time dates={time} />}
                  <p>{text}</p>
               </Panel>
            ))}
         </Wrapper>
      </>
   )
}

const Wrapper = styled.div<{ size: number }>`
   position: relative;
   min-height: ${p => 300 * p.size}px;
   margin-top: 150px;
`

const Panel = styled.div<Point>`
   position: absolute;
   left: ${p => 50 + p.x}%;
   top: ${p => p.y}px;
   transform: translate(-50%, -50%);
   cursor: default;

   display: grid;
   gap: 1rem;

   background: ${p => darken(0.05, p.theme.bg)};
   padding: 2rem;
`

const PageTitle = styled(Title)`
   margin-bottom: 2rem;
`

export default CV
