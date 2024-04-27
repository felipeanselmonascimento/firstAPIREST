import fastify from "fastify";
import { randomUUID } from 'node:crypto'
import { knex } from "./database";

const app = fastify()

app.get('/hello', async () => {
    const transactions = await knex('transactions').insert({
        id: randomUUID(),
        title: 'transacao de teste',
        amount: 1000
    }).returning('*')

    return transactions
})

app.listen({
    port: 3333,
}).then(() => {
    console.log('Server is Running!')
})