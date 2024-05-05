import { test, beforeAll, afterAll, beforeEach } from "vitest"
import request from "supertest"
import { app } from "../src/app"

beforeAll(async () => {
    //funcao vai executar uma unica vez antes de todos os testes
    await app.ready()
})

afterAll(async () => {
    await app.close()
})

// beforeEach(() => {
//     location.replace(`http://localhost`);    
// })

test('user should be able to create a new transaction', async () => {
    await request(app.server)       //supertest sempre precisa receber o servidor do node
    .post('transactions')
    .send({
        title: "new title",
        amount: 1000,
        type: "credit"
    })
    .expect(201)
})