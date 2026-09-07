// ./schemas/resumeType.ts

import {MdLocalMovies as icon} from 'react-icons/md'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const resumeType = defineType({
  name: 'resume',
  type: 'document',
  title: 'Resume',
  icon,
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 100,
      },
    }),
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      of: [
        defineArrayMember({
          name: 'header',
          type: 'header',
          validation: (Rule) => Rule.required(),
        }),
        defineArrayMember({
          name: 'infoSection',
          type: 'infoSection',
          validation: (Rule) => Rule.required(),
        }),
        defineArrayMember({
          name: 'sliderSection',
          type: 'sliderSection',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'pdfResume',
      title: 'CV in PDF',
      type: 'file',
      description: 'PDF for printing a physical CV',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'title.es',
    },
  },
})
