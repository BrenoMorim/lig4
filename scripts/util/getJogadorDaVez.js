import elementos from "./elementos.js";

/**
 * Calcula qual é o jogador da vez, baseado no total
 * de jogadas que já foram feitas
 * 
 * @param {Number} jogadas
 * @returns {string} O jogador da vez
 */
export default function getJogadorDaVez(jogadas) {
  if (jogadas % 2 == 0) 
    return elementos.azul;
  return elementos.amarelo;
}
