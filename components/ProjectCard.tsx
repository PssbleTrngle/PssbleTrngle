import { mix } from 'polished'
import { FC, useMemo } from 'react'
import styled from 'styled-components'
import type { SelectFragment, TextFragment } from '../graphql/generated'
import { ItemFragment } from '../graphql/generated'
import Emoji from './Emoji'
import Link from './Link'

export interface ProjectItemFragment
   extends Omit<ItemFragment, 'status' | 'type' | 'size' | 'link'> {
   status?: SelectFragment
   type?: SelectFragment
   size?: SelectFragment
   link?: TextFragment
}

const ProjectCard: FC<
   ProjectItemFragment & {
      hideLabels?: boolean
   }
> = ({ content, size, type, link, hideLabels }) => {
   const title = useMemo(
      () => (content?.__typename === 'DraftIssue' ? content.title : '???'),
      [content]
   )

   const url = link?.text

   const inner = (
      <Style>
         <Title>
            <Visibility public={!!url} /> {title}
         </Title>
         {hideLabels || (
            <Labels>
               <Label>{type?.name}</Label>
               <Label>{size?.name}</Label>
            </Labels>
         )}
      </Style>
   )

   if (url)
      return (
         <Link newTab underline='none' href={`https://github.com/${url}`}>
            {inner}
         </Link>
      )

   return inner
}

const Labels = styled.p`
   margin-top: 1em;
`

const Title = styled.h4``

const Visibility: FC<{ public: boolean }> = props => {
   const icon = props.public ? '🌍' : '🔒'
   const tooltip = props.public ? 'Public' : 'Private'
   return <span title={tooltip}>{icon}</span>
}

const Label = styled(Emoji)`
   background: ${p => mix(0.3, '#AAA', p.theme.bg)};
   padding: 0.2rem 0.5rem;
   margin-right: 0.5rem;
   border-radius: 9999px;
`

const Style = styled.div`
   padding: 1rem;
   background: ${p => mix(0.1, '#AAA', p.theme.bg)};
   margin: 1rem;
   width: 300px;
`

export default ProjectCard
