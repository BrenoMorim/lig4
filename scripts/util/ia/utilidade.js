import getGanhador from "../getGanhador.js";
import elementos from "../elementos.js";

/**
 * Verifica qual é o ganhador de um determinado estado,
 * caso o ganhador for o jogador azul retorna 1, 
 * se for o amarelo retorna 0, e se não tiver ganhador retorna 0
 * 
 * @param {string[][]} estadoAtual
 * @returns 1, -1 ou 0, dependendo do ganhador
 */
export default function utilidade(estadoAtual) {
  const ganhador = getGanhador(estadoAtual);
  if (ganhador === elementos.azul) {
    return 1;
  } else if (ganhador === elementos.amarelo) {
    return -1;
  }
  return 0;
}