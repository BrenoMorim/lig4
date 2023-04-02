import { colunas, linhas } from "../data/dimensoes.js";
import elementos from "../data/elementos.js";

/**
 * Calcula quantas jogadas já foram feitas na partida,
 * contando o número de fichas na matriz
 * 
 * @param {string[][]} estadoAtual
 * @returns Quantas jogadas foram feitas
 */
export default function getJogadas(estadoAtual) {
  let contagem = 0;
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      if (estadoAtual[i][j] !== elementos.vazio) contagem++;
    }
  }
  return contagem;
}