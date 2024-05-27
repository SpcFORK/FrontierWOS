
async function fadeOutByAmount(sprite, duration: number, mult: number) {
  return new Promise((resolve) => {
    sprite.use(opacity(1));
    let currentOpacity = 1;

    const fadeAmount = 1 / (duration / 100);
    const interval = setInterval(() => {
      currentOpacity -= fadeAmount;
      if (currentOpacity <= 0) {
        sprite.use(opacity(0));
        clearInterval(interval);
        resolve(null);
      } else {
        sprite.use(opacity(currentOpacity * mult));
      }
    }, 10);

  });
}
