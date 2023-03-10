const teste = {
    test: () => "a",
};

function testeLog() {
    return teste.test();
}

class Testeee {
    static test() {
        return "a";
    }
}

function testeLog2() {
    return Testeee.test();
}

test("Teste inicial", () => {
    const spyTest = jest.spyOn(teste, "test").mockImplementation(() => {
        return "TESTE";
    });
    const spyTest2 = jest.spyOn(Testeee, "test").mockImplementation(() => {
        return "TESTE";
    });

    expect(testeLog()).toEqual("TESTE");
    expect(testeLog()).not.toEqual("123");
    expect(testeLog2()).toBe("TESTE");
    expect(spyTest).toHaveBeenCalled();
    expect(spyTest2).toHaveBeenCalled();
});