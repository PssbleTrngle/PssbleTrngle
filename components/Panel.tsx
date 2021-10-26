import Image from 'next/image'
import { LinkProps } from 'next/link'
import { lighten } from 'polished'
import { FC, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { ButtonLink } from './Link'

const LOREM =
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas lacus et tortor commodo facilisis et ac enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse vel lectus luctus mauris aliquet suscipit. Sed cursus est id diam pretium porta. Pellentesque vestibulum magna eu nulla hendrerit, eu sodales quam tempor.'

interface Offset {
   x: number
   y: number
}

const Offsets: Offset[] = [
   { x: +3, y: -4 },
   { x: +3, y: +3 },
   { x: -3, y: +3 },
   { x: -3, y: -4 },
]

function useOffset(): Offset {
   return useMemo<Offset>(
      () => ({
         x: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
         y: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
      }),
      []
   )
}

const Panel: FC<{
   image?: string
   text?: string
   title?: string
   link?: LinkProps['href']
}> = ({ children, image, text = LOREM, title, link }) => {
   const offset = useOffset()

   return (
      <Style offset={offset}>
         {image && (
            <ImageBox offset={offset}>
               <Image src={`/images/${image}`} alt={title} layout='fill' />
            </ImageBox>
         )}
         <Text offset={image ? offset : undefined}>
            {title && <h3>{title}</h3>}
            {text && <p>{text}</p>}
            {link && <ButtonLink href={link}>Read More</ButtonLink>}
            {children}
         </Text>
      </Style>
   )
}

const Box = css`
   background: ${p => lighten(0.2, p.theme.bg)};
   border-radius: 10px;
   box-shadow: 1px 2px 20px 0 #0002;
   padding: 2rem;
`

const ImageBox = styled.div<{ offset: Offset }>`
   ${Box};
   overflow: hidden;
   user-select: none;
   background: ${p => lighten(0.1, p.theme.bg)};
   position: absolute;
   width: 300px;
   height: 300px;

   left: ${p => (p.offset.x < 0 ? `${p.offset.x * 15}px` : null)};
   right: ${p => (p.offset.x > 0 ? `${p.offset.x * -15}px` : null)};
   top: ${p => (p.offset.y > 0 ? `${p.offset.y * -15}px` : null)};
   bottom: ${p => (p.offset.y < 0 ? `${p.offset.y * 15}px` : null)};

   img {
      object-fit: cover;
   }
`

const Text = styled.div<{ offset?: Offset }>`
   ${p =>
      p.offset &&
      css`
         padding-left: ${p.offset.x < 0 ? 300 : 0}px;
         padding-right: ${p.offset.x > 0 ? 300 : 0}px;

         @media (min-width: 1400px) and (max-width: 2000px), (max-width: 800px) {
            padding: 0;
            padding-bottom: ${p.offset.y < 0 ? 300 : 0}px;
            padding-top: ${p.offset.y > 0 ? 300 : 0}px;
         }
      `}

   display: grid;
   gap: 1rem;
`

const Style = styled.div<{ offset: Offset }>`
   ${Box};
   position: relative;
   min-height: 300px;
   max-width: 1000px;
   //margin: 2rem 3rem;
   //margin-bottom: 4rem;

   margin-left: ${p => `${(p.offset.x < 0 ? 0 : 4) + 1 - p.offset.x}rem`};
   margin-right: ${p => `${(p.offset.x > 0 ? 0 : 4) + 1 + p.offset.x}rem`};
   margin-top: ${p => `${(p.offset.y > 0 ? 0 : 4) + 1 + p.offset.y}rem`};
   margin-bottom: ${p => `${(p.offset.y < 0 ? 0 : 4) + 1 - p.offset.y}rem`};
`

export default Panel
