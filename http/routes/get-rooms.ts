
import type {FastifyPluginCallbackZod} from 'fastify-type-provider-zod'
import { db } from '../../src/db/conection.ts'
import { schema } from '../../src/db/schema/index.ts'
import { id } from 'zod/v4/locales'
import { rooms } from '../../src/db/schema/rooms.ts'

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => { app.get('/rooms', async() => {
  const results = await db.select({
    id: schema.rooms.id,
    name: schema.rooms.name,
    
  }).from(schema.rooms).orderBy(schema.rooms.createdAt)
  return results
  })
}