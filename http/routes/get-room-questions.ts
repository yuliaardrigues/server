
import type {FastifyPluginCallbackZod} from 'fastify-type-provider-zod'
import { desc, eq } from 'drizzle-orm'
import { db } from '../../src/db/conection.ts'
import { schema } from '../../src/db/schema/index.ts'
import { questions } from '../../src/db/schema/questions.ts'
import { z } from 'zod/v4'


export const getRoomsQuestions: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
     async (request) => {
        const { roomId } = request.params

                const result = await db.select({
                  id: schema.questions.id,
                  questions: schema.questions.question,
                  answer: schema.questions.answer,
                  createdAt: schema.questions.createdAt,
                }).from(schema.questions).where(eq(schema.questions.roomId, roomId)).orderBy(desc(questions.createdAt))
        return result
      })}
