import {FaList} from 'react-icons/fa'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'infoSection',
  title: 'Info Section',
  type: 'object',
  fields: [
    defineField({
      name: 'iconTitle',
      title: 'Icon Title',
      type: 'reference',
      to: [{type: 'icons'}],
    }),
    defineField({
      name: 'titleSection',
      title: 'Title Section',
      type: 'localeString',
    }),
    defineField({
      name: 'subtitleSection',
      title: 'Subtitle Section',
      type: 'localeText',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [{type: 'infoItem'}],
    }),
  ],
  icon: FaList,
  preview: {
    select: {
      title: 'titleSection.en',
    },
    prepare({title}) {
      return {
        title: title || 'No title section',
      }
    },
  },
})
