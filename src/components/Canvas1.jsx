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
  p5.setup = () => p5.createCanvas(600, 400);

  p5.draw = () => {};
}
