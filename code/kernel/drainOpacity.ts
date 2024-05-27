import * as kbg from "kaboom";

export default async function drainOpacity(sprite: kbg.GameObj<kbg.RectComp | kbg.ColorComp>, duration: number): Promise<void> {
  return new Promise((resolve) => {
    sprite.use(opacity(1));
    let currentOpacity = 1;
    const fadeAmount = 1 / (duration / 100);

    const interval = setInterval(() => {
      currentOpacity -= fadeAmount;
      if (currentOpacity <= 0) {
        sprite.use(opacity(0));
        clearInterval(interval);
        resolve();
      } else {
        sprite.use(opacity(currentOpacity));
      }
    }, 10);
  });
}
