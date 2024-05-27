import * as kbg from "kaplay";
import sleep from "./sleep";

// ---
export default class Prompt {
  text: string;
  pos: kbg.Vec2;
  group: kbg.GameObj;
  tickerSpeed = 1;
  ticker = '▓';
  typing: boolean;
  disa: boolean;

  constructor(tickerspeed?: number, ticker?: string) {
    this.text = '';
    this.pos = vec2(10, 10);
    this.group = add([
      pos(this.pos),
      text(this.text, {
        size: 18,
        styles: {
          'test': {
            color: BLACK,
          }
        },
      }),
      anchor('topleft'),
      // opacity(0),
      timer(),
      color(WHITE),
    ]);

    this.typing = false;
    this.tickerSpeed = tickerspeed || this.tickerSpeed;
    this.ticker = ticker || this.ticker;
    this.disa = false;

    this.group.loop(this.tickerSpeed, () => {
      if (this.typing || this.disa)
        return;
      this.group.text = !this.group.text.endsWith(this.ticker)
        ? this.group.text = this.group.text + this.ticker
        : this.group.text = this.text;
    });
  }

  dis() {
    this.disa = true;
  }

  ena() {
    this.disa = false;
  }

  setPos(pos: kbg.Vec2) {
    pos = pos.add(vec2(10));
    this.pos = pos;
    this.group.pos = this.pos;
  }

  async typewrite(text: string, t: number) {
    this.text = text;
    this.typing = true;
    for (let i = 0; i < text.length; i++) {
      await sleep(t);
      this.group.text = text.slice(0, i + 1);
    }
    wait(1, () => this.typing = false);
  }

  async typeadd(text: string, t: number) {
    this.text += text;
    this.typing = true;
    for (let i = 0; i < text.length; i++) {
      await sleep(t);
      this.group.text += text[i];
    }
    wait(1, () => this.typing = false);
  }

  async delete(amm: number, t: number) {
    this.typing = true;
    for (let i = 0; i < amm; i++) {
      await sleep(t);
      this.text = this.group.text = this.group.text.slice(0, -1);
    }
    wait(1, () => this.typing = false);
  }
}
