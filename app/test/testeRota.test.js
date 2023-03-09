const request = require("supertest");
const http = require("http");
const app = require("../../server");

describe("Teste de rota", () => {
    let server;
    beforeAll(() => {
        server = http.createServer(app);
        server.listen(8080); // inicia o servidor em uma porta disponível
    });
    afterAll((done) => {
      server.close(done); // finaliza o servidor após os testes
    });
  
    test("Deve retornar a mensagem 'Aplicação Rodando'", async () => {
        const response = await request(server).get("/");
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Aplicação Rodando");
    });
});