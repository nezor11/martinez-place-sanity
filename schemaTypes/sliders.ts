import {FaSlidersH as icon} from 'react-icons/fa'
import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Sliders',
  name: 'sliders',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'name',
      title: 'Slider Name',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [{type: 'slideGallery'}],
    }),
  ],
  preview: {
    select: {
      title: 'name.en',
    },
  },
})
