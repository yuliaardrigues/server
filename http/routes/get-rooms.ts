/** biome-ignore-all assist/source/organizeImports: <explanation> */


import type {FastifyPluginCallbackZod} from 'fastify-type-provider-zod'
import { db } from '../../src/db/conection.ts'
import { schema } from '../../src/db/schema/index.ts'
import { count, eq } from 'drizzle-orm'


export const getRoomsRoute: FastifyPluginCallbackZod = (app) => { app.get('/rooms', async() => {
  const results = await db.select({
    id: schema.rooms.id,
    name: schema.rooms.name,
    createdAt: schema.rooms.createdAt,
    questionsCount: count(schema.questions.id)
    
  }).from(schema.rooms).leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id)).groupBy(schema.rooms.id, schema.rooms.name).orderBy(schema.rooms.createdAt)
  return results
  })
}