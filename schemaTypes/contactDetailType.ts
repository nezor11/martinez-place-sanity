// ./schemas/contactDetailType.ts

import {defineField, defineType} from 'sanity'

export const contactDetailType = defineType({
  name: 'contactDetail',
  type: 'document',
  title: 'Contact Detail',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Phone',
      name: 'phone',
      type: 'string',
    }),
    defineField({
      title: 'Email',
      name: 'email',
      type: 'string',
    }),
    defineField({
      title: 'Address',
      name: 'address',
      type: 'localeText',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'email',
    },
  },
})
