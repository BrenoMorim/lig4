import { linhas, colunas } from "./dimensoes.js";

/**
 * Renderiza a Matriz que representa o estado da partida no HTML,
 * sendo representada por uma tabela de 6 linhas por 9 colunas
 */
export default function renderizaMatrizJogo() {
    const matriz = document.querySelector(".jogo__matriz");
    for (let i = 0; i < linhas; i++) {
        const linha = document.createElement("tr");
        linha.className = "matriz__linha";

        for (let j = 0; j < colunas; j++) {
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
    for (let k = 0; k < colunas; k++) {
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