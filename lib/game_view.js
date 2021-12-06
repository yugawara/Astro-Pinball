import Game from './game.js';
let shouldAnimate = true
let previousGameView
class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    this.counter = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.counter += 1
    this.game.step();
    this.game.draw(this.ctx);
    if (shouldAnimate) {
      requestAnimationFrame(this.animate.bind(this));
    }else{
      previousGameView = this
    }
  }
}

export const startGameView = () => {
  const canvasEl = document.getElementById('myCanvas');
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  const ctx = canvasEl.getContext('2d');
  const game = new Game();
  new GameView(game, ctx).start();
}


const mouseHandler = (e) => {
  console.log(e)
}
const canvasEl = document.getElementById('myCanvas');
canvasEl.addEventListener("mousedown", mouseHandler, false);

const stopStartHandler = (e) => {
  if (e.keyCode === 83) {
    if (shouldAnimate) {
      // this will prevent further continuation of callbacks
      shouldAnimate = false;
    } else {
      shouldAnimate = true
      requestAnimationFrame(previousGameView.animate.bind(previousGameView));
    }
  }
}
document.addEventListener("keydown", stopStartHandler, false);

const muteHandler = (e) => {
  if (e.keyCode === 77) {
    muteAudio();
  }
}
document.addEventListener("keydown", muteHandler, false);


const muteAudio = () => {
  const audio = document.getElementById('audio');
  const bell = document.getElementById('bell');
  const thud = document.getElementById('thud');
  const flip = document.getElementById('flip');

  // plays the background music
  // playing html audio backround seems tricky.
  // evidently this kind of programatic action is necessary.
  audio.play()

  if (audio.muted === false) {
    document.getElementById('audio').muted = true;
    document.getElementById('bell').muted = true;
    document.getElementById('thud').muted = true;
    document.getElementById('flip').muted = true;
  }
  else {
    document.getElementById('audio').muted = false;
    document.getElementById('bell').muted = false;
    document.getElementById('thud').muted = false;
    document.getElementById('flip').muted = false;
  }
}
export default GameView;
