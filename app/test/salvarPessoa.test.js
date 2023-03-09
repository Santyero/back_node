const request = require('supertest');
const app = require('../../server');

describe('Testando a rota de criação de pessoa', () => {
  it('Deve criar uma nova pessoa', async () => {
    const res = await request(app)
      .post('/pessoa')
      .send({
        nome: 'Fulano',
        sobrenome: 'de Tal',
        cpf: '12345678901',
        data_nascimento: '1990-01-01',
        sexo: 'Masculino',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toEqual('Fulano');
    expect(res.body.sobrenome).toEqual('de Tal');
    expect(res.body.cpf).toEqual('12345678901');
    expect(res.body.data_nascimento).toEqual('1990-01-01');
    expect(res.body.sexo).toEqual('Masculino');
  }, 10000); // aumentando o limite de tempo para 10 segundos

  it('Deve retornar um erro 400 se o nome não for informado', async () => {
    const res = await request(app)
      .post('/pessoa')
      .send({
        sobrenome: 'de Tal',
        cpf: '12345678901',
        data_nascimento: '1990-01-01',
        sexo: 'Masculino',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Pessoa precisa de um nome!');
  });
});