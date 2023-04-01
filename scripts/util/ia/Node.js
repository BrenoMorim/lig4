/**
 * Classe que representa um Node, estado possível que pode ser alcançado
 * dado uma jogada, que armazena também qual estado o originou.   
 */
export default class Node { 
    /**
     * @param {string[][]} estadoAtual 
     * @param {Node} pai 
     * @param {Number} jogada 
     */
    constructor(estadoAtual, pai, jogada) {
        this.estadoAtual = estadoAtual;
        this.pai = pai;
        this.jogada = jogada;
    }

}