import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useRef, useState } from "react";
let mousePointer;
export default function Canvas3() {
  mousePointer = useRef({ x: undefined, y: undefined });
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
  p5.mousePressed = () => mousePressed(p5);
  p5.mouseReleased = mouseReleased;
}

function setup(p5) {
  return () => {
    console.log("ran setup");
    //   p5.createCanvas(600, 400, p5.WEBGL);
    p5.createCanvas(600, 400);
  };
}
function mousePressed(p5) {
  // console.log(p5);
  mousePointer.current.x = p5.mouseX;
  mousePointer.current.y = p5.mouseY;
}
function mouseReleased() {
  mousePointer.current.x = undefined;
  mousePointer.current.y = undefined;
}

function draw(p5) {
  console.log("ran draw");
  const bubbles = [];
  for (let index = 0; index < 50; index++) {
    const diameter = p5.random(5, 20);
    const positionX = p5.random(diameter, 600 - diameter);
    const positionY = p5.random(diameter, 400 - diameter);
    const speedX = p5.random(0, 3);
    const speedY = p5.random(0, 3);

    const buble = { diameter, positionX, positionY, speedX, speedY };
    bubbles.push(buble);
  }
  return () => {
    // console.log("t");
    p5.background(0, 0, 0);

    bubbles.forEach((bubble, i) => {
      //// click force apply here
      if (mousePointer.current.x) {
        // console.log(mousePointer.current.x, mousePointer.current.y);
        const distance2 = p5.dist(
          bubble.positionX,
          bubble.positionY,
          mousePointer.current.x,
          mousePointer.current.y,
        );
        // Check if the bubble is within the radius of 50 from the clicked point
        if (distance2 < 100) {
          // Calculate the angle between the bubble and the clicked point
          const angle = p5.atan2(
            bubble.positionY - mousePointer.current.y,
            bubble.positionX - mousePointer.current.x,
          );

          // Move the bubble away from the clicked point in the opposite direction
          bubble.positionX += p5.cos(angle) * 5;
          bubble.positionY += p5.sin(angle) * 5;
        }
      }

      /// consolation lines
      for (let index = i; index < bubbles.length; index++) {
        const distance = p5.dist(
          bubble.positionX,
          bubble.positionY,
          bubbles[index].positionX,
          bubbles[index].positionY,
        );
        // console.log(i, bubble.positionX, bubbles[i].positionX);
        if (distance < 50) {
          p5.line(
            bubble.positionX,
            bubble.positionY,
            bubbles[index].positionX,
            bubbles[index].positionY,
          );
          // const color = p5.map(distance, 0, 50, 0, 255);
          p5.strokeWeight(2);
          p5.stroke(255, 0, 0);
        }
      }
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
