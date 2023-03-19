document.addEventListener("DOMContentLoaded", () => {

    // Adiciona a funcionalidade do link da Logo
    document.querySelector(".cabecalho__logo").addEventListener("click", () => {
        // Ambiente de produção
        if (estaEmProducao()) {
            document.location.href = '/lig4'
        } else {
            // Ambiente de Desenvolvimento
            document.location.href = '/';
        }
    });

    // Faz o botão de voltar ao início da tela final funcionar
    const link = document.getElementById("voltar-inicio");
    if (estaEmProducao()) {
        link.setAttribute("href", "/lig4");
    } else {
        link.setAttribute("href", "/");
    }

    // Faz o botão de jgoar novamente da tela final funcionar
    document.getElementById("jogar-novamente").addEventListener("click", () => {
        document.location.reload();
    });

    // Botão de esconder tela final
    document.getElementById("esconder-tela").addEventListener("click", () => {
        document.querySelector(".final").style.display = "none";
    });

    if (!document.location.search.includes("ia")) {
        document.getElementById("fazer-jogada-ia").style.display = "none";
    }

    criarMatrizJogo();

});

/**
 * Verifica qual é o ambiente atual da aplicação através da URL
 * 
 * @returns Se o ambiente atual é o de produção ou o de desenvolvimento
 */
function estaEmProducao() {
    return !(document.location.href.includes("localhost") || document.location.href.includes("127.0.0.1"));
}

/**
 * Renderiza a Matriz que representa o estado da partida no HTML,
 * sendo representada por uma tabela de 6 linhas por 9 colunas
 */
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

    // Adiciona os botões de ação
    const botoes = document.createElement("tr");
    botoes.className = "matriz__botoes";
    for (k = 0; k < 9; k++) {
        const botao = document.createElement("td");
        botao.role = "button";
        botao.textContent = "⇑";
        botao.className = "matriz__botao";
        botao.id = `botao-${k}`;
        botao.setAttribute("aria-label", `Adicionar ficha na posição ${k}`);
        botoes.appendChild(botao);
    }
    matriz.appendChild(botoes);
}
