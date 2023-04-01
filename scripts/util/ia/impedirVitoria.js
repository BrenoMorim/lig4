import getGanhador from "../getGanhador.js";
import resultadoJogada from "./resultadoJogada.js";

/**
 * Verifica se o oponente está a um passo da vitória, retornando
 * a jogada que deve ser feita para impedir a vitória do oponente.
 * 
 * @param {string[][]} estadoAtual 
 * @param {Number[]} possiveisJogadas
 * @param {string} jogador
 * @returns A jogada que deve ser feita
 */
export default function impedirVitoria(estadoAtual, possiveisJogadas, jogador) {
    const posicoes = [];
    possiveisJogadas.forEach(jogada => {
        if (getGanhador(resultadoJogada(estadoAtual, jogada, jogador)) === jogador) {
            posicoes.push(jogada);
        }
    });
    if (posicoes.length > 0) return posicoes[0];
    return undefined;
}