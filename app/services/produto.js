const valorDaTaxa = 10; // Não seria certo atribuir aqui, mas foi feito assim devido ao teste a falta de implementação

function calculaTaxa(preco) {
    if (preco < 0) return 0;
    return (preco * valorDaTaxa) / 100;
}

module.exports = {
    calculaTaxa,
}