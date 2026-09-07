import {at, defineMigration, set} from 'sanity/migrate'

/**
 * Wraps every translatable value as { en: <value> } so it matches the
 * localeString / localeText / localeBlockContent types. Values that are
 * already objects are left alone, so the migration can run more than once.
 *
 *   npx sanity migration run localise-fields              dry run
 *   npx sanity migration run localise-fields --no-dry-run apply
 */
const fieldsByType: Record<string, string[]> = {
  resume: ['title'],
  header: ['name', 'jobDescHeader'],
  infoSection: ['titleSection', 'subtitleSection'],
  infoItem: ['company', 'jobTitle', 'jobDesc'],
  sliderSection: ['titleSection'],
  contactDetail: ['title', 'address'],
  sliders: ['name'],
  slide: ['name', 'slideTitle', 'slideSummary', 'slideDesc'],
  // Gallery images inside slide.images carry an alt text.
  image: ['alt'],
}

const isLocalised = (value: unknown): boolean =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export default defineMigration({
  title: 'Wrap translatable fields as localised objects with the English value',
  documentTypes: ['resume', 'contactDetail', 'sliders', 'slide'],
  migrate: {
    // Patches returned from a node visitor are applied relative to that
    // node, so the field name alone is the path.
    object(node) {
      const type = typeof node._type === 'string' ? node._type : undefined
      const fields = type ? fieldsByType[type] : undefined
      if (!fields) return undefined
      return fields.flatMap((field) => {
        const value = (node as Record<string, unknown>)[field]
        if (value === undefined || value === null || isLocalised(value)) {
          return []
        }
        return [at([field], set({en: value}))]
      })
    },
  },
})
