import { readdirSync, readFileSync } from 'fs'
import { basename, extname, join, resolve } from 'path'
import yaml from 'yaml'

export default function parseYAML<T>(path: string): (T & { key: string })[] {
   const folder = resolve('static', path)
   const files = readdirSync(folder)
      .filter(f => ['.yaml', '.yml'].includes(extname(f)))
      .map(f => join(folder, f))

   return files.map(file => {
      const content = readFileSync(file).toString()
      return { ...yaml.parse(content), key: basename(file) }
   })
}
