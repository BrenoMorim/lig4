import { colunas, linhas } from "../data/dimensoes.js";
import elementos from "../data/elementos.js";
import ganhadores from "../data/ganhadores.js";

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

  const resultado =
    getGanhadorLinhaReta(estadoAtual, true) ||
    getGanhadorLinhaReta(estadoAtual, false) ||
    getGanhadorDiagonal(estadoAtual, false) ||
    getGanhadorDiagonal(estadoAtual, true) || 
    { jogador: "nenhum", posicoes: [] };
    
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
  let iMaximo = horizontal ? linhas : colunas;
  let jMaximo = horizontal ? colunas : linhas;

  for (let i = 0; i < iMaximo; i++) {
    let contagem = 0;
    let jogadorAtual = null;

    for (let j = 0; j < jMaximo; j++) {
      const celula = horizontal
        ? estadoAtual[i][j]
        : estadoAtual[j][i];

      if (celula !== elementos.vazio && celula === jogadorAtual) {
        contagem++;
      } else {
        jogadorAtual = celula;
        contagem = celula === elementos.vazio ? 0 : 1;
      }

      if (contagem === 4) {
        return {
          jogador: jogadorAtual,
          posicoes: Array.from({ length: 4 }, (_, k) =>
            horizontal
              ? { i, j: j - 3 + k }
              : { i: j - 3 + k, j: i }
          )
        };
      }
    }
  }
  return null;
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
  const estadoAtual = JSON.parse(JSON.stringify(estadoAtualParametro));

  if (inversa) {
    for (let j = 0; j < colunas / 2; j++) {
      for (let i = 0; i < linhas; i++) {
        [estadoAtual[i][j], estadoAtual[i][colunas - j - 1]] =
        [estadoAtual[i][colunas - j - 1], estadoAtual[i][j]];
      }
    }
  }

  for (let i = 0; i < linhas - 3; i++) {
    for (let j = 0; j < colunas - 3; j++) {
      let contagem = 0;
      let jogadorAtual = null;

      for (let k = 0; i + k < linhas && j + k < colunas; k++) {
        const celula = estadoAtual[i + k][j + k];

        if (celula !== elementos.vazio && celula === jogadorAtual) {
          contagem++;
        } else {
          jogadorAtual = celula;
          contagem = celula === elementos.vazio ? 0 : 1;
        }

        if (contagem === 4) {
          const posicoes = Array.from({ length: 4 }, (_, n) => {
            const col = j + k - 3 + n;
            return inversa
              ? { i: i + k - 3 + n, j: colunas - col - 1 }
              : { i: i + k - 3 + n, j: col };
          });

          return { jogador: jogadorAtual, posicoes };
        }
      }
    }
  }
  return null;
}
