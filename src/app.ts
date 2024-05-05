import fastify from "fastify";
import cookie from "@fastify/cookie"
import { transactionsRoutes } from "./routes/transactions";

export const app = fastify()

//se quero trabalhar com cookies na rota de transactions o cadastro de cookies tem q acontecer antes
app.register(cookie)
app.register(transactionsRoutes, {
    prefix: 'transactions'
}) //registrando os plugins a ordem q vai executar