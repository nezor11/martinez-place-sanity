import {at, defineMigration, set} from 'sanity/migrate'
import translations from './translations.json'

/**
 * Fills the Spanish side of the localised fields with the translations in
 * translations.json (generated from the English content on 2026-09-07).
 * Only fields whose Spanish value is still empty are touched, so anything
 * edited in the Studio afterwards is kept.
 *
 *   npx sanity migration run translate-es              dry run
 *   npx sanity migration run translate-es --no-dry-run apply
 */
type Segment = string | number | {_key: string}
interface Translation {
  doc: string
  path: Segment[]
  value: unknown
}

const byDoc = new Map<string, Translation[]>()
for (const t of translations as Translation[]) {
  byDoc.set(t.doc, [...(byDoc.get(t.doc) ?? []), t])
}

const read = (node: unknown, path: Segment[]): unknown =>
  path.reduce<unknown>((value, segment) => {
    if (value === null || typeof value !== 'object') return undefined
    if (typeof segment === 'object') {
      return (value as {_key?: string}[]).find((x) => x?._key === segment._key)
    }
    return (value as Record<string, unknown>)[segment as string]
  }, node)

const isEmpty = (value: unknown): boolean =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && !value.trim()) ||
  (Array.isArray(value) && value.length === 0)

export default defineMigration({
  title: 'Fill the Spanish translations of every localised field',
  documentTypes: ['resume', 'contactDetail', 'sliders', 'slide'],
  migrate: {
    document(doc) {
      const entries = byDoc.get(doc._id) ?? []
      return entries.filter((t) => isEmpty(read(doc, t.path))).map((t) => at(t.path, set(t.value)))
    },
  },
})
