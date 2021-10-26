import type { NextPage } from 'next'
import { useCallback } from 'react'
import styled, { useTheme } from 'styled-components'
import Button from '../components/Button'
import Canvas from '../components/Canvas'
import Panel from '../components/Panel'
import Sidebar from '../components/Sidebar'
import Triangle from '../components/Triangle'

const Home: NextPage = () => {
   const scrollDown = useCallback(() => {
      document.documentElement.scrollTo({ top: window.innerHeight })
   }, [])

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

               <Button onClick={scrollDown}>About me</Button>
            </Title>

            <Panels>
               <Panel image='impossible_river.svg' title='Art & Design' />
               <Panel image='code.png' title='My projects' link='/projects' />
               <Panel image='impossible_river.svg' title='My projects' />
               <Panel title='My projects' />
               <Panel title='My projects' />
               <Panel image='impossible_river.svg' title='My projects' />
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

const Title = styled.section`
   height: 100vh;
   padding-top: 30vh;
   padding-left: 5rem;

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
