import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useEffect, useMemo, useRef } from "react";
let bubbles = [];
export default function Canvas2() {
  const ref = useRef();
  bubbles = useMemo(() => {
    const bubbles = [];
    for (let index = 0; index < 50; index++) {
      const diameter = Math.random() * 20;
      const positionX = Math.random() * 500 + diameter;
      const positionY = Math.random() * 300 + diameter;
      const speedX = Math.random() * 5;
      const speedY = Math.random() * 5;
      const buble = { diameter, positionX, positionY, speedX, speedY };
      bubbles.push(buble);
    }
    return bubbles;
  }, []);
  return (
    <>
      <ReactP5Wrapper sketch={sketch} />;
    </>
  );
}
function sketch(p5) {
  p5.setup = () => {
    p5.createCanvas(600, 400);
  };

  p5.mousePressed = () => {
    console.log(p5);
  };

  p5.draw = () => {
    p5.background(255, 0, 0);
    bubbles.forEach((bubble) => {
      p5.fill(0, 255, 0);
      p5.noStroke();
      bubble.positionX + bubble.diameter / 2 > p5.width ||
      bubble.positionX < bubble.diameter / 2
        ? (bubble.speedX *= -1)
        : null;
      bubble.positionY + bubble.diameter / 2 > p5.height ||
      bubble.positionY < bubble.diameter / 2
        ? (bubble.speedY *= -1)
        : null;
      p5.circle(
        (bubble.positionX += bubble.speedX),
        (bubble.positionY += bubble.speedY),
        bubble.diameter,
      );
    });

    // p5.circle(0, 0, 100);
  };
}
