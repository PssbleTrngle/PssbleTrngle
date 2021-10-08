import React, { CSSProperties, HTMLAttributes } from 'react';

type cellProps = { area: string, children: JSX.Element[] | JSX.Element } & HTMLAttributes<HTMLDivElement>;
const Cell = ({ area, children, style, className, ...props }: cellProps) => {
    return <div
        style={{ gridArea: area, ...style } as CSSProperties}
        className={`${area} ${className ?? ''}`} {...props}
    >
        {children}
    </div>
}

export default Cell;