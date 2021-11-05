import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax'
import { readdirSync, readFileSync } from 'fs'
import { sample } from 'lodash'
import type { GetStaticProps, NextPage } from 'next'
import { basename, join, resolve } from 'path'
import { mix } from 'polished'
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import yaml from 'yaml'
import Background from '../components/Background'
import Button from '../components/Button'
import Footer, { FOOTER_HEIGHT } from '../components/footer'
import Observable from '../components/Observable'
import Panel, { PanelData } from '../components/Panel'
import Sidebar, { SIDEBAR_WIDTH } from '../components/Sidebar'
import TriangleCanvas from '../components/three/TriangleCanvas'
import Trail from '../components/Trail'
import { big, huge, small, smartphone } from '../styles/media'

export const getStaticProps: GetStaticProps<Props> = async () => {
   const folder = resolve('panels')
   const files = readdirSync(folder).map(f => join(folder, f))

   const panels: PanelData[] = files.map(file => {
      const content = readFileSync(file).toString()
      return { ...yaml.parse(content), key: basename(file) }
   })

   const subsubtitles = [
      'parttime garlic bread enthusiast',
      'hardcore gamer',
      'entitled react enthusiast',
      'cauliflower enjoyer',
      'hobby picnicker',
      'SSO supporter',
      'Wannabe Fullstack Developer',
   ]

   return { props: { panels, subsubtitles } }
}

interface Props {
   panels: PanelData[]
   subsubtitles: string[]
}
const Home: NextPage<Props> = ({ panels, subsubtitles }) => {
   const theme = useTheme()
   const parallax = useRef<IParallax | null>(null)
   const scrollDown = useCallback(() => parallax.current?.scrollTo(1), [parallax])

   const subsubtitle = useMemo(() => sample(subsubtitles), [subsubtitles])
   const fromMedia = useCallback((e: { matches: boolean }) => (e.matches ? 1.5 : 1) as number, [])
   const [panelHeight, onResize] = useReducer(
      (_: number, e: { matches: boolean }) => fromMedia(e),
      0
   )

   const pages = useMemo(
      () => Math.floor((panels.length / 2) * panelHeight) + 0.5,
      [panels, panelHeight]
   )

   useEffect(() => {
      const isSmartphone = window.matchMedia(smartphone)
      isSmartphone.addEventListener('change', onResize)
      onResize(isSmartphone)
      return () => isSmartphone.removeEventListener('change', onResize)
   }, [])

   const [observed, setObserved] = useState(false)

   if (panelHeight === 0) return null

   return (
      <>
         <Parallax pages={pages} ref={parallax}>
            <Background stars={30} />

            <TrailLayer sticky={{ start: 0, end: 9999 }}>
               <Trail />
            </TrailLayer>

            <ParallaxLayer sticky={{ start: 0, end: 0.1 }}>
               <Title>
                  <Name>Niklas Widmann</Name>
                  <SubTitle>Web Developer</SubTitle>
                  {subsubtitle && <SubSubTitle>& {subsubtitle}</SubSubTitle>}

                  <Button onClick={scrollDown}>About me</Button>
               </Title>
            </ParallaxLayer>

            <ParallaxLayer offset={1.2} factor={pages - 1.2}>
               <Observable onChange={setObserved} />
            </ParallaxLayer>

            <SidebarLayer sticky={{ start: 0, end: 9999 }}>
               <Sidebar minimize={observed}>
                  <TriangleCanvas height='500px' width='500px' />
               </Sidebar>
            </SidebarLayer>

            <ParallaxLayer factor={pages - 1} offset={1}>
               <Fadeout>
                  <Panels>
                     {panels.map(props => (
                        <Panel {...props} key={props.key} />
                     ))}
                  </Panels>
                  <Footer />
               </Fadeout>
            </ParallaxLayer>
         </Parallax>
      </>
   )
}

const TrailLayer = styled(ParallaxLayer)`
   z-index: -1;
`

const SidebarLayer = styled(ParallaxLayer)`
   width: ${SIDEBAR_WIDTH} !important;
   margin-left: auto;

   @media ${small} {
      z-index: -1;
   }
`

const Fadeout = styled.section`
   width: 100%;
   height: 100%;
   background: linear-gradient(to bottom, transparent, ${p => p.theme.bg} 30%);
   cursor: initial;
`

const Panels = styled.section`
   padding-left: 1rem;
   padding-top: 2rem;
   display: grid;
   grid-template-columns: repeat(1, 1fr);

   margin-bottom: auto;

   @media ${big}, ${huge} {
      grid-template-columns: repeat(2, 1fr);
      width: calc(100% - ${SIDEBAR_WIDTH});
      max-width: 60vw;
   }
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
   padding-left: 6rem;

   @media ${smartphone} {
      padding-left: 2rem;
   }

   ${Button} {
      margin-top: 2rem;
   }
`

const Style = styled.section`
   height: calc(200vh - ${FOOTER_HEIGHT});
   display: grid;
   justify-content: center;

   grid-template:
      'info sidebar'
      / 1fr 0;

   @media ${huge} {
      grid-template-columns: 2fr 1fr;
   }
`

export default Home
