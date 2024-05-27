import sleep from "./sleep";
import createFG from "./createFG";

export default async function makeTransition(color?: any, time = 0.5) {
  let fg = createFG();
  if (color)
    fg.use(color);
  fg.use(opacity(0));
  fg.use(fadeIn(time));

  await sleep(800);

  return fg;
}
