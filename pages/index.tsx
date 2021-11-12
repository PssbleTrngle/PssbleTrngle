import { IParallax } from '@react-spring/parallax'
import { readdirSync, readFileSync } from 'fs'
import { debounce, sample } from 'lodash'
import type { GetStaticProps, NextPage } from 'next'
import { basename, join, resolve } from 'path'
import { mix } from 'polished'
import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import styled from 'styled-components'
import yaml from 'yaml'
import Button from '../components/Button'
import Panel, { PanelData } from '../components/Panel'
import Parallax from '../components/Parallax'
import { SIDEBAR_WIDTH } from '../components/Sidebar'
import { big, huge, smartphone } from '../styles/media'

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
   const parallax = useRef<IParallax | null>(null)
   const scrollDown = useCallback(() => parallax.current?.scrollTo(1), [parallax])

   const subsubtitle = useMemo(() => sample(subsubtitles), [subsubtitles])
   const fromMedia = useCallback(() => {
      const { innerHeight } = window
      const horizontalPanels = window.matchMedia(`${big}, ${smartphone}`).matches
      const doublePanels = window.matchMedia(`${big}, ${huge}`).matches
      const mod = (horizontalPanels ? 2 : 1.2) * (doublePanels ? 1 : 1.5)
      return (mod * 300) / innerHeight
   }, [])

   const [panelHeight, onResize] = useReducer((_: number) => fromMedia(), 0)

   const pages = useMemo(
      () => Math.ceil((panels.length * panelHeight + 0.5) * 2) / 2,
      [panels, panelHeight]
   )

   useEffect(() => {
      const callback = debounce(onResize, 750)
      window.addEventListener('resize', callback)
      onResize()
      return () => window.removeEventListener('resize', callback)
   }, [onResize])

   //useEffect(() => {
   //   const isSmartphone = window.matchMedia(`${big}, ${huge}`)
   //   isSmartphone.addEventListener('change', onResize)
   //   onResize(isSmartphone)
   //   return () => isSmartphone.removeEventListener('change', onResize)
   //}, [])

   if (panelHeight === 0) return null

   return (
      <>
         <Parallax
            pages={pages}
            ref={parallax}
            title={
               <Title>
                  <Name>Niklas Widmann</Name>
                  <SubTitle>Web Developer</SubTitle>
                  {subsubtitle && <SubSubTitle>& {subsubtitle}</SubSubTitle>}

                  <Button onClick={scrollDown}>About me</Button>
               </Title>
            }>
            <Panels>
               {panels.map(props => (
                  <Panel {...props} key={props.key} />
               ))}
            </Panels>
         </Parallax>
      </>
   )
}

const Panels = styled.section`
   padding-left: 1rem;
   padding-top: 2rem;
   display: grid;
   grid-template-columns: repeat(1, 1fr);

   margin-bottom: auto;

   @media ${big}, ${huge} {
      grid-template-columns: repeat(2, 1fr);
      width: calc(100% - ${SIDEBAR_WIDTH});
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

export default Home
