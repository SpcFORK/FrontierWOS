import * as kbg from "kaplay";

export default function createFG(): kbg.GameObj<kbg.RectComp | kbg.ColorComp> {
  let fg = add([
    rect(width(), height()),
    color(0, 0, 0),
  ]);
  return fg;
}
