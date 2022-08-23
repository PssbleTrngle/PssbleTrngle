import { groupBy, omit, uniqBy } from 'lodash'
import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import Head from '../components/Head'
import ProjectCard, { ProjectItemFragment } from '../components/ProjectCard'
import { Title } from '../components/Text'
import { getProjects } from '../graphql/github'

export const enum ProjectStatus {
   IDEA = 'f75ad846',
   STASH = '21158e35',
   OUTDATED = '3d980afb',
   INTEREST = '47fc9ee4',
   IN_PROGRESS = '0c5cfdc4',
   DONE = '98236657',
   ABANDONED = '2fd07228',
}

const shownStatuses: string[] = [
   ProjectStatus.OUTDATED,
   ProjectStatus.INTEREST,
   ProjectStatus.IN_PROGRESS,
]

interface Props {
   projects: ProjectItemFragment[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
   const project = await getProjects()
   const projects = project.items.nodes as ProjectItemFragment[]

   const filtered = projects
      .filter(it => it.status?.optionId !== ProjectStatus.ABANDONED)
      .map(it =>
         shownStatuses.includes(it.status?.optionId ?? '')
            ? it
            : omit(it, ['type', 'status', 'size', 'link'])
      )

   return { props: { projects: filtered } }
}

const Projects: NextPage<Props> = ({ projects }) => {
   const { query, push, pathname } = useRouter()
   const chaos = query['ordered'] === undefined
   const order = useCallback(() => push({ pathname, query: { ordered: true } }), [])

   const shown = useMemo(() => {
      if (chaos) return projects
      return projects.filter(it => !!it.status)
   }, [chaos, projects])

   const columnCount = useMemo(() => uniqBy(shown, it => it.status?.optionId).length, [shown])
   const byStatus = useMemo(() => groupBy(shown, it => it.status?.optionId), [shown])

   const placeOf = useCallback(
      (item: ProjectItemFragment) => {
         if (chaos) return misplaced()
         const option = item.status?.optionId!
         const row = byStatus[option].indexOf(item)
         const column = shownStatuses.indexOf(option)
         return { rotation: 0, x: (column - Math.floor(columnCount / 2)) * 330, y: row * 100 }
      },
      [chaos, columnCount, byStatus]
   )

   const cards = useMemo(
      () =>
         shown.map(item => {
            return (
               <Placed key={item.id} {...placeOf(item)}>
                  <ProjectCard hideLabels={chaos} {...item} />
               </Placed>
            )
         }),
      [chaos, shown, placeOf]
   )

   return (
      <>
         <Head title='Projects' sidebar='left' />
         <Title>Projects</Title>
         <Wrapper>
            {chaos && <Button onClick={order}>Order</Button>}
            <Cards>{cards}</Cards>
         </Wrapper>
      </>
   )
}

const Cards = styled.div`
   position: relative;
   margin-top: 2rem;
   width: 1200px;
   max-width: 100vw;
`

const misplaced = (): Place => ({
   rotation: Math.random() * 30 - 15,
   x: Math.random() * 300 - 150,
   y: Math.random() * 300,
})

interface Place {
   rotation: number
   x: number
   y: number
}

const Placed = styled.div<Place>`
   transform: rotate(${p => p.rotation}deg) translateX(-50%);
   top: ${p => p.y}px;
   left: calc(${p => p.x}px + 50%);
   position: absolute;
   transition: left 0.2s ease, top 0.2s ease;
   //box-shadow: 0 0 0 5px #0002;
`

const Wrapper = styled.div`
   margin-top: 150px;
   display: grid;
   justify-content: center;
`

export default Projects
