import elementos from "../elementos.js";

/**
 * Dado o estado de uma partida, retorna as possíveis jogadas que podem ser escolhidas.
 * 
 * @param {string[][]} estadoAtual
 * @returns Uma lista de jogadas que podem ser realizadas
 */
export default function getPossiveisJogadas(estadoAtual) {
    const jogadas = [];
    estadoAtual[0].forEach((valor, posicao) => {
        if (valor === elementos.vazio) jogadas.push(posicao);
    });
    return jogadas;
}