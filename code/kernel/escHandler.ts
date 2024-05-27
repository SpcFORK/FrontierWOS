import qe from "./qe";

export default function escHandler(goto: string, cb?: () => unknown) {
  let ev = onKeyPress('escape', () => {
    qe.$(['wos', 'esc']);
    ev.cancel();
    cb?.();
    go(goto);
  });

  return {
    cancel() {
      ev.cancel();
    },
    ev
  };
}
