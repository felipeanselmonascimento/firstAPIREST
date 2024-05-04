import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database'
import { FastifyInstance } from 'fastify'
import { checkSessionIdexists } from '../middlewares/check-session-id-exists'

                // nome do plugin
export async function transactionsRoutes(app: FastifyInstance) {

    app.get('/', {
        preHandler: [checkSessionIdexists]       //lida antes do funcionamento da rota, no caso chamado de handler, *executa antes do handler*
    } ,async (req) => {

        const { sessionId } = req.cookies

        const transactions = await knex('transactions')
        .where('session_id', sessionId)
        .select()

        return { transactions }

    })

    app.get('/:id', {
        preHandler: [checkSessionIdexists]       //lida antes do funcionamento da rota, no caso chamado de handler, *executa antes do handler*
    }, async (req) => {
        const { sessionId } = req.cookies
        const getTransactionsParamsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = getTransactionsParamsSchema.parse(req.params)

        const transaction = await knex('transactions')
            .where('id', id)
            .andWhere('session_id', sessionId)
            .first()

        return { transaction }

    })

    app.get('/summary', {
        preHandler: [checkSessionIdexists]       //lida antes do funcionamento da rota, no caso chamado de handler, *executa antes do handler*
    }, async (req) => {

        const { sessionId } = req.cookies
        const summary = await knex('transactions').sum('amount', { as: "amount" })
        .where('session_id', sessionId)
        .first()
                                                                // passar algumas configuracoes 
        return { summary }
    })

    app.post('/', async (req, reply) => {
        
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const { title, amount, type } = createTransactionBodySchema.parse(req.body) //valindo os dados do request.body pra ver se bate com o schema q foi definido

        let sessionId = req.cookies.sessionId //ja existe uma sessionid?

        if(!sessionId) {
            sessionId = randomUUID()

            reply.cookie('sessionId', sessionId, {
                path: '/', //qual rota pode acessar esse cookie
                maxAge: 1000 * 60 * 60 * 24 * 7 //7 days
            })
        }
    
        await knex('transactions')
        .insert({
            id: randomUUID(),
            title,
            amount: type == 'credit' ? amount : amount * -1,
            session_id: sessionId // se ja existir passar ela aq
        })

        return reply.status(201).send()
    })
}