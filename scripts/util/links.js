/**
 * Torna os links da página de chamada funcionais
 */
export function ativaLinksChamada() {

  // Configurando os links da chamada
  const linkIA = document.getElementById("jogar-ia");
  const linkAmigo = document.getElementById("jogar-amigo");

  if (estaEmProducao()) {
    linkIA.setAttribute("href", "/lig4/jogo.html?oponente=ia");
    linkAmigo.setAttribute("href", "/lig4/jogo.html?oponente=amigo");
  } else {
    linkIA.setAttribute("href", "/jogo.html?oponente=ia");
    linkAmigo.setAttribute("href", "/jogo.html?oponente=amigo");
  }
}

export function ativaLinkLogo() {
  document.querySelector(".cabecalho__logo").addEventListener("click", () => {
    // Ambiente de produção
    if (estaEmProducao()) {
      document.location.href = "/lig4";
    } else {
      // Ambiente de Desenvolvimento
      document.location.href = "/";
    }
  });
}

export function ativaBotoesTelaFinal() {
  // Faz o botão de voltar ao início da tela final funcionar
  const link = document.getElementById("voltar-inicio");
  if (estaEmProducao()) {
    link.setAttribute("href", "/lig4");
  } else {
    link.setAttribute("href", "/");
  }

  // Faz o botão de jgoar novamente da tela final funcionar
  document.getElementById("jogar-novamente").addEventListener("click", () => {
    document.location.reload();
  });

  // Botão de esconder tela final
  document.getElementById("esconder-tela").addEventListener("click", () => {
    document.querySelector(".final").style.display = "none";
  });

  if (!document.location.search.includes("ia")) {
    document.getElementById("fazer-jogada-ia").style.display = "none";
  }
}

/**
 * Verifica qual é o ambiente atual da aplicação através da URL
 * 
 * @returns Se o ambiente atual é o de produção ou o de desenvolvimento
 */
export function estaEmProducao() {
  return !(document.location.href.includes("localhost") || document.location.href.includes("127.0.0.1"));
}
