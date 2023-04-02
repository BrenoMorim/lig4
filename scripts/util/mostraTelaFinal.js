import elementos from "./elementos.js";

/**
 * Torna a tela final visível caso haja um ganhador,
 * atualizando o CSS para combinar a cor de fundo com a do ganhador.
 * 
 * @param {string} ganhador 
 */
export default function mostraTelaFinal(ganhador) {
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
