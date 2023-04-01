import recebeAcaoDoUsuario from "./recebeAcaoDoUsuario.js";
import getJogadorDaVez from "./getJogadorDaVez.js";
import realizaJogadaIA from "./ia/realizaJogadaIA.js";
import elementos from "./elementos.js";
import getJogadas from "./getJogadas.js";

/**
 * Configura o comportamento dos botões da página de jogo
 * 
 * @param {string[][]} estado 
 * @param {string} oponente 
 */
export default function ativaBotoesJogo(estado, oponente) {
    const botaoIA = document.getElementById("fazer-jogada-ia");

    document.querySelectorAll(".matriz__botao").forEach(botao => {
        // Adiciona o evento de click para os botões
        botao.addEventListener('click', () => {
            recebeAcaoDoUsuario(Number(botao.id.at(-1)), estado, oponente);
            botaoIA.removeAttribute("disabled");
        });
    });

    botaoIA.addEventListener("click", () => {
        if (oponente === "ia" && getJogadorDaVez(getJogadas(estado)) === elementos.amarelo) {
           realizaJogadaIA(estado, oponente);
           botaoIA.setAttribute("disabled", true);
        }
    });
}
