import sToMs from "./sToMs";
import drainOpacity from "./drainOpacity";
import createFG from "./createFG";

export default async function makeIntroTransition(color?: any, time = 2) {
  let fg = createFG();
  if (color)
    fg.use(color);
  await drainOpacity(fg, sToMs(time));
  fg.destroy();
  return fg;
}
