import elementos from "./elementos.js";
import jogoAcabou from "./jogoAcabou.js";
import adicionarFicha from "./adicionarFicha.js";
import getJogadorDaVez from "./getJogadorDaVez.js";
import getJogadas from "./getJogadas.js";

/**
 * Recebe e valida o input do usuário
 * 
 * @param {Number} posicao
 * @param {string[][]} estado
 * @param {string} oponente
 */
export default function recebeAcaoDoUsuario(posicao, estado, oponente) {
    if (estado[0][posicao] !== elementos.vazio || jogoAcabou(estado)) return;
    if (oponente === "ia" && getJogadorDaVez(getJogadas(estado)) === elementos.amarelo) return;
    adicionarFicha(posicao, estado, oponente);
}