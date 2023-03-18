document.addEventListener('DOMContentLoaded', () => {

    document.querySelector(".cabecalho__logo").addEventListener("click", () => {
        // Ambiente de produção
        if (estaEmProducao()) {
            document.location.href = '/lig4'
        } else {
            // Ambiente de Desenvolvimento
            document.location.href = '/';
        }
    });

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
});

/**
 * Verifica qual é o ambiente atual da aplicação através da URL
 * 
 * @returns Se o ambiente atual é o de produção ou o de desenvolvimento
 */
function estaEmProducao() {
    return !(document.location.href.includes("localhost") || document.location.href.includes("127.0.0.1"));
}
