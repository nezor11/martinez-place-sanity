import {FaStickyNote} from 'react-icons/fa'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sliderSection',
  title: 'Slider Section',
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
      name: 'sliderDetails',
      title: 'Select Slider',
      type: 'reference',
      to: [{type: 'sliders'}],
    }),
  ],
  icon: FaStickyNote,
  preview: {
    select: {
      title: 'titleSection.en',
    },
  },
})
