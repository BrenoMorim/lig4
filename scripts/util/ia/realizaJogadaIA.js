import adicionarFicha from "../adicionarFicha.js";
import jogoAcabou from "../jogoAcabou.js";
import minimax from "./minimax.js";

/**
 * Chama o algoritmo de escolha de jogadas e executa a alteração.
 * 
 * @param {string[][]} estado
 * @param {string} oponente
 */
export default function realizaJogadaIA(estado, oponente) {
    if (!jogoAcabou(estado)) {
        adicionarFicha(minimax(estado), estado, oponente);
    }
}