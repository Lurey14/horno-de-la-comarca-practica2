export type EntryKind = 'Lugar' | 'Personaje' | 'Pueblo'

export interface AtlasEntry {
  id: string
  name: string
  kind: EntryKind
  era: string
  region: string
  summary: string
  detail: string
  symbol: string
  palette: 'moss' | 'mist' | 'ember' | 'starlight'
}
