const { calculaTaxa } = require("../services/produto");

describe("Teste Produto", () => {
    test("Verifica valor da Taxa", async () => {
        const res = calculaTaxa(100);
        expect(res).toEqual(10);
    });

    test("Verifica valor negativo", async () => {
        const res = calculaTaxa(-100);
        expect(res).not.toEqual(10)
    });

});