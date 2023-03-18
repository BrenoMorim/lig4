# Ligue 4

Um jogo online desenvolvido com HTML, CSS e JS puros. Usando o algoritmo Minimax para criar uma inteligência artificial capaz de sempre vencer nesse jogo.

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | **Ligue 4**
| :label: Tecnologias | HTML, CSS, JS
| :rocket: URL         | <https://brenomorim.github.io/lig4/>

![Exemplo de uma partida do jogo](https://raw.githubusercontent.com/BrenoMorim/lig4/main/imagens/pagina-jogo.png?raw=true#vitrinedev)

---

## Detalhes

O projeto não utiliza nenhuma dependência externa nem nenhum gerenciador de pacotes para ser colocado em produção de forma mais fácil através do GitHub Pages. Por conta disso não é possível exportar e importar funções entre arquivos js, o que fez com que alguns arquivos ficassem muito extensos. A biblioteca Animate.css foi utilizada para fazer as animações.

---

## Estrutura do projeto

- assets: contém as imagens do projeto
  - amarelo.png: Ficha amarela
  - azul.png: Ficha azul
  - logo.png: Logo da Lig4
- css: contém o CSS das imagens
  - index.css: CSS da página inicial
  - jogo.css: CSS da página de jogo
  - style.css: Centraliza todos os imports de CSS e os estilos comuns
  - reset.css: Normaliza o CSS do navegador
- imagens: screenshots a serem usadas nesse arquivo README.md
  - pagina-inicial.png
  - pagina-jogo.png
  - tela-final.png
- scripts: contém os arquivos JS
  - jogo.js: Lógica do jogo, contendo o algoritmo minimax
  - links.js: Faz os links da página inicial funcionarem
  - renderizaPaginaJogo.js: Renderiza o HTML da página de jogo dinamicamente
- index.html: HTML da página inicial
- jogo.html: HTML da página de jogo
- favicon.ico: Ícone a ser mostrado na guia

---

## Páginas

### Página Inicial

Contém os links para a página de jogo, assim como uma chamada, explicando como o jogo funciona.

![Página inicial](./imagens/pagina-inicial.png)

### Página do Jogo

Contém o "tabuleiro" do jogo, contendo o estado atual, assim como os botões de ação.

![Página do jogo](./imagens/pagina-jogo.png)

### Tela Final

Aparece quando o jogo está com um vencedor definido, mostrando quem foi o ganhador e contendo links para jogar novamente ou voltar para a página inicial.

![Tela final do jogo](./imagens/tela-final.png)

---
