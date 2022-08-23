import { FC, ReactNode } from 'react'
import { Maybe } from '../graphql/generated'

export interface Typed<T extends string | undefined = string> {
   __typename?: T
}

//type Typename<T extends Typed> = T['__typename'] extends string ? T['__typename'] : string
type Typename<T extends Typed> = T['__typename']

export function isType<T extends Typed, K extends Typename<T>>(
   value: T,
   key: K
): value is T & Typed<K> {
   return '__typename' in value && value.__typename === key
}

export function morph<T extends Typed, K extends Typename<T>, O>(
   value: Maybe<T> | undefined,
   key: K,
   supplier: (match: T & Typed<K>) => O
) {
   if (value && isType(value, key)) return supplier(value)
   return null
}

function Polymorphed<T extends Typed, K extends Typename<T>>(props: {
   type: K | undefined
   value: Maybe<T> | undefined
   children: (match: T & Typed<K>) => ReactNode
}) {
   if (props.value && isType(props.value, props.type)) return <>{props.children(props.value)}</>
   return null
}

Polymorphed.of = function <T extends Typed>(): <K extends Typename<T>>(
   type: K,
   supplier: (match: T & Typed<K>) => ReactNode
) => FC<{ value: Maybe<T> | undefined }> {
   return (type, supplier) => props =>
      (
         <Polymorphed {...props} type={type}>
            {supplier}
         </Polymorphed>
      )
}

export default Polymorphed
