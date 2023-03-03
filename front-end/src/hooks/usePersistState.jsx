import { useState, useCallback } from 'react';

export default (storageKey, initialState) => {
  console.log(storageKey, initialState);
  const [state, setState] = useState(() => {
    try {
      const storedValue = localStorage.getItem(storageKey);

      return storedValue ? JSON.parse(storedValue) : initialState;
    } catch {
      return initialState;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setState(value);
      // const storedValue = localStorage.getItem(storageKey);

      // if (storedValue) {
      //   localStorage.setItem(storageKey, JSON.stringify([...storedValue, value]));
      // } else {
      localStorage.setItem(storageKey, JSON.stringify(value));
      // }
    } catch (error) {
      return error;
    }
  }, [storageKey]);

  return [state, setValue];
};
