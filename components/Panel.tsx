import Image from 'next/image'
import { lighten } from 'polished'
import { FC, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import { big, smartphone } from '../styles/media'
import { ButtonLink } from './Link'
import Observable from './Observable'

export interface PanelData {
   image?: string
   text?: string
   title?: string
   link?: string
   key: string
}

const LOREM =
   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas lacus et tortor commodo facilisis et ac enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse vel lectus luctus mauris aliquet suscipit. Sed cursus est id diam pretium porta. Pellentesque vestibulum magna eu nulla hendrerit, eu sodales quam tempor.'

export interface Offset {
   x: number
   y: number
}

export function useOffset(): Offset {
   return useMemo<Offset>(
      () => ({
         x: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
         y: (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
      }),
      []
   )
}

const Panel: FC<PanelData> = ({ children, image, text = LOREM, title, link }) => {
   const offset = useOffset()
   const [visible, setVisible] = useState(false)

   return (
      <Style visible={visible} offset={offset}>
         <Observable onChange={setVisible}>
            {image && (
               <ImageBox offset={offset}>
                  <Image src={`/images/${image}`} alt={title} layout='fill' />
               </ImageBox>
            )}
            <Text offset={image ? offset : undefined}>
               {title && <h3>{title}</h3>}
               {text && <p>{text}</p>}
               {link && (
                  <ButtonLink newTab={link.startsWith('http')} href={link}>
                     Read More
                  </ButtonLink>
               )}
               {children}
            </Text>
         </Observable>
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
   cursor: default;
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

      &::after,
      &::before {
         content: '';
         position: absolute;
      }

      &::before {
         top: 0;
         left: 0;
         height: 100%;
         width: 100%;
         background: ${p => lighten(0.1, p.theme.bg)};
      }

      &::after {
         content: 'Image Unavaibable';
         top: 50%;
         left: 50%;
         transform: translate(-50%, -50%);
         font-style: italic;
      }
   }
`

const Text = styled.div<{ offset?: Offset }>`
   transition: padding 0.5s ease;
   cursor: text;

   ${p =>
      p.offset &&
      css`
         padding-left: ${p.offset.x < 0 ? 300 : 0}px;
         padding-right: ${p.offset.x > 0 ? 300 : 0}px;

         @media ${big}, ${smartphone} {
            padding: 0;
            padding-bottom: ${p.offset.y < 0 ? 300 : 0}px;
            padding-top: ${p.offset.y > 0 ? 300 : 0}px;
         }
      `}

   display: grid;
   gap: 1rem;
`

const Style = styled.div<{ offset: Offset; visible: boolean }>`
   ${Box};
   cursor: default;
   position: relative;
   min-height: 300px;
   max-width: 1000px;
   //margin: 2rem 3rem;
   //margin-bottom: 4rem;

   transition: transform 1s ease, opacity 0.2s linear;
   transform: translateY(${p => (p.visible ? 0 : 20)}%);
   opacity: ${p => (p.visible ? 1 : 0)};

   margin-left: ${p => `${(p.offset.x < 0 ? 0 : 4) + 1 - p.offset.x}rem`};
   margin-right: ${p => `${(p.offset.x > 0 ? 0 : 4) + 1 + p.offset.x}rem`};
   margin-top: ${p => `${(p.offset.y > 0 ? 0 : 4) + 1 + p.offset.y}rem`};
   margin-bottom: ${p => `${(p.offset.y < 0 ? 0 : 4) + 1 - p.offset.y}rem`};
`

export default Panel
