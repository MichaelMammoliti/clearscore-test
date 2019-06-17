const localStorageMock = (function() {
  const store = {};

  const setItem = (key, value) => {
    store[key] = value;
  };

  const getItem = key => (store[key])
    ? store[key]
    : null
  ;

  const clear = () => {
    store = {};
  };

  return {
    getItem,
    setItem,
    clear,
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});
