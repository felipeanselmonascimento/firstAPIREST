import fastify from "fastify";
import { env } from "./env";
import cookie from "@fastify/cookie"
import { transactionsRoutes } from "./routes/transactions";

const app = fastify()

//se quero trabalhar com cookies na rota de transactions o cadastro de cookies tem q acontecer antes
app.register(cookie)
app.register(transactionsRoutes, {
    prefix: 'transactions'
}) //registrando os plugins a ordem q vai executar


app.listen({
    port: env.PORT,
}).then(() => {
    console.log('Server is Running!')
})