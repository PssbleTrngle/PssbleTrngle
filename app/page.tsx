import { PanelData } from '../components/Panel'
import parseYAML from '../lib/static'
import HomeClient from './client'

export default function Home() {
   return (
      <HomeClient
         subsubtitles={[
            'parttime garlic bread enthusiast',
            'hardcore gamer',
            'entitled react enthusiast',
            'cauliflower enjoyer',
            'hobby picnicker',
            'SSO supporter',
            'Wannabe Fullstack Developer',
         ]}
         panels={parseYAML<PanelData>('panels')}
      />
   )
}
