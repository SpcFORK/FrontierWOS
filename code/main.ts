// === AUTHORHEADER ===
// @SpcFORK
// $desc: Kernel
// === ===

import kaboom from "kaboom"
import "kaboom/global"

import "./kernel/filesys"

// ---

kaboom()

let L$ = (url = '') => location.href + url

// @ Loading Fonts
{

  var resFont = async (fontName = '', as = fontName) => {
    return loadFont(
      as,
      L$('code/fonts/' + fontName + '.ttf')
    )
  }

  var handleRubik = async (instance = '') => {
    let newp = 'Rubik_' + instance
    return resFont(
      newp + '/' + newp,
      newp
    )
  }

  // ---

  let tempFontArr = [
    'Vinyl',
    'Spray_Paint',
    'Broken_Fax',
    // 'Iso',
    'Puddles',
  ]

  tempFontArr.map((inst) => handleRubik(inst))

}

const fonts_ = {
  CASE: (fontName = '') => 'Rubik_' + fontName,
  Vinyl: () => fonts_.CASE('Vinyl'),
  Spray_Paint: () => fonts_.CASE('Spray_Paint'),
  Broken_Fax: () => fonts_.CASE('Broken_Fax'),
  // Iso: () => fonts_.CASE('Iso'),
  Puddles: () => fonts_.CASE('Puddles'),
}

// ---

function createBeatHandler() {
  let lastBeatTime = 0;

  return {
    activateBeat: function(bpm) {
      const beatInterval = 60000 / bpm;
      let currentTime = time(); // Kaboom's time() function returns the current game time in seconds
      if (currentTime - lastBeatTime > beatInterval / 1000) { // Convert beatInterval to seconds
        lastBeatTime = currentTime;
        return true;
      } else {
        return false;
      }
    }
  };
}

function segPosCenter(pos: number, divs: number, width: number, ind: number) {
  return (pos / divs) * ind + (width / 2);
}

function When(conditionFunction, actionFunction) {
  return new Promise((resolve, reject) => {
    if (typeof conditionFunction !== 'function') {
      reject(new Error('Arg 1; MUST BE FUNCTION!!!'));
      return
    }

    const interval = setInterval(() => {
      let cond = conditionFunction()
      if (cond) {
        clearInterval(interval);
        actionFunction?.();
        resolve(true);
      }
    }, 100); // Check the condition every 100 milliseconds.
  });
}


async function sleep(ms) {
  return await new Promise<any>(resolve => setTimeout(resolve, ms));
}

function msToS(ms) {
  return ms / 1000;
}

function sToMs(s) {
  return s * 1000;
}


async function drainOpacity(sprite, duration: number): Promise<void> {
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


async function createFG() {
  let fg = add([
    rect(width(), height()),
    color(0, 0, 0),
  ])
  return fg
}

async function makeTransition(color?: any, time = 0.5) {
  let fg = await createFG();
  if (color) fg.use(color)
  fg.use(opacity(0))
  fg.use(fadeIn(time))

  await sleep(800)

  return fg;
}

async function makeIntroTransition(color?: any, time = 2) {
  let fg = await createFG()
  if (color) fg.use(color)
  await drainOpacity(fg, sToMs(time))
  fg.destroy()
  return fg;
}

async function fadeInByAmmout(sprite, duration: number, mult: number) {
  return new Promise((resolve) => {
    sprite.use(opacity(0));
    let currentOpacity = 1;

    const fadeAmount = 1 / (duration / 100);
    const interval = setInterval(() => {
      currentOpacity += fadeAmount;
      if (currentOpacity <= 0) {
        sprite.use(opacity(0));
        clearInterval(interval);
        resolve(null);
      } else {
        sprite.use(opacity(currentOpacity * mult));
      }
    }, 10);

  })
}

async function fadeOutByAmmout(sprite, duration: number, mult: number) {
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

  })
}

// ---

// @Display

const displays = {
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
    ]
    
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

      async tweenUp() {
        return tween(
          (displays.pos.bottomBar.WHEN_UNDER.x, displays.pos.bottomBar.WHEN_UNDER.y),
          (displays.pos.bottomBar.x, displays.pos.bottomBar.y),
          sToMs(0.5),
          easings.easeOutQuad,
          (pos: number) => {
            return om.bg.pos.y = pos;
          }
        )
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
        )
      },

    }

    om.bg.add([
      pos(-width() / 2, displays.pos.bottomBar.y-2),
      anchor('left'),
    ])

    return om;
  },
}

// ---

scene('intro', async () => {

  await createFG()

  let bottomBar = displays.bottomBar()

  await makeIntroTransition(rgb(0, 0, 0), 25)

  let fnt = fonts_.Puddles()

  let title = add([
    text('FrontierWOS.', {
      size: 48,
      font: fnt,
    }),
    pos(width() / 2, height() / 2),
    anchor('center'),
    scale(1.5),
    color(255, 255, 255),
    z(99),

    opacity(0),
    fadeIn(0.5),
  ])

})

go('intro')