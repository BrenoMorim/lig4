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

function getJogadorDaVez(jogadas) {
    if (jogadas % 2 == 0) 
        return elementos.azul;
    return elementos.amarelo;
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

function getJogadas(estadoAtual) {
    let contagem = 0;
    for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
            if (estadoAtual[i][j] !== elementos.vazio) contagem++;
        }
    }
    return contagem;
}

function recebeAcaoDoUsuario(posicao) {
    if (estado[0][posicao] !== elementos.vazio || jogoAcabou(estado)) return;
    if (oponente === "ia" && getJogadorDaVez(jogadas) === elementos.amarelo) return;
    adicionarFicha(posicao);
}

function jogoAcabou(estadoAtual) {
    if (getGanhador(estadoAtual) !== "nenhum") {
        return true;
    }
    if (estadoAtual[0].join(' ').includes(elementos.vazio) === false) {
        return true;
    }
    return false;
}

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

function getGanhadorDiagonal(estadoAtualParametro, inversa = false) {
    const estadoAtual = JSON.parse(JSON.stringify(estadoAtualParametro));
    if (inversa) {
        for (j = 0; j < colunas / 2; j++) {
            for (i = 0; i < linhas; i++) {
                let temp = estadoAtual[i][j];
                estadoAtual[i][j] = estadoAtual[i][colunas - j - 1];
                estadoAtual[i][colunas - j - 1] = temp;
            }
        }
    }
    for (let k = 0; k < linhas; k++) {
        let contagemAmarelo = 0;
        let contagemAzul = 0;
        for (let i = linhas - 1; i >= 0; i--) {    
            for (let j = 0; j < i; j++) {
                const celula = estadoAtual[i - j][j + k];
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
            }
        }
    }
    return "nenhum";
}

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

function realizaJogadaIA() {
    if (!jogoAcabou(estado)) {
        adicionarFicha(minimax(estado));
    }
}

function getPossiveisJogadas(estadoAtual) {
    const jogadas = [];
    estadoAtual[0].forEach((valor, posicao) => {
        if (valor === elementos.vazio) jogadas.push(posicao);
    });
    return jogadas;
}

function resultadoJogada(estadoAtual, posicao) {
    const resultado = JSON.parse(JSON.stringify(estadoAtual));
    let i = linhas - 1;
    while (i >= 0) {
        if (resultado[i][posicao] === elementos.vazio) {
            resultado[i][posicao] = getJogadorDaVez(getJogadas(estadoAtual));
            break;
        }
        i--;
    }
    return resultado;
}

function utilidade(estadoAtual) {
    const ganhador = getGanhador(estadoAtual);
    if (ganhador === elementos.azul) {
        return 1;
    } else if (ganhador === elementos.amarelo) {
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

    let valores = nodes.map(node => minimaxRecursivo(node, 3));
    const indices = [];
    if (getJogadorDaVez(getJogadas(estadoAtual)) === elementos.azul) {
        const maximo = Math.max(...valores);
        valores.forEach((valor, index) => {
            if (valor === maximo) {
                indices.push(index);
            }
        });
    } else {
        const minimo = Math.min(...valores);
        valores.forEach((valor, index) => {
            if (valor === minimo) {
                indices.push(index);
            }
        });
    }
    const index = indices.at((Math.random() * 100) % indices.length)
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

    if (getJogadorDaVez(getJogadas(node.estadoAtual)) === elementos.azul) {
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
            if (oponente === "ia" && getJogadorDaVez(jogadas) === elementos.amarelo) {
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
