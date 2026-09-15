// sanity.cli.ts
import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '6zr8au58',
    dataset: 'production',
  },
  studioHost: 'cv-resume',
  deployment: {
    appId: '53fedc2094e40623ee02347c',
  },
  server: {
    hostname: 'localhost',
    port: 3333,
  },
  graphql: [
    {
      tag: 'default',
      playground: true,
      generation: 'gen3',
      nonNullDocumentFields: false,
    },
  ],
  vite: (config) => config,
})
