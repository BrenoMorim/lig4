import elementos from "../data/elementos.js";
import getGanhador from "./getGanhador.js";

/**
 * Checa se o jogo está em estado terminal, já com
 * ganhador definido ou empatado
 * 
 * @param {string[][]} estadoAtual 
 * @returns {boolean} Se o jogo está acabado
 */
export default function jogoAcabou(estadoAtual) {
  if (getGanhador(estadoAtual).jogador !== "nenhum") {
    return true;
  }
  if (estadoAtual[0].join(" ").includes(elementos.vazio) === false) {
    return true;
  }
  return false;
}