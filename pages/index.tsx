import { sample } from 'lodash'
import type { GetStaticProps, NextPage } from 'next'
import { mix } from 'polished'
import { useCallback, useMemo } from 'react'
import styled, { useTheme } from 'styled-components'
import Button from '../components/Button'
import Canvas from '../components/Canvas'
import Panel, { PanelData } from '../components/Panel'
import Sidebar from '../components/Sidebar'
import Triangle from '../components/Triangle'

export const getStaticProps: GetStaticProps<Props> = async () => {
   const panels: PanelData[] = [
      { image: 'code.png', title: 'My projects', link: '/projects' },
      { image: 'impossible_river.svg', title: 'Art & Design' },
      { title: 'Placeholder' },
      { title: 'Placeholder', image: 'none' },
   ]

   const subsubtitles = [
      'parttime garlic bread enthusiast',
      'hardcore gamer',
      'entitled react enthusiast',
      'cauliflower enjoyer',
      'hobby picnicker',
   ]

   return { props: { panels, subsubtitles } }
}

interface Props {
   panels: PanelData[]
   subsubtitles: string[]
}
const Home: NextPage<Props> = ({ panels, subsubtitles }) => {
   const scrollDown = useCallback(() => {
      document.documentElement.scrollTo({ top: window.innerHeight })
   }, [])

   const subsubtitle = useMemo(() => sample(subsubtitles), [subsubtitles])

   return (
      <Style>
         <Sidebar>
            <Canvas height='500px' width='500px'>
               <Triangle theme={useTheme()} />
            </Canvas>
         </Sidebar>

         <Content>
            <Title>
               <Name>Niklas Widmann</Name>
               <SubTitle>Web Developer</SubTitle>
               {subsubtitle && <SubSubTitle>& {subsubtitle}</SubSubTitle>}

               <Button onClick={scrollDown}>About me</Button>
            </Title>

            <Panels>
               {panels.map((props, i) => (
                  <Panel key={i} {...props} />
               ))}
            </Panels>
         </Content>
      </Style>
   )
}

const Panels = styled.section`
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   background: linear-gradient(to bottom, transparent, ${p => p.theme.bg} 30%);

   @media (max-width: 1400px) {
      grid-template-columns: repeat(1, 1fr);
   }
`

const Content = styled.section`
   position: relative;
   padding-left: 1rem;
`

const Name = styled.h1`
   font-size: 10vh;
   font-family: 'Poppins', sans-serif;
   font-style: italic;
   width: min-content;
   margin-left: -1rem;
`

const SubTitle = styled.h2`
   font-size: 3vh;
`

const SubSubTitle = styled.h3`
   font-size: 1vh;
   margin-top: 0.2em;
   color: ${p => mix(0.7, p.theme.text, p.theme.bg)};
`

const Title = styled.section`
   height: 100vh;
   padding-top: 30vh;
   padding-left: 5rem;

   @media (orientation: portrait) {
      padding-left: 2rem;
   }

   ${Button} {
      margin-top: 2rem;
   }
`

const Style = styled.section`
   min-height: 200vh;
   display: grid;
   justify-content: center;

   grid-template:
      'info sidebar'
      / 2fr 1fr;

   @media (max-width: 2000px) {
      grid-template-columns: 1fr 0;
   }
`

export default Home
