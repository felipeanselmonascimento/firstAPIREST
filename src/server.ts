import fastify from "fastify";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";

const app = fastify()
app.register(transactionsRoutes, {
    prefix: 'transactions'
}) //registrando os plugins a ordem q vai executar


app.listen({
    port: env.PORT,
}).then(() => {
    console.log('Server is Running!')
})