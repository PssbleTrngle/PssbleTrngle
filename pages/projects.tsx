import type { GetStaticProps, NextPage } from 'next'
import { FC, useMemo } from 'react'
import styled from 'styled-components'
import Head from '../components/Head'
import { Title } from '../components/Text'
import type { ItemFragment } from '../graphql/generated'
import { getProjects } from '../graphql/github'

interface Props {
   activeProjects: ItemFragment[]
}

const showStatuses = ['0c5cfdc4']

export const getStaticProps: GetStaticProps<Props> = async () => {
   const projects = await getProjects()
   const activeProjects =
      (projects.items.nodes?.filter(
         it =>
            it?.status?.__typename === 'ProjectV2ItemFieldSingleSelectValue' &&
            showStatuses.includes(it.status.optionId ?? '')
      ) as ItemFragment[]) ?? []
   return { props: { activeProjects } }
}

const Field: FC<{ value?: ItemFragment['status'] }> = ({ value }) => {
   if (value?.__typename !== 'ProjectV2ItemFieldSingleSelectValue') return null
   return <span>{value.name}</span>
}

const Project: FC<ItemFragment> = ({ content, size, type, link }) => {
   const title = useMemo(
      () => (content?.__typename === 'DraftIssue' ? content.title : '???'),
      [content]
   )

   const url = useMemo(
      () => (link?.__typename === 'ProjectV2ItemFieldTextValue' ? link.text : undefined),
      [link]
   )

   const inner = (
      <>
         {title} <Field value={size} /> <Field value={type} />
      </>
   )

   if (url)
      return (
         <a href={`https://github.com/${url}`}>
            <p>{inner}</p>
         </a>
      )
   return <p>{inner}</p>
}

const Projects: NextPage<Props> = ({ activeProjects }) => {
   return (
      <>
         <Head title='Projects' sidebar='left' />
         <Title>Projects</Title>
         <Wrapper>
            {activeProjects.map(item => (
               <Project key={item.id} {...item} />
            ))}
         </Wrapper>
      </>
   )
}

const Wrapper = styled.div`
   position: relative;
   margin-top: 150px;
`

export default Projects
