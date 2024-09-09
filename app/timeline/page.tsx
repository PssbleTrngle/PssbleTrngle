import { DateTime } from 'luxon'
import { PanelData } from '../../components/Panel'
import parseYAML from '../../lib/static'
import TimelineClient from './client'

const panels = parseYAML<PanelData>('timeline')
   .sort((a, b) => {
      const [ta, tb] = [a, b].map(({ time }) => time?.[0] && DateTime.fromObject(time[0]))
      if (!ta || !tb) return 0
      return ta.diff(tb).toMillis()
   })
   .map((p, i) => {
      const point = { x: Math.random() * 4 - 2, y: i * 250 }
      return { ...p, ...point }
   })

export default function Timeline() {
   return <TimelineClient panels={panels} />
}
