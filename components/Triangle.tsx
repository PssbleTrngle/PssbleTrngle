import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { DefaultTheme } from 'styled-components';
import { Mesh, Object3D } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const loader = new OBJLoader();

function useModel(name: string) {
    const [model, setModel] = useState<Object3D>();

    const path = useMemo(() => `object/${name}.obj`, [name])

    useEffect(() => {
        loader.loadAsync(path)
            .then(setModel)
            .catch(console.error);
    }, [path])

    return model;
}

const Triangle: FC<{ theme: DefaultTheme }> = ({ theme }) => {
    const ref = useRef<Mesh>();
    const [hovered, setHover] = useState(false)

    const { primary, hover } = theme.triangle

    const model = useModel('triangle');
    if (!model) return null;

    const [triangle] = model.children as [Mesh];

    return <mesh ref={ref}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        args={[triangle.geometry]}>
        <meshStandardMaterial attach='material' color={hovered ? hover : primary} />
    </mesh>
}

export default Triangle