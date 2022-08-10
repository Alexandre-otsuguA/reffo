const delayedFunction = (callback: () => unknown, delay = 200) =>
  new Promise(resolve => setTimeout(() => resolve(callback()), delay));

export default delayedFunction;
