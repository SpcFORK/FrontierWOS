export default function When(conditionFunction, actionFunction) {
  return new Promise((resolve, reject) => {
    if (typeof conditionFunction !== 'function') {
      reject(new Error('Arg 1; MUST BE FUNCTION!!!'));
      return;
    }

    const interval = setInterval(() => {
      let cond = conditionFunction();
      if (cond) {
        clearInterval(interval);
        actionFunction?.();
        resolve(true);
      }
    }, 100);
  });
}
