export default function createBeatHandler() {
  let lastBeatTime = 0;

  function activateBeat(bpm) {
    const beatInterval = 60000 / bpm;
    let currentTime = time();
    if (!(currentTime - lastBeatTime > beatInterval / 1000)) return false;
    
    lastBeatTime = currentTime;
    return true;
  }

  return { activateBeat };
}
