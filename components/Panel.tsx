import Image from 'next/image';
import { lighten } from 'polished';
import { FC } from "react";
import styled, { css } from "styled-components";

const Panel: FC<{
   image?: string,
   text?: string,
   title?: string,
   link?: string
}> = ({ children, image, text, title, link }) => (
   <Style>
      {image &&
         <ImageBox>
            <Image src={`/images/${image}`} alt={title} layout='fill' />
         </ImageBox>
      }
      {title && <h3>{title}</h3>}
      {text && <p>{text}</p>}
      {children}
   </Style>
)

const Box = css`
   background: ${p => lighten(0.2, p.theme.bg)};
   border-radius: 10px;
   box-shadow: 1px 2px 20px 0 #0002;
   padding: 2rem;
`

const ImageBox = styled.div`
   ${Box};
   user-select: none;
   background: ${p => lighten(0.1, p.theme.bg)};
   position: absolute;
   width: 300px;
   height: 300px;
   right: -30px;
   bottom: -40px;

   img {
      object-fit: contain;
   }
`

const Style = styled.div`
   ${Box};
   position: relative;
   height: 300px;
   margin: 2rem 0;
   max-width: 1000px;

   p, h3 {
      max-width: calc(100% - 300px);
      margin: 1rem 0;
   }
`

export default Panel