import { FC } from 'react'

const asEmoji = (text: string) => text + '\uFE0F'

const Emoji: FC<{ children?: string | null }> = ({ children, ...props }) => {
   if (!children) return null
   const emojified = children
      .split(/\s/)
      .map(word => asEmoji(word))
      .join(' ')
   return <span {...props}>{emojified}</span>
}

export default Emoji
