'use client'

import { darken } from 'polished'
import styled from 'styled-components'
import Head from '../../components/Head'
import { PanelData } from '../../components/Panel'
import { Title } from '../../components/Text'
import Time from '../../components/Time'
import Timeline, { Point } from '../../components/Timeline'

interface Props {
   panels: Array<PanelData & Point>
}

export default function TimelineClient({ panels }: Props) {
   return (
      <>
         <Head title='CV' sidebar='left' />
         <PageTitle>Curriculum Vitae</PageTitle>
         <Wrapper size={panels.length}>
            <Timeline points={panels} />
            {panels.map(({ title, text, time, ...point }, i) => (
               <Panel key={i} {...point}>
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
