import { expect, test, beforeAll, afterAll } from 'vitest'
import req from 'supertest'
import { app } from '../src/app'

// o test é composto por basicamente 3 variaveis sendo elas
// o enunciado ex: "user consegue criar uma nova transacao"
// a operação
// validação que é o que dirá se teve sucesso
beforeAll(async () => {
  await app.ready() // aguardar que o app esteja pronto com valores
})

afterAll(async () => {
  await app.close() // fechar a aplicacao / remover ela da memoria
})

test('user consegue criar uma nova transacao', async () => {
  const response = await req(app.server).post('/transactions').send({
    title: 'Nova Transação',
    amount: 2500,
    type: 'credit',
  })

  expect(response.statusCode).toEqual(201)
})
