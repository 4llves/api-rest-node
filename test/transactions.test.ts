import {
  expect,
  test,
  beforeAll,
  afterAll,
  describe,
  it,
  beforeEach,
} from 'vitest'
import req from 'supertest'
import { execSync } from 'node:child_process'
import { app } from '../src/app'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready() // aguardar que o app esteja pronto com valores
  })

  afterAll(async () => {
    await app.close() // fechar a aplicacao / remover ela da memoria
  })

  beforeEach(() => {
    execSync('npm run knex -- migrate:rollback --all')
    execSync('npm run knex -- migrate:latest')
  })

  test('user consegue criar uma nova transacao', async () => {
    const response = await req(app.server).post('/transactions').send({
      title: 'Nova Transação',
      amount: 2500,
      type: 'credit',
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await req(app.server)
      .post('/transactions')
      .send({
        title: 'Nova Transação',
        amount: 2500,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await req(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'Nova Transação',
        amount: 2500,
      }),
    ])
  })
})

// o test é composto por basicamente 3 variaveis sendo elas
// o enunciado ex: "user consegue criar uma nova transacao"
// a operação
// validação que é o que dirá se teve sucesso
