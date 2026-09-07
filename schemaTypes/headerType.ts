// ./schemas/headerType.ts

import {defineField, defineType} from 'sanity'

export const headerType = defineType({
  name: 'header',
  type: 'object',
  title: 'Header',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localeString',
      description: 'Please use "Firstname Lastname" format',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'jobDescHeader',
      title: 'Job Desc Header',
      type: 'localeString',
      description: 'Please enter the Job Desc',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icons',
      title: 'Icons',
      type: 'array',
      of: [{type: 'iconGallery'}],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'contactDetails',
      title: 'Contact Details',
      type: 'reference',
      to: [{type: 'contactDetail'}],
    }),
  ],
})
