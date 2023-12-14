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
  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.draw = () => {
    // console.log(p5.pmouseX, p5.pwinMouseX);
    p5.background(255, 0, 0);
    p5.rect(-100, -100, 50, 50);
    // p5.circle(-100, -100, 100);
  };
}
