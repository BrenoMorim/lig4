import getJogadorDaVez from "./getJogadorDaVez.js";
import elementos from "./elementos.js";
import getJogadas from "./getJogadas.js";

/**
 * Atualiza a visualização para mostrar de quem é a vez,
 * mudando não só o texto mas também o estilo do fundo do texto
 * 
 * @param {string} oponente
 * @param {string[][]} estado
 */
export default function atualizaTextoJogadorDaVez(oponente, estado) {
    const paragrafo = document.querySelector(".jogo__texto");
    const jogadas = getJogadas(estado);
    const jogadorDaVez = getJogadorDaVez(jogadas);
    const elementoJogadorDaVez = document.getElementById("jogador-da-vez");
    elementoJogadorDaVez.textContent = jogadorDaVez;
    paragrafo.classList.add(`fundo--${jogadorDaVez}`);
    paragrafo.classList.remove(`fundo--${getJogadorDaVez(jogadas + 1)}`);
    
    if (oponente === "ia") {
        if (jogadorDaVez === elementos.azul) {
            elementoJogadorDaVez.textContent += " (Você) ";
        } else {
            elementoJogadorDaVez.textContent += " (IA) ";
        }
    }
}