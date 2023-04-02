import ativaBotoesJogo from "./util/ativaBotoesJogo.js";
import atualizaTextoJogadorDaVez from "./util/atualizaTextoJogadorDaVez.js";
import { colunas } from "./data/dimensoes.js";
import elementos from "./data/elementos.js";
import { ativaBotoesTelaFinal, ativaLinkLogo } from "./util/links.js";
import renderizaMatrizJogo from "./util/renderizaMatrizJogo.js";

const estado = [
  `${elementos.vazio} `.repeat(colunas).trim().split(" "),
  `${elementos.vazio} `.repeat(colunas).trim().split(" "),
  `${elementos.vazio} `.repeat(colunas).trim().split(" "),
  `${elementos.vazio} `.repeat(colunas).trim().split(" "),
  `${elementos.vazio} `.repeat(colunas).trim().split(" "),
  `${elementos.vazio} `.repeat(colunas).trim().split(" ")
];

const oponente = document.location.search.includes("ia") ? "ia" : "amigo";

document.addEventListener("DOMContentLoaded", () => {
    
  ativaLinkLogo();
  renderizaMatrizJogo();
  atualizaTextoJogadorDaVez(oponente, estado);
  ativaBotoesJogo(estado, oponente);
  ativaBotoesTelaFinal();

});
