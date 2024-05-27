import * as kbg from "kaboom";


async function scaleTween(sprite: kbg.GameObj, duration: number, mult: number, sine: kbg.EaseFunc = easings.easeOutQuad): Promise<kbg.TweenController> {
  const startScale = sprite.scale || (sprite.use(scale(1)), vec2(1));
  const endScale = startScale.clone().scale(mult);

  return tween(
    startScale,
    endScale,
    duration,
    (newScale) => {
      sprite.scale = newScale;
    },
    sine
  );
}
