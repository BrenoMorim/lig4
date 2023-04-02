import Node from "./Node.js";
import getJogadas from "../getJogadas.js";
import getPossiveisJogadas from "./getPossiveisJogadas.js";
import melhorJogada from "./melhorJogada.js";
import jogoAcabou from "../jogoAcabou.js";
import minimaxRecursivo from "./minimaxRecursivo.js";
import getJogadorDaVez from "../getJogadorDaVez.js";
import elementos from "../elementos.js";
import resultadoJogada from "./resultadoJogada.js";

/**
 * Aplica o algoritmo Minimax para calcular qual é a melhor jogada possível em dado estado.
 * 
 * @param {string[][]} estadoAtual 
 * @returns A melhor ação que pode ser realizada nesse estado
 */
export default function minimax(estadoAtual) {
    if (jogoAcabou(estadoAtual)) return undefined;
    
    const jogadasAtuais = getJogadas(estadoAtual);
    const possiveisJogadas = getPossiveisJogadas(estadoAtual);

    // Early return para poder fazer as melhores jogadas com mais performance
    const melhorJogadaOfensiva = melhorJogada(estadoAtual, possiveisJogadas, elementos.amarelo);
    if (melhorJogadaOfensiva !== undefined) return melhorJogadaOfensiva;

    const melhorJogadaDefensiva = melhorJogada(estadoAtual, possiveisJogadas, elementos.azul);
    if (melhorJogadaDefensiva !== undefined) return melhorJogadaDefensiva;

    const nodes = possiveisJogadas.map(jogada => {
        return new Node(resultadoJogada(estadoAtual, jogada, getJogadorDaVez(jogadasAtuais)), undefined, jogada);
    });

    let valores = nodes.map(node => minimaxRecursivo(node, 3));
    const indices = [];
    if (getJogadorDaVez(getJogadas(estadoAtual)) === elementos.azul) {
        // Max Player => maximiza o valor
        const maximo = Math.max(...valores);
        valores.forEach((valor, index) => {
            if (valor === maximo) {
                indices.push(index);
            }
        });
    } else {
        // Min Player => minimiza o valor
        const minimo = Math.min(...valores);
        valores.forEach((valor, index) => {
            if (valor === minimo) {
                indices.push(index);
            }
        });
    }
    // Caso haja várias ações com um mesmo valor, escolhe uma delas aleatoriamente
    const index = indices.at((Math.random() * 100) % indices.length)
    let node = nodes[index];
    while (node?.pai !== undefined) {
        node = node.pai;
    }
    return node.jogada;
}