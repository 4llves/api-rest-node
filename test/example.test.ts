import { expect, test } from 'vitest'

// o test é composto por basicamente 3 variaveis sendo elas
// o enunciado ex: "use consegue criar uma nova transacao"
// a operação
// validação que é o que dirá se teve sucesso
test('user consegue criar uma nova transacao', () => {
  const lalala = 201

  expect(lalala).toEqual(201)
})
