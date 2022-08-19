import { GraphQLClient } from 'graphql-request'
import { GetProjectsDocument, GetProjectsQuery, ProjectFragment } from './generated'

const token = process.env.GITHUB_TOKEN
const client = new GraphQLClient('https://api.github.com/graphql', {
   headers: { authorization: `Bearer ${token}` },
})

export async function getProjects() {
   const response = await client.request<GetProjectsQuery>(GetProjectsDocument)
   return response.viewer.projectV2 as ProjectFragment
}
