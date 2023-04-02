import { linhas } from "../../data/dimensoes.js";
import elementos from "../../data/elementos.js";
import getJogadas from "../getJogadas.js";
import getJogadorDaVez from "../getJogadorDaVez.js";

/**
 * Retorna qual será o resultado de uma determinada ação em uma partida.
 * 
 * @param {string[][]} estadoAtual 
 * @param {Number} posicao 
 * @returns O resultado de uma jogada nessa posição
 */
export default function resultadoJogada(estadoAtual, posicao, jogador = getJogadorDaVez(getJogadas(estadoAtual))) {
  const resultado = JSON.parse(JSON.stringify(estadoAtual));
  let i = linhas - 1;
  while (i >= 0) {
    if (resultado[i][posicao] === elementos.vazio) {
      resultado[i][posicao] = jogador;
      break;
    }
    i--;
  }
  return resultado;
}