import { createGraphQLHandler } from '@redwoodjs/graphql-server'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import { useResponseCache, createInMemoryCache } from '@envelop/response-cache'
// https://www.envelop.dev/plugins/use-response-cache
const cache = createInMemoryCache()

export const handler = createGraphQLHandler({
  loggerConfig: {
    logger,
    options: { operationName: true },
  },
  directives,
  sdls,
  services,
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
  extraPlugins: [
    useResponseCache({
      cache,
      ttlPerSchemaCoordinate: {
        'Query.__schema': undefined,
      },
      includeExtensionMetadata: process.env['NODE_ENV'] === 'development',
    }),
  ],
})
