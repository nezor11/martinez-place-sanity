import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Resume',

  projectId: '6zr8au58',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    media(),
  ],

  form: {
    // Don't use this plugin when selecting files only (but allow all other enabled asset sources)
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
  },

  schema: {
    types: schemaTypes,
  },
})
