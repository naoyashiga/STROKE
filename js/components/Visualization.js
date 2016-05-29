import P5 from "p5";
import ColorPalette from "../ColorPalette";

class Visualization {
  constructor(cb) {
    this.sketch = new P5(sketch);

    cb();
  }
}

const sketch = (p) => {

  const density = 3;

  p.setup = function() {
    let colorTheme = getRandomArrayIndex(ColorPalette);
    let bgColorIndex = getRandomArrayIndex(ColorPalette[colorTheme]);
    let xoff = 1;

    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(ColorPalette[colorTheme][bgColorIndex]);

    p.noLoop();

    p.strokeWeight(20);
    p.noiseSeed(p.random(100));

    for(var i = 0; i < p.windowWidth; i += density) {
      var strokeColorIndex = getRandomArrayIndex(ColorPalette[colorTheme]);

      p.stroke(ColorPalette[colorTheme][strokeColorIndex]);

      var p1 = {x: i, y: 0},
      p2 = {x: p.noise(xoff) * p.windowWidth, y: p.windowHeight},
      p3 = {x: p.windowWidth / 2, y: p.windowHeight / 2},
      p4 = {x: i + density, y: p.windowHeight};

      p.line(p1.x, p1.y, p2.x, p2.y);

      xoff += 0.01;
    }
  }

  p.mousePressed = function() {
    p.clear();
    p.setup();
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);

    p.setup();
  }

  function getRandomArrayIndex(arry) {
    return Math.floor(p.random(arry.length));
  }
}

export default Visualization;
