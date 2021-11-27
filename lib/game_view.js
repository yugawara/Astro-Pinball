class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start(){
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
    // setInterval(this.animate(60), 60);
  }

  animate(time){
    const timeDiff = time - this.lastTime;
    this.game.step(timeDiff);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }



}

const muteHandler = (e) => {
    if(e.keyCode === 77) {
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
