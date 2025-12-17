export function desenhaLinhaVencedora(posicoes) {
  const matriz = document.querySelector(".jogo__matriz");
  const primeira = document.getElementById(`${posicoes[0].i}x${posicoes[0].j}`);
  const ultima = document.getElementById(`${posicoes[3].i}x${posicoes[3].j}`);
  const linha = document.createElement("div");

  const rect = matriz.getBoundingClientRect();

  const r1 = primeira.getBoundingClientRect();
  const r2 = ultima.getBoundingClientRect();

  const x1 = r1.left + r1.width / 2 - rect.left;
  const y1 = r1.top + r1.height / 2 - rect.top;
  const x2 = r2.left + r2.width / 2 - rect.left;
  const y2 = r2.top + r2.height / 2 - rect.top;

  const comprimento = Math.hypot(x2 - x1, y2 - y1);
  const angulo = Math.atan2(y2 - y1, x2 - x1);

  linha.style.position = "absolute";
  linha.style.height = "4px";
  linha.style.backgroundColor = "var(--preto)";
  linha.style.zIndex = "2";
  linha.style.width = `${comprimento}px`;
  linha.style.left = `${x1}px`;
  linha.style.top = `${y1}px`;
  linha.style.borderRadius = "16px";
  linha.style.transform = `rotate(${angulo}rad)`;
  linha.style.transformOrigin = "0 50%";
  matriz.appendChild(linha);
}
