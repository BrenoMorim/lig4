import jogoAcabou from "../jogoAcabou.js";
import getJogadorDaVez from "../getJogadorDaVez.js";
import getJogadas from "../getJogadas.js";
import resultadoJogada from "./resultadoJogada.js";
import utilidade from "./utilidade.js";
import getPossiveisJogadas from "./getPossiveisJogadas.js";
import Node from "./Node.js";
import elementos from "../elementos.js";

/**
 * Usa recursividade para analisar o valor atrelado a um Node,
 * analisando não só o estado desse Node, mas também o valor dos
 * outros Nodes que podem ser alcançados por essa ação.
 * 
 * @param {Node} node
 * @param {Number} profundidade
 * @returns O valor relacionado a esse Node
 */
export default function minimaxRecursivo(node, profundidade) {
  if (profundidade === 0 || jogoAcabou(node.estadoAtual)) {
    return utilidade(node.estadoAtual);
  }
  const nodes = getPossiveisJogadas(node.estadoAtual)
    .map(jogada => (new Node(resultadoJogada(node.estadoAtual, jogada), node, jogada)));
    
  if (getJogadorDaVez(getJogadas(node.estadoAtual)) === elementos.azul) {
    // Max Player, o valor do Node é definido pelo maior valor que há entre seus Nodes filhos
    let valor = -100;
    nodes.forEach(nodeFilho => {
      valor = Math.max(valor, minimaxRecursivo(nodeFilho, profundidade - 1));
    });
    return valor;
  } else {
    // Min Player, o valor do Node é definido pelo menor valor que pode ser alcançado por esse estado
    let valor = 100;
    nodes.forEach(nodeFilho => {
      valor = Math.min(valor, minimaxRecursivo(nodeFilho, profundidade - 1));
    });
    return valor;
  }
}