import { displays } from "./kernel/displays";
import qe from "./kernel/qe";
import fonts_ from "./kernel/fonts_";
import createFG from "./kernel/createFG";
import makeIntroTransition from "./kernel/makeIntroTransition";

scene('actual', async () => {

  createFG();

  let bottomBar = displays.bottomBar();

  await makeIntroTransition(BLACK, 15);

  let fnt = fonts_.Puddles();

  function createTaskMenu() {
    let menu = add([
      pos(5, displays.pos.bottomBar.h - (displays.pos.bottomBar.y / 2) - 10),
      rect(200, 500),
      anchor('botleft'),
      outline(2, WHITE),
      color(BLACK),
      z(10),
    ]);

    let botSect = add([
      pos(menu.pos.x, menu.pos.y),
      rect(menu.width, 50),
      anchor('botleft'),
      outline(2, WHITE),
      color(BLACK),
      z(11),
    ]);

    let topSect = add([
      pos(menu.pos.x, menu.pos.y - menu.height),
      rect(menu.width, 50),
      anchor('topleft'),
      outline(2, WHITE),
      color(BLACK),
      z(11),
    ]);

    let inner = add([
      pos(menu.pos.x, menu.pos.y - menu.height + 50),
      // rect(menu.width, menu.height - 100),
      anchor('topleft'),
      z(11),
    ]);

  }

  let title = add([
    text('FrontierWOS.', {
      size: 48,
      font: fnt,
    }),
    pos(width() / 2, height() / 2),
    anchor('center'),
    scale(1.5),
    color(WHITE),
    z(99),

    opacity(0),
    fadeIn(0.5),
  ]);

  let bbaw = bottomBar.bottomLeft.button;
  let bbat = bottomBar.bottomLeft.wosText;

  qe._(['wos', 'core', 'button', 'click'], () => {
    createTaskMenu();
  });

  qe._(['wos', 'core', 'button', 'hoverOn'], async () => {
    bbaw.use(color(BLACK));
    bbaw.use(outline(2, WHITE));
    bbat.use(color(WHITE));
  });

  qe._(['wos', 'core', 'button', 'hoverOff'], async () => {
    bbaw.use(color(WHITE));
    bbaw.use(outline(0, WHITE));
    bbat.use(color(BLACK));


  });

});
