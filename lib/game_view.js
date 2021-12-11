import Game from './game.js';
let shouldAnimate = true
let musicIndex = 0
const musicList = [
  'Wavecont-Inspiring-Full.mp3',
  '6-Happy-Commercial-Piano.mp3',
  'keys-of-moon-cheer-up.mp3'
]
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

const consoleLog = function(msg) {//See https://stackoverflow.com/a/27074218/470749
  var e = new Error();
  if (!e.stack)
      try {
          // IE requires the Error to actually be thrown or else the 
          // Error's 'stack' property is undefined.
          throw e;
      } catch (e) {
          if (!e.stack) {
              //return 0; // IE < 10, likely
          }
      }
  var stack = e.stack.toString().split(/\r\n|\n/);
  if (msg === '') {
      msg = '""';
  }
  console.log(msg, '          [' + stack[1] + ']');        
}

const mouseHandler = (e) => {
  console.log(e)
}
const canvasEl = document.getElementById('myCanvas');
consoleLog('a')
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

const changeMusic = () => {
  musicIndex = (musicIndex + 1) % musicList.length
  const audio = document.getElementById('audio')
  audio.src='/assets/' + musicList[musicIndex]
  console.log(audio.src)


}

const musicChangeHandler = (e) => {
  if (e.keyCode === 81) {
    changeMusic();
  }
}
document.addEventListener("keydown", musicChangeHandler, false);

const muteHandler = (e) => {
  if (e.keyCode === 77) {
    flipMuteAudio();
  }
}
document.addEventListener("keydown", muteHandler, false);


const flipMuteAudio = () => {
  const audio = document.getElementById('audio');
  const bell = document.getElementById('bell');
  const thud = document.getElementById('thud');
  const flip = document.getElementById('flip');

  // plays the background music
  // playing html audio backround seems tricky.
  // evidently this kind of programatic action is necessary.

  if (audio.muted === false) {
    document.getElementById('audio').muted = true;
    document.getElementById('bell').muted = true;
    document.getElementById('thud').muted = true;
    document.getElementById('flip').muted = true;
  }
  else {
    document.getElementById('audio').muted = false;
    audio.play()
    document.getElementById('bell').muted = false;
    document.getElementById('thud').muted = false;
    document.getElementById('flip').muted = false;
  }
}
export default GameView;
