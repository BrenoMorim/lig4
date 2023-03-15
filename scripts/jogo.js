const colunas = 9;
const linhas = 6;

const estado = [
    "vazio ".repeat(colunas).trim().split(' '),
    "vazio ".repeat(colunas).trim().split(' '),
    "vazio ".repeat(colunas).trim().split(' '),
    "vazio ".repeat(colunas).trim().split(' '),
    "vazio ".repeat(colunas).trim().split(' '),
    "vazio ".repeat(colunas).trim().split(' ')
];

let jogadas = 0;

const oponente = document.location.search.includes("ia") ? "ia" : "amigo";

function getJogadorDaVez(jogadas) {
    if (jogadas % 2 == 0) 
        return "azul";
    return "amarelo";
}

function atualizaTextoJogadorDaVez() {
    const paragrafo = document.querySelector(".jogo__texto");
    const jogadorDaVez = getJogadorDaVez(jogadas);
    document.getElementById("jogador-da-vez").textContent = jogadorDaVez;
    paragrafo.classList.add(`fundo--${jogadorDaVez}`);
    paragrafo.classList.remove(`fundo--${getJogadorDaVez(jogadas + 1)}`);
}

function adicionarFicha(posicao) {
    let i = linhas - 1;
    while (i >= 0) {
        if (estado[i][posicao] === 'vazio') {
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

function getJogadas(estadoAtual) {
    let contagem = 0;
    for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
            if (estadoAtual[i][j] !== "vazio") contagem++;
        }
    }
    return contagem;
}

function recebeAcaoDoUsuario(posicao) {
    if (estado[0][posicao] !== "vazio" || jogoAcabou(estado)) return;
    if (oponente === "ia" && getJogadorDaVez(jogadas) === "amarelo") return;
    adicionarFicha(posicao);
}

function jogoAcabou(estadoAtual) {
    if (getGanhador(estadoAtual) !== "nenhum") {
        return true;
    }
    if (estadoAtual[0].join(' ').includes("vazio") === false) {
        return true;
    }
    return false;
}

function getGanhador(estadoAtual) {
    const ganhadorHorizontal = getGanhadorLinhaReta(estadoAtual, true);
    const ganhadorVertical = getGanhadorLinhaReta(estadoAtual, false);
    const ganhadorDiagonal = getGanhadorDiagonal(estadoAtual);
    const ganhadorDiagonalInversa = getGanhadorDiagonalInversa(estadoAtual);
    
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
            if (celula == "azul") {
                contagemAzul++;
                if (contagemAzul >= 4) {
                    return "azul";
                }
            } else {
                contagemAzul = 0;
            }
            if (celula == "amarelo") {
                contagemAmarelo++;
                if (contagemAmarelo >= 4) {
                    return "amarelo";
                }
            } else {
                contagemAmarelo = 0;
            }
        }
    }
    return "nenhum";
}

function getGanhadorDiagonal(estadoAtual) {
    for (let k = 0; k < linhas; k++) {
        let contagemAmarelo = 0;
        let contagemAzul = 0;
        for (let i = linhas - 1; i >= 0; i--) {    
            for (let j = 0; j < i; j++) {
                const celula = estadoAtual[i - j][j + k];
                if (celula == "azul") {
                    contagemAzul++;
                    if (contagemAzul >= 4) {
                        return "azul";
                    }
                } else {
                    contagemAzul = 0;
                }
                if (celula == "amarelo") {
                    contagemAmarelo++;
                    if (contagemAmarelo >= 4) {
                        return "amarelo";
                    }
                } else {
                    contagemAmarelo = 0;
                }
            }
        }
    }
    
    return "nenhum";
}

function getGanhadorDiagonalInversa(estadoAtual) {
    for (let i = linhas - 1; i >= 0; i--) {
        let contagemAzul = 0;
        let contagemAmarelo = 0;
        for (let j = colunas - 1; j >= 0; j--) {
            for (let k = 0; (i - k >= 0) && (j - k >= 0); k++) {
                const celula = estadoAtual[i - k][j - k];
                if (celula === "azul") {
                    contagemAzul++;
                    if (contagemAzul >= 4) {
                        return "azul";
                    }
                } else {
                    contagemAzul = 0;
                }
                if (celula === "amarelo") {
                    contagemAmarelo++;
                    if (contagemAmarelo >= 4) {
                        return "amarelo";
                    }
                } else {
                    contagemAmarelo = 0;
                }
            }
        }
    }
    
    return "nenhum";
}

function mostraTelaFinal(ganhador) {
    const telaFinal = document.querySelector(".final");
    const botaoFinal = document. querySelector(".final__botao");

    telaFinal.style.display = "flex";

    if (ganhador == "amarelo") {
        telaFinal.classList.add("fundo--amarelo");
        telaFinal.classList.remove("fundo--azul");

        botaoFinal.classList.add("fundo--azul");
        botaoFinal.classList.add("fundo--amarelo");
    }
    document.getElementById("ganhador").textContent = ganhador;
}

function realizaJogadaIA() {
    if (!jogoAcabou(estado)) {
        adicionarFicha(minimax(estado));
    }
}

function getPossiveisJogadas(estadoAtual) {
    const jogadas = [];
    estadoAtual[0].forEach((valor, posicao) => {
        if (valor === "vazio") jogadas.push(posicao);
    });
    return jogadas;
}

function resultadoJogada(estadoAtual, posicao) {
    const resultado = JSON.parse(JSON.stringify(estadoAtual));
    let i = linhas - 1;
    while (i >= 0) {
        if (resultado[i][posicao] === 'vazio') {
            resultado[i][posicao] = getJogadorDaVez(jogadas);
            break;
        }
        i--;
    }
    return resultado;
}

function utilidade(estadoAtual) {
    const ganhador = getGanhador(estadoAtual);
    if (ganhador === "azul") {
        return 1;
    } else if (ganhador === "amarelo") {
        return -1;
    }
    return 0;
}

function minimax(estadoAtual) {
    if (jogoAcabou(estadoAtual)) return undefined;
    const nodes = getPossiveisJogadas(estadoAtual)
        .map(jogada => {
            return new Node(resultadoJogada(estadoAtual, jogada), undefined, jogada);
        });
    valores = nodes.map(node => minimaxRecursivo(node, 4));

    let index;
    if (getJogadorDaVez(getJogadas(estadoAtual)) === 'azul') {
        index = valores.indexOf(Math.max(...valores));
    } else {
        index = valores.indexOf(Math.min(...valores));
    }

    let node = nodes[index];
    while (node?.pai !== undefined) {
        node = node.pai;
    }
    return node.jogada;
}

function minimaxRecursivo(node, profundidade) {
    if (profundidade === 0 || jogoAcabou(node.estadoAtual)) {
        return utilidade(node.estadoAtual);
    }

    if (getJogadorDaVez(getJogadas(node.estadoAtual)) === "azul") {
        let valor = -100;
        getPossiveisJogadas(node.estadoAtual)
            .map(jogada => (new Node(resultadoJogada(node.estadoAtual, jogada), node, jogada)))
            .forEach(nodeFilho => {
                valor = Math.max(valor, minimaxRecursivo(nodeFilho, profundidade - 1))
            });
        return valor;
    } else {
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
        botao.addEventListener('click', () => {
            recebeAcaoDoUsuario(Number(botao.id.at(-1)));
            if (oponente === "ia" && getJogadorDaVez(jogadas) === "amarelo") {
                realizaJogadaIA();
            }
        });
    });
});

class Node {
    
    constructor(estadoAtual, pai, jogada) {
        this.estadoAtual = estadoAtual;
        this.pai = pai;
        this.jogada = jogada;
    }

}
