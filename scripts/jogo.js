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
            jogadas ++;
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
    if (jogoAcabou(estado, jogadas)) {
        mostraTelaFinal(getGanhador(estado));
    }
}

function recebeAcaoDoUsuario(posicao) {
    if (estado[0][posicao] !== "vazio" || jogoAcabou(estado, jogadas)) return;
    if (oponente === "ia" && getJogadorDaVez(jogadas) === "amarelo") return;
    adicionarFicha(posicao);
    if (oponente == "ia") {
        realizaJogadaIA();
    }
}

function jogoAcabou(estadoAtual, numeroJogadas) {
    if (numeroJogadas >= (linhas * colunas)) {
        return true;
    }
    if (getGanhador(estadoAtual) !== "nenhum") {
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
        for (let j = colunas - 1; j >= 0; j--) {
            for (let k = 0; (i - k >= 0) && (j - k >= 0); k++) {
                const celula = estadoAtual[i - k][j - k];
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
    // TODO
}

function getPossiveisJogadas(estadoAtual) {
    const jogadas = [];
    estadoAtual[0].forEach(posicao => {
        if (posicao === "vazio") jogadas.push(posicao);
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
    // TODO
}

document.addEventListener("DOMContentLoaded", () => {
    atualizaTextoJogadorDaVez();
    document.querySelectorAll(".matriz__botao").forEach(botao => {
        botao.addEventListener('click', () => recebeAcaoDoUsuario(Number(botao.id.at(-1))));
    });
});

class Node {
    
    constructor(estadoAtual, pai, jogada) {
        this.estadoAtual = estadoAtual;
        this.pai = pai;
        this.jogada = jogada;
    }

}
