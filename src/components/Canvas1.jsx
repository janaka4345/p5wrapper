import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useEffect, useRef } from "react";
export default function Canvas1() {
  // useEffect(() => {
  // }, []);
  return (
    <>
      <ReactP5Wrapper sketch={sketch} />;
    </>
  );
}
function sketch(p5) {
  let speedX = p5.random(5);
  let speedY = p5.random(5);
  let positionX = 30;
  let positionY = 30;
  let radius = 50;
  p5.setup = () => p5.createCanvas(600, 400);

  p5.mousePressed = () => {
    console.log(p5);
  };

  p5.draw = () => {
    p5.background(255, 0, 0);
    p5.fill(0, 255, 0);
    p5.noStroke();
    positionX + radius / 2 > p5.width || positionX < radius / 2
      ? (speedX *= -1)
      : null;
    positionY + radius / 2 > p5.height || positionY < radius / 2
      ? (speedY *= -1)
      : null;
    p5.circle((positionX += speedX), (positionY += speedY), radius);

    // p5.circle(-100, -100, 100);
  };
}
