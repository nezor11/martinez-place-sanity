import blockContent from './blockContent'
import {contactDetailType} from './contactDetailType'
import {headerType} from './headerType'
import iconGallery from './iconGalleryType'
import icons from './icons'
import infoItemType from './infoItemType'
import infoSectionType from './infoSectionType'
import {localeBlockContent, localeString, localeText} from './localeTypes'
import {resumeType} from './resumeType'
import slide from './slide'
import slideGallery from './slideGalleryType'
import sliders from './sliders'
import sliderSection from './sliderSectionType'

export const schemaTypes = [
  // Document types
  resumeType,
  contactDetailType,
  sliders,
  slide,
  icons,

  // Other types
  localeString,
  localeText,
  localeBlockContent,
  headerType,
  blockContent,
  infoSectionType,
  infoItemType,
  iconGallery,
  slideGallery,
  sliderSection,
]
