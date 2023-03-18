const colunas = 9;
const linhas = 6;

const elementos = {
    amarelo: "amarelo",
    azul: "azul",
    vazio: "vazio"
};

const estado = [
    `${elementos.vazio} `.repeat(colunas).trim().split(' '),
    `${elementos.vazio} `.repeat(colunas).trim().split(' '),
    `${elementos.vazio} `.repeat(colunas).trim().split(' '),
    `${elementos.vazio} `.repeat(colunas).trim().split(' '),
    `${elementos.vazio} `.repeat(colunas).trim().split(' '),
    `${elementos.vazio} `.repeat(colunas).trim().split(' ')
];

let jogadas = 0;

const oponente = document.location.search.includes("ia") ? "ia" : "amigo";

/**
 * Calcula qual é o jogador da vez, baseado no total
 * de jogadas que já foram feitas 
 */
function getJogadorDaVez(jogadas) {
    if (jogadas % 2 == 0) 
        return elementos.azul;
    return elementos.amarelo;
}

/**
 * Atualiza a visualização para mostrar de quem é a vez,
 * mudando não só o texto mas também o estilo do fundo do texto
 */
function atualizaTextoJogadorDaVez() {
    const paragrafo = document.querySelector(".jogo__texto");
    const jogadorDaVez = getJogadorDaVez(jogadas);
    document.getElementById("jogador-da-vez").textContent = jogadorDaVez;
    paragrafo.classList.add(`fundo--${jogadorDaVez}`);
    paragrafo.classList.remove(`fundo--${getJogadorDaVez(jogadas + 1)}`);
}

/**
 * Insere uma ficha da cor do jogador da vez em dada posição.
 * Atualiza tanto o conteúdo HTML da tabela, quanto a representação na 
 * variável JS estado
 * 
 * @param {Number} posicao: A posição na qual a ficha vai ser inserida 
 */
function adicionarFicha(posicao) {
    let i = linhas - 1;
    while (i >= 0) {
        if (estado[i][posicao] === elementos.vazio) {
            estado[i][posicao] = getJogadorDaVez(jogadas);
            jogadas++;
            break;
        }
        i--;
    }
    const celula = document.getElementById(`${i}x${posicao}`);
    const ficha = document.createElement("img");
    ficha.src = `assets/${estado[i][posicao]}.png`;
    ficha.className = "matriz__ficha";
    celula.appendChild(ficha);
    atualizaTextoJogadorDaVez();
    if (jogoAcabou(estado)) {
        mostraTelaFinal(getGanhador(estado));
    }
}

/**
 * Calcula quantas jogadas já foram feitas na partida,
 * contando o número de fichas na matriz
 * 
 * @param {string[][]} estadoAtual
 * @returns Quantas jogadas foram feitas
 */
function getJogadas(estadoAtual) {
    let contagem = 0;
    for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
            if (estadoAtual[i][j] !== elementos.vazio) contagem++;
        }
    }
    return contagem;
}

/**
 * Recebe e valida o input do usuário
 * 
 * @param {Number} posicao 
 */
function recebeAcaoDoUsuario(posicao) {
    if (estado[0][posicao] !== elementos.vazio || jogoAcabou(estado)) return;
    if (oponente === "ia" && getJogadorDaVez(jogadas) === elementos.amarelo) return;
    adicionarFicha(posicao);
}

/**
 * Checa se o jogo está em estado terminal, já com
 * ganhador definido ou empatado
 * 
 * @param {string[][]} estadoAtual 
 * @returns Se o jogo está acabado
 */
function jogoAcabou(estadoAtual) {
    if (getGanhador(estadoAtual) !== "nenhum") {
        return true;
    }
    if (estadoAtual[0].join(' ').includes(elementos.vazio) === false) {
        return true;
    }
    return false;
}

/**
 * Retorna o ganhador da partida, retornando amarelo, azul ou
 * nenhum, caso não houver ganhador ainda.
 * 
 * @param {string[][]} estadoAtual 
 * @returns O ganhador dado o estado de uma partida
 */
function getGanhador(estadoAtual) {
    const ganhadorHorizontal = getGanhadorLinhaReta(estadoAtual, true);
    const ganhadorVertical = getGanhadorLinhaReta(estadoAtual, false);
    const ganhadorDiagonal = getGanhadorDiagonal(estadoAtual, false);
    const ganhadorDiagonalInversa = getGanhadorDiagonal(estadoAtual, true);
    
    if (ganhadorHorizontal !== "nenhum") {
        return ganhadorHorizontal;
    } else if (ganhadorVertical !== "nenhum") {
        return ganhadorVertical;
    } else if (ganhadorDiagonal !== "nenhum") {
        return ganhadorDiagonal;
    } else if (ganhadorDiagonalInversa !== "nenhum") {
        return ganhadorDiagonalInversa;
    }
    
    return "nenhum";
}

/**
 * Verifica se há algum ganhador no estado atual, verificando
 * se há 4 fichas alinhadas de forma horizontal ou vertical.
 * 
 * @param {string[][]} estadoAtual 
 * @param {boolean} horizontal 
 * @returns O ganhador dado o estado
 */
function getGanhadorLinhaReta(estadoAtual, horizontal = true) {
    let iMaximo = colunas;
    let jMaximo = linhas;
    if (horizontal) {
        iMaximo = linhas;
        jMaximo = colunas;
    }
    for (let i = 0; i < iMaximo; i++) {
        let contagemAzul = 0;
        let contagemAmarelo = 0;
        for (let j = 0; j < jMaximo; j++) {
            const celula = horizontal ? estadoAtual[i][j] : estadoAtual[j][i];
            if (celula == elementos.azul) {
                contagemAzul++;
                if (contagemAzul >= 4) {
                    return elementos.azul;
                }
            } else {
                contagemAzul = 0;
            }
            if (celula == elementos.amarelo) {
                contagemAmarelo++;
                if (contagemAmarelo >= 4) {
                    return elementos.amarelo;
                }
            } else {
                contagemAmarelo = 0;
            }
        }
    }
    return "nenhum";
}

/**
 * Verifica se há algum ganhador no estado atual, verificando
 * se há 4 fichas alinhadas na diagonal, da esquerda para direita
 * ou da direita para esquerda.
 * 
 * @param {string[][]} estadoAtual 
 * @param {boolean} horizontal 
 * @returns O ganhador dado o estado
 */
function getGanhadorDiagonal(estadoAtualParametro, inversa = false) {

    // Faz uma cópia do estado, para garantir que não o altere
    const estadoAtual = JSON.parse(JSON.stringify(estadoAtualParametro));
    
    // Inverte a matriz, trocando as colunas
    if (inversa) {
        for (j = 0; j < colunas / 2; j++) {
            for (i = 0; i < linhas; i++) {
                let temp = estadoAtual[i][j];
                estadoAtual[i][j] = estadoAtual[i][colunas - j - 1];
                estadoAtual[i][colunas - j - 1] = temp;
            }
        }
    }

    // Verifica a partir de cada ponto de partida ixj
    for (let i = 0; i < linhas - 3; i++) {
        for (let j = 0; j < colunas - 3; j++) {
            let k = 0;
            let contagemAzul = 0;
            let contagemAmarelo = 0;
            while (i + k < linhas && j + k < colunas) {
                const celula = estadoAtual[i + k][j + k];
                if (celula === elementos.azul) {
                    contagemAzul++;
                    if (contagemAzul >= 4) {
                        return elementos.azul;
                    }
                } else {
                    contagemAzul = 0;
                }
                if (celula === elementos.amarelo) {
                    contagemAmarelo++;
                    if (contagemAmarelo >= 4) {
                        return elementos.amarelo;
                    }
                } else {
                    contagemAmarelo = 0;
                }
                k++;
            }
        }
    }
    return "nenhum";
}

/**
 * Torna a tela final visível caso haja um ganhador,
 * atualizando o CSS para combinar a cor de fundo com a do ganhador.
 * 
 * @param {string} ganhador 
 */
function mostraTelaFinal(ganhador) {
    const telaFinal = document.querySelector(".final");
    const botaoFinal = document.querySelectorAll(".final__botao");
    telaFinal.style.display = "flex";

    if (ganhador === elementos.amarelo) {
        telaFinal.classList.add("fundo--amarelo");
        telaFinal.classList.remove("fundo--azul");

        botaoFinal.forEach(botao => botao.classList.add("fundo--azul"));
        botaoFinal.forEach(botao => botao.classList.add("fundo--amarelo"));
    }
    document.getElementById("ganhador").textContent = ganhador;
}

/**
 * Chama o algoritmo de escolha de jogadas e executa a alteração.
 */
function realizaJogadaIA() {
    if (!jogoAcabou(estado)) {
        adicionarFicha(minimax(estado));
    }
}

/**
 * Dado o estado de uma partida, retorna as possíveis jogadas que podem ser escolhidas.
 * 
 * @param {string[][]} estadoAtual
 * @returns Uma lista de jogadas que podem ser realizadas
 */
function getPossiveisJogadas(estadoAtual) {
    const jogadas = [];
    estadoAtual[0].forEach((valor, posicao) => {
        if (valor === elementos.vazio) jogadas.push(posicao);
    });
    return jogadas;
}

/**
 * Retorna qual será o resultado de uma determinada ação em uma partida.
 * 
 * @param {string[][]} estadoAtual 
 * @param {Number} posicao 
 * @returns O resultado de uma jogada nessa posição
 */
function resultadoJogada(estadoAtual, posicao, jogador = getJogadorDaVez(getJogadas(estadoAtual))) {
    const resultado = JSON.parse(JSON.stringify(estadoAtual));
    let i = linhas - 1;
    while (i >= 0) {
        if (resultado[i][posicao] === elementos.vazio) {
            resultado[i][posicao] = jogador;
            break;
        }
        i--;
    }
    return resultado;
}

/**
 * Verifica qual é o ganhador de um determinado estado,
 * caso o ganhador for o jogador azul retorna 1, 
 * se for o amarelo retorna 0, e se não tiver ganhador retorna 0
 * 
 * @param {string[][]} estadoAtual
 * @returns 1, -1 ou 0, dependendo do ganhador
 */
function utilidade(estadoAtual) {
    const ganhador = getGanhador(estadoAtual);
    if (ganhador === elementos.azul) {
        return 1;
    } else if (ganhador === elementos.amarelo) {
        return -1;
    }
    return 0;
}

/**
 * Verifica se o oponente está a um passo da vitória, retornando
 * a jogada que deve ser feita para impedir a vitória do oponente.
 * 
 * @param {string[][]} estadoAtual 
 * @param {Number[]} possiveisJogadas 
 * @returns A jogada que deve ser feita
 */
function impedirVitoria(estadoAtual, possiveisJogadas) {
    const posicoes = []
    possiveisJogadas.forEach(jogada => {
        if (getGanhador(resultadoJogada(estadoAtual, jogada, elementos.azul)) === elementos.azul) {
            posicoes.push(jogada);
        }
    });
    if (posicoes.length > 0) return posicoes[0];
    return undefined;
}

/**
 * Aplica o algoritmo Minimax para calcular qual é a melhor jogada possível em dado estado.
 * 
 * @param {string[][]} estadoAtual 
 * @returns A melhor ação que pode ser realizada nesse estado
 */
function minimax(estadoAtual) {
    if (jogoAcabou(estadoAtual)) return undefined;
    
    const jogadasAtuais = getJogadas(estadoAtual);
    const possiveisJogadas = getPossiveisJogadas(estadoAtual);

    const jogada = impedirVitoria(estadoAtual, possiveisJogadas);
    if (jogada !== undefined) return jogada;

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

/**
 * Usa recursividade para analisar o valor atrelado a um Node,
 * analisando não só o estado desse Node, mas também o valor dos
 * outros Nodes que podem ser alcançados por essa ação.
 * 
 * @param {Node} node
 * @param {Number} profundidade
 * @returns O valor relacionado a esse Node
 */
function minimaxRecursivo(node, profundidade) {
    if (profundidade === 0 || jogoAcabou(node.estadoAtual)) {
        return utilidade(node.estadoAtual);
    }

    if (getJogadorDaVez(getJogadas(node.estadoAtual)) === elementos.azul) {
        // Max Player, o valor do Node é definido pelo maior valor que há entre seus Nodes filhos
        let valor = -100;
        getPossiveisJogadas(node.estadoAtual)
            .map(jogada => (new Node(resultadoJogada(node.estadoAtual, jogada), node, jogada)))
            .forEach(nodeFilho => {
                valor = Math.max(valor, minimaxRecursivo(nodeFilho, profundidade - 1))
            });
        return valor;
    } else {
        // Min Player, o valor do Node é definido pelo menor valor que pode ser alcançado por esse estado
        let valor = 100;
        getPossiveisJogadas(node.estadoAtual)
            .map(jogada => (new Node(resultadoJogada(node.estadoAtual, jogada), node, jogada)))
            .forEach(nodeFilho => {
                valor = Math.min(valor, minimaxRecursivo(nodeFilho, profundidade - 1))
            });
        return valor;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    atualizaTextoJogadorDaVez();
    document.querySelectorAll(".matriz__botao").forEach(botao => {
        // Adiciona o evento de click para os botões
        botao.addEventListener('click', () => {
            recebeAcaoDoUsuario(Number(botao.id.at(-1)));
            if (oponente === "ia" && getJogadorDaVez(jogadas) === elementos.amarelo) {
                realizaJogadaIA();
            }
        });
    });
});

class Node {
    
    /**
     * Classe que representa um Node, estado possível que pode ser alcançado
     * dado uma jogada, que armazena também qual estado o originou.
     * 
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
