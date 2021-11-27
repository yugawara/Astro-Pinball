class BumperTwo {
  constructor() {
    this.radius = BumperTwo.RADIUS;
    this.color = BumperTwo.COLOR;
    this.ballPosX = 325;
    this.ballPosY = 220;
  }

  draw(ctx) {
    const img = document.getElementById('mars');
    const mars = ctx.createPattern(img, 'repeat');
    ctx.beginPath();
    ctx.arc(this.ballPosX, this.ballPosY, this.radius, 0, Math.PI*2, false);
    ctx.fillStyle = mars;
    ctx.fill();
    ctx.closePath();
  }
}

BumperTwo.RADIUS = 35;
BumperTwo.COLOR = 'lightgreen';

export default BumperTwo;
