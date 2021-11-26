import Game, { DIM_X, DIM_Y } from './game.js';
import GameView from './game_view.js';

document.addEventListener('DOMContentLoaded', function(){
  const canvasEl = document.getElementById('myCanvas');
  canvasEl.width = DIM_X;
  canvasEl.height = DIM_Y;
  const ctx = canvasEl.getContext('2d');

  const game = new Game();
  new GameView(game, ctx).start();
});
