import { colunas, linhas } from "./dimensoes.js";
import elementos from "./elementos.js";
import ganhadores from "./ganhadores.js";

/**
 * Retorna o ganhador da partida, retornando amarelo, azul ou
 * nenhum, caso não houver ganhador ainda.
 * 
 * @param {string[][]} estadoAtual
 * @returns O ganhador dado o estado de uma partida
 */
export default function getGanhador(estadoAtual) {
  let chave = estadoAtual.flat(1).join("")
    .replaceAll(elementos.vazio, 0)
    .replaceAll(elementos.azul, 1)
    .replaceAll(elementos.amarelo, 2);

  if (ganhadores[chave] !== undefined) return ganhadores[chave];

  let resultado = "nenhum";
  const ganhadorHorizontal = getGanhadorLinhaReta(estadoAtual, true);
  const ganhadorVertical = getGanhadorLinhaReta(estadoAtual, false);
  const ganhadorDiagonal = getGanhadorDiagonal(estadoAtual, false);
  const ganhadorDiagonalInversa = getGanhadorDiagonal(estadoAtual, true);
    
  if (ganhadorHorizontal !== "nenhum") {
    resultado = ganhadorHorizontal;
  } else if (ganhadorVertical !== "nenhum") {
    resultado = ganhadorVertical;
  } else if (ganhadorDiagonal !== "nenhum") {
    resultado = ganhadorDiagonal;
  } else if (ganhadorDiagonalInversa !== "nenhum") {
    resultado = ganhadorDiagonalInversa;
  }
    
  ganhadores[chave] = resultado;
  return resultado;
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
    for (let j = 0; j < colunas / 2; j++) {
      for (let i = 0; i < linhas; i++) {
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
