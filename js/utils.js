export function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
};

export function cancelable(callbacks) {
  cancelableCallbacks = Object.keys(callbacks).reduce((memo, name) => {
    let canceled = false;
    return {
      ...memo,
      [name]: {
        function: (result) => { if (!canceled) callbacks[name](result) },
        canceled: () => canceled,
        cancel: () => canceled = true,
      }
    }
  }, {});

  cancelAll = () => Object.values(cancelableCallbacks).map((f) => f.cancel());

  return [cancelableCallbacks, cancelAll];
}
