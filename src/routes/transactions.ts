import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database'
import { FastifyInstance } from 'fastify'

                // nome do plugin
export async function transactionsRoutes(app: FastifyInstance) {

    app.get('/', async () => {
        const transactions = await knex('transactions')
        .select()

        return { transactions }

    })

    app.get('/:id', async (req) => {
        const getTransactionsParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getTransactionsParamsSchema.parse(req.params)

        const transaction = await knex('transactions')
        .where('id', id).first()

        return { transaction }

    })

    app.post('/', async (req, reply) => {
        
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const { title, amount, type } = createTransactionBodySchema.parse(req.body) //valindo os dados do request.body pra ver se bate com o schema q foi definido
    
        await knex('transactions')
        .insert({
            id: randomUUID(),
            title,
            amount: type == 'credit' ? amount : amount * -1
        })

        return reply.status(201).send()
    })
}