document.addEventListener("DOMContentLoaded", () => {

    document.querySelector(".cabecalho__logo").addEventListener("click", () => {
        // Ambiente de produção
        if (estaEmProducao()) {
            document.location.href = '/lig4'
        } else {
            // Ambiente de Desenvolvimento
            document.location.href = '/';
        }
    });

    const link = document.getElementById("voltar-inicio");
    if (estaEmProducao()) {
        link.setAttribute("href", "/lig4");
    } else {
        link.setAttribute("href", "/")
    }

    criarMatrizJogo();

});

function estaEmProducao() {
    return !(document.location.href.includes("localhost") || document.location.href.includes("127.0.0.1"));
}

function criarMatrizJogo() {
    const matriz = document.querySelector(".jogo__matriz");
    for (i = 0; i < 6; i++) {
        const linha = document.createElement("tr");
        linha.className = "matriz__linha";

        for (j = 0; j < 9; j++) {
            const celula = document.createElement("td");
            celula.className = "matriz__celula";
            celula.id = `${i}x${j}`;
            linha.appendChild(celula);
        }
        matriz.appendChild(linha);
    }

    const botoes = document.createElement("tr");
    for (k = 0; k < 9; k++) {
        const botao = document.createElement("td");
        botao.role = "button";
        botao.textContent = "⇑";
        botao.className = "matriz__botao";
        botao.id = `botao-${k}`;
        botoes.appendChild(botao);
    }
    matriz.appendChild(botoes);
}
