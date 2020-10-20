window.addEventListener('keydown', teclado);

let aumenta = false;
let diminue = false;
let nutre = 0;
let canvas = document.getElementById('tabuleiro');
let context = canvas.getContext('2d');

let img = document.getElementById('bola');
let pat = context.createPattern(img, 'repeat');

let box = 32;
let cobra = [];

cobra[0] = {
  x: 8 * box,
  y: 8 * box,
};
let comida = {
  x: Math.floor(Math.random() * 15) * box,
  y: Math.floor(Math.random() * 15) * box,
};
let direcao = 'direita';

function teclado(event) {
  if (event.keyCode == 37 && direcao != 'direita') direcao = 'esquerda';
  if (event.keyCode == 38 && direcao != 'desce') direcao = 'sobe';
  if (event.keyCode == 39 && direcao != 'esquerda') direcao = 'direita';
  if (event.keyCode == 40 && direcao != 'sobe') direcao = 'desce';
}

function criarBG() {
  context.fillStyle = 'darkcyan';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
  for (i = 0; i < cobra.length; i++) {
    context.fillStyle = pat;
    context.fillRect(cobra[i].x, cobra[i].y, box, box);
  }
}

function criarComida() {
  if (nutre % 2 == 0 || cobra.length <= 5) {
    context.fillStyle = 'red';
  } else {
    context.fillStyle = 'blue';
  }
  context.fillRect(comida.x, comida.y, box - 4, box - 4);
}

function render() {
  come();
  if (cobra[0].x > 15 * box && direcao == 'direita') cobra[0].x = 0;
  if (cobra[0].x < 0 * box && direcao == 'esquerda') cobra[0].x = 16 * box;
  if (cobra[0].y > 15 * box && direcao == 'desce') cobra[0].y = 0;
  if (cobra[0].y < 0 * box && direcao == 'sobe') cobra[0].y = 16 * box;

  for (i = 1; i < cobra.length; i++) {
    if (cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y) {
      clearInterval(jogo);
      alert('recarregue para reiniciar o jogo');
    }
  }
  criarBG();
  criarCobrinha();
  criarComida();

  let posicaoX = cobra[0].x;
  let posicaoY = cobra[0].y;

  if (direcao == 'direita') posicaoX += box;
  if (direcao == 'esquerda') posicaoX -= box;
  if (direcao == 'sobe') posicaoY -= box;
  if (direcao == 'desce') posicaoY += box;

  if (aumenta) {
    aumenta = false;
  } else if (diminue) {
    cobra.pop();
    cobra.pop();
    diminue = false;
  } else {
    cobra.pop();
  }
  let novaCabeca = {
    x: posicaoX,
    y: posicaoY,
  };

  cobra.unshift(novaCabeca);
}

function come() {
  if (cobra[0].x == comida.x && cobra[0].y == comida.y) {
    comida = {
      x: Math.floor(Math.random() * 15) * box,
      y: Math.floor(Math.random() * 15) * box,
    };
    if (nutre % 2 == 0 || cobra.length <= 5) {
      aumenta = true;
      diminue = false;
    } else {
      aumenta = false;
      diminue = true;
    }
    nutre = Math.floor(Math.random() * 15);
  }
}

let jogo = setInterval(render, 100);
