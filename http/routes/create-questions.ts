
import type {FastifyPluginCallbackZod} from 'fastify-type-provider-zod'
import { z} from 'zod/v4'
import { schema } from '../../src/db/schema/index.ts'
import { db } from '../../src/db/conection.ts'


export const createQuestionRoute: FastifyPluginCallbackZod = (app) => { app.post('/rooms/:roomId/questions', {
  schema: {
    params: z.object({
      roomId: z.string(),
    }),
    body: z.object({
     question: z.string().min(1),
      
    }),
  }
}, async (request, reply) => {
  const { roomId } = request.params
  const { question } = request.body

  const result = await db.insert(schema.questions).values({
    roomId,
    question,
   
  }).returning()
  const insertedQuestion = result[0]
  if (!insertedQuestion) {
    throw new Error('Failed to create room')
  }
  return reply.status(201).send({
    questionId: insertedQuestion.id
})
})}