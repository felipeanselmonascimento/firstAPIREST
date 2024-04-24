import { knex as setupKnex } from 'knex'

const knex = setupKnex({
    client: 'sqlite',
    connection: {
        filename: './tmp/app.db' //caminho relativo a posicao q estou executando meu codigo
    }
})