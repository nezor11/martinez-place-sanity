import {defineField, defineType} from 'sanity'

/**
 * Languages the site is published in. English is the default: the site
 * falls back to it for anything left untranslated, so it is the only
 * required one.
 */
export const supportedLanguages = [
  {id: 'en', title: 'English', isDefault: true},
  {id: 'es', title: 'Español', isDefault: false},
] as const

/** Object type with one field of `type` per language ({ en, es }). */
const localeType = (name: string, title: string, type: string) =>
  defineType({
    name,
    title,
    type: 'object',
    fields: supportedLanguages.map((lang) =>
      defineField({
        name: lang.id,
        title: lang.title,
        type,
        validation: lang.isDefault ? (Rule) => Rule.required() : undefined,
      }),
    ),
  })

export const localeString = localeType('localeString', 'Localised string', 'string')
export const localeText = localeType('localeText', 'Localised text', 'text')
export const localeBlockContent = localeType(
  'localeBlockContent',
  'Localised block content',
  'blockContent',
)
