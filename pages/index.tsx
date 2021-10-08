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

          <Button onClick={scrollDown}>Read More</Button>

        </Title>

        <Panel
          image='impossible_river.svg'
          title='Art & Design'
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas lacus et tortor commodo facilisis et ac enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse vel lectus luctus mauris aliquet suscipit. Sed cursus est id diam pretium porta. Pellentesque vestibulum magna eu nulla hendrerit, eu sodales quam tempor.'
        />

      </Content>

    </Style>
  )
}

const Content = styled.section`
  padding-left: 6rem;
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
`

export default Home
