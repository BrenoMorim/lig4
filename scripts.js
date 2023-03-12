document.addEventListener("DOMContentLoaded", () => {

    document.querySelector(".cabecalho__logo").addEventListener("click", () => {
        document.location.href = '/';
    });

    document.querySelector("#jogar-ia").addEventListener("click", () => {
        document.location.href = '/jogo.html?oponente=ia';
    });

    document.querySelector("#jogar-amigo").addEventListener("click", () => {
        document.location.href = '/jogo.html?oponente=amigo';
    });

});
