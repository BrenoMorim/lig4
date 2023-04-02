import elementos from "./elementos.js";
import getJogadorDaVez from "./getJogadorDaVez.js";
import getGanhador from "./getGanhador.js";
import atualizaTextoJogadorDaVez from "./atualizaTextoJogadorDaVez.js";
import mostraTelaFinal from "./mostraTelaFinal.js";
import jogoAcabou from "./jogoAcabou.js";
import getJogadas from "./getJogadas.js";
import { linhas } from "./dimensoes.js";

/**
 * Insere uma ficha da cor do jogador da vez em dada posição.
 * Atualiza tanto o conteúdo HTML da tabela, quanto a representação na 
 * variável JS estado
 * 
 * @param {Number} posicao: A posição na qual a ficha vai ser inserida
 * @param {string[][]} estado: Estado do jogo
 * @param {string} oponente: Contra quem o jogador está jogando
 */
export default function adicionarFicha(posicao, estado, oponente) {
  let i = linhas - 1;
  while (i >= 0) {
    if (estado[i][posicao] === elementos.vazio) {
      estado[i][posicao] = getJogadorDaVez(getJogadas(estado));
      break;
    }
    i--;
  }
  const celula = document.getElementById(`${i}x${posicao}`);
  const container = document.createElement("div");
  container.className = "ficha__container";
  const ficha = document.createElement("img");
  ficha.src = `assets/${estado[i][posicao]}.png`;
  ficha.classList.add("matriz__ficha");
  ficha.classList.add("animate__animated");
  ficha.classList.add("animate__bounceIn");
  ficha.alt = `Ficha do jogador ${estado[i][posicao]} na posição ${i} por ${posicao}`;
  container.appendChild(ficha);
  celula.appendChild(container);
  atualizaTextoJogadorDaVez(oponente, estado);
  if (jogoAcabou(estado)) {
    mostraTelaFinal(getGanhador(estado));
  }
}