import qe from "./qe";
import fonts_ from "./fonts_";
import sToMs from "./sToMs";

// ---
// @Display
export const displays = {
  pos: {
    bottomBar: {
      x: width() + 25,
      y: 60 + 25,
      w: width() / 2,
      h: height() - 30 + 25,

      WHEN_UNDER: {
        x: width() + 25,
        y: 60 + 50 + 75,
        w: width() / 2,
        h: height() - 30 + 25,
      }
    }
  },

  bottomBar: () => {

    let apps = [
      {
        name: 'Calculator',
      }
    ];

    let om = {
      bg: add([
        rect(displays.pos.bottomBar.x, displays.pos.bottomBar.y),
        pos(displays.pos.bottomBar.w, displays.pos.bottomBar.h),
        color(0, 0, 0),
        outline(2, WHITE),
        anchor('center'),
      ]),

      bottomRight: {
        time: add([
          text('', {
            size: 17,
            font: fonts_.Spray_Paint(),
          }),
          pos(width() - 17, displays.pos.bottomBar.h - 16),
          anchor('right'),
        ]),

        update: requestAnimationFrame(function temp() {
          requestAnimationFrame(temp);
          let t = new Date();
          // xxxx-xx-xx xx:xx:xx
          let time = t.toLocaleDateString() + '   |   ' + t.toLocaleTimeString();
          om.bottomRight.time.text = time;

        })
      },

      bottomLeft: {
        core: add([
          anchor('left'),
          pos(15, displays.pos.bottomBar.h),
          // rect(width() / 2, displays.pos.bottomBar.y),
        ]),

        button: add([
          anchor('left'),
          pos(5, displays.pos.bottomBar.h),
          rect(45, displays.pos.bottomBar.y),
          area(),
        ]),

        wosText: add([
          anchor('center'),
          pos((45 / 2) + 5, displays.pos.bottomBar.h - (30 / 2)),
          text('W', {
            size: 30,
            font: fonts_.Spray_Paint(),
            align: 'center',
          }),
          color(BLACK),
        ])
      },

      async tweenUp() {
        return tween(
          (displays.pos.bottomBar.WHEN_UNDER.x, displays.pos.bottomBar.WHEN_UNDER.y),
          (displays.pos.bottomBar.x, displays.pos.bottomBar.y),
          sToMs(0.5),
          easings.easeOutQuad,
          (pos: number) => {
            return om.bg.pos.y = pos;
          }
        );
      },

      async tweenDown() {
        return tween(
          (displays.pos.bottomBar.x, displays.pos.bottomBar.y),
          (displays.pos.bottomBar.WHEN_UNDER.x, displays.pos.bottomBar.WHEN_UNDER.y),
          sToMs(0.5),
          easings.easeOutQuad,
          (pos: number) => {
            return om.bg.pos.y = pos;
          }
        );
      },
    };

    om.bg.add([
      pos(-width() / 2, displays.pos.bottomBar.y - 2),
      anchor('left'),
    ]);

    om.bg.readd(om.bottomRight.time);

    om.bottomLeft.button.readd(om.bottomLeft.wosText);
    om.bottomLeft.core.readd(om.bottomLeft.button);

    {
      let c_ = om.bottomLeft.core;
      let b_ = om.bottomLeft.button;
      let t_ = om.bottomLeft.wosText;

      b_.onClick(() => {
        qe.$(['wos', 'core', 'button', 'click']);
      });

      b_.onHoverUpdate(async () => {
        qe.$(['wos', 'core', 'button', 'hoverUp']);
      });

      b_.onHover(async () => {
        qe.$(['wos', 'core', 'button', 'hoverOn']);
      });

      b_.onHoverEnd(async () => {
        qe.$(['wos', 'core', 'button', 'hoverOff']);
      });
    }

    om.bg.readd(om.bottomLeft.core);

    return om;
  },
};
