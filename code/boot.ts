import qe from "./kernel/qe";
import sleep from "./kernel/sleep";
import msToS from "./kernel/msToS";
import sToMs from "./kernel/sToMs";
import makeTransition from "./kernel/makeTransition";
import Prompt from "./kernel/Prompt";
import escHandler from "./kernel/escHandler";

// ---
scene('boot', async () => {
  let boot = qe.$(['wos', 'boot']);
  setBackground(BLACK);

  let left_ = false;
  let est = escHandler('actual', () => {
    left_ = true;
  });

  let prompt = new Prompt(0.5);
  prompt.ena();
  // prompt.group.use(fadeIn(0.5))
  let topRightBean = add([
    anchor('topright'),
    sprite('bean'),
    pos(width() - 10, 10),
    scale(1.3)
  ]);

  topRightBean.flipX = true;

  async function thread1() {
    let pl_str = [
      'Hello, World of Space!',
      'This is a demo of World of Space.',
      'An Web OS which natively is bundled with WOSScript.',
    ].join('\n');

    await prompt.typewrite(pl_str, msToS(10));
    prompt.dis();
    await wait(2);
    await prompt.delete(pl_str.length, msToS(3));
    await wait(1);
    await thread2();
  }

  let pr2 = new Prompt(0.5);
  let pr3 = new Prompt(0.9);
  pr3.setPos(vec2(0, 4 * 18));
  pr3.dis();
  pr2.setPos(vec2(0, 6 * 18));

  async function thread2() {
    await prompt.typeadd('Version: 1.0.0\n', msToS(3));
    await prompt.typeadd('Author: SpectCOW\n', msToS(3));
    await prompt.typeadd('Github: https://github.com/SpectCOW\n', msToS(3));

  }

  async function thread3() {
    await pr2.typewrite('BOOTING?', msToS(10));
    await pr2.typeadd('\nOh yeah!', msToS(10));
    await pr2.typeadd('\n\nHere we go!!\n\n', msToS(10));
    pr2.dis();
    await wait(1.5);

    for (let i = 0; i < 16; i++) {
      await sleep(0.1);
      pr2.group.text += `[${i}BOOT]: Prog\n`;
    }

    await wait(2);

    pr2.group.text = pr2.text;
  }

  await Promise.all([thread1(), wait(2.3, thread3), pr3.typewrite('-=- '.repeat(12), msToS(0.5))]);

  for (let i = 0; i < 50 * 3; i++) {
    await sleep(0.05);
    pr2.group.text += `.`;
    if (i % 25 == 24)
      pr2.group.text += `\n`;
  }

  pr2.ena();

  await sleep(sToMs(5));
  await makeTransition(BLACK, msToS(0.5));
  await wait(2);

  est.cancel();
  go('actual');
});
