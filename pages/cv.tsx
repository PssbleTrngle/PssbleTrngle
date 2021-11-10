import type { NextPage } from 'next'
import styled from 'styled-components'
import Head from '../components/Head'
import Parallax from '../components/Parallax'
import { Title } from '../components/Text'

const NotFound: NextPage = () => (
   <>
      <Head title='CV' />
      <Parallax subpage pages={1.5} title={<PageTitle>Curriculum Vitae</PageTitle>}>
         <p>Test</p>
      </Parallax>
   </>
)

const PageTitle = styled(Title)`
   padding: 2rem 0;
`

export default NotFound
