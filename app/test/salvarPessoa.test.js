const Login = require('../controllers/login');

const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();



ClienteMock.$queryInterface.$useHandler((query, queryOptions, done) => {
    if (query === 'findAll') {
        const limit = queryOptions[0].limit ?? 10;
        const result = [];
        for (let x = 0; x < limit; x++)
            result.push(ClienteMock.build({ id: x, nome: 'cliente ' + x, idade: x, uf: 'RS' }));
        return result;
    }
})
 
module.exports = ClienteMock;

describe("Criar Login", () => {
    test("Criar Login", async () => {
        const login = {
            nome: "Teste",
            sobrenome: "Teste",
            cpf: "12345678901",
            data_nascimento: "2020-01-01",
            sexo: "M",
            email: "san@gg",
            senha: "123456"
        };

        const req = {
            body: login
        };
        const res = {
            send: jest.fn()
        };
        const loginCriado = await Login.create(req, res);
        expect(loginCriado).toEqual(login);
    });

    test("Criar Login duplicado", async () => {
        const login = {
            nome: "Teste",
            sobrenome: "Teste",
            cpf: "12345678901",
            data_nascimento: "2020-01-01",
            sexo: "M",
            email: "san@gg",
            senha: "123456"
        };

        const req = {
            body: login
        };
        const res = {
            send: jest.fn()
        };
        const loginCriado = await Login.create(req, res);
        expect(loginCriado.status).toEqual(400);
        expect(loginCriado.message).toEqual("Email já cadastrado!");
    });     
});