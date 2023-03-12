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
    if (estado[0][posicao] !== "vazio" || jogoAcabou()) return;
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
    if (jogoAcabou()) {
        mostraTelaFinal(getGanhador());
    }
}

function jogoAcabou() {
    if (jogadas >= (linhas * colunas)) {
        return true;
    }
    if (getGanhador() !== "nenhum") {
        return true;
    }
    return false;
}

function getGanhador() {
    const ganhadorHorizontal = getGanhadorLinhaReta(true);
    const ganhadorVertical = getGanhadorLinhaReta(false);
    const ganhadorDiagonal = getGanhadorDiagonal();
    const ganhadorDiagonalInversa = getGanhadorDiagonalInversa();
    
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

function getGanhadorLinhaReta(horizontal = true) {
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
            const celula = horizontal ? estado[i][j] : estado[j][i];
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

function getGanhadorDiagonal() {
    for (let k = 0; k < linhas; k++) {

        for (let i = linhas - 1; i >= 0; i--) {    
            for (let j = 0; j < i; j++) {
                const celula = estado[i - j][j + k];
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

function getGanhadorDiagonalInversa() {
    for (let i = linhas - 1; i >= 0; i--) {
        for (let j = colunas - 1; j >= 0; j--) {
            for (let k = 0; (i - k >= 0) && (j - k >= 0); k++) {
                const celula = estado[i - k][j - k];
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

document.addEventListener("DOMContentLoaded", () => {
    atualizaTextoJogadorDaVez();
    document.querySelectorAll(".matriz__botao").forEach(botao => {
        botao.addEventListener('click', () => adicionarFicha(Number(botao.id.at(-1))));
    });
    document.querySelector(".final__botao").addEventListener("click", () => {
        document.location.href = '/';
    });
});
