import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Canvas3() {
  const ref = useRef();
  const [state, setState] = useState(0);

  return (
    <>
      <ReactP5Wrapper sketch={sketch} />;
      <button onClick={() => setState((prev) => (prev += 1))}>clic</button>
      <h1>{state}</h1>
    </>
  );
}

function sketch(p5) {
  console.log("ran");
  p5.setup = setup(p5);
  p5.draw = draw(p5);
}

function setup(p5) {
  return () => {
    console.log("h");
    //   p5.createCanvas(600, 400, p5.WEBGL);
    p5.createCanvas(600, 400);
  };
}

function draw(p5) {
  let bubbles = [];
  for (let index = 0; index < 50; index++) {
    const diameter = p5.random(20);
    const positionX = p5.random(500 + diameter);
    const positionY = p5.random(300 + diameter);
    const speedX = p5.random(5);
    const speedY = p5.random(5);

    const buble = { diameter, positionX, positionY, speedX, speedY };
    bubbles.push(buble);
  }
  return () => {
    // console.log("t");
    p5.background(0, 0, 0);
    bubbles.forEach((bubble) => {
      p5.fill(255, 255, 255);
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
  };
}
