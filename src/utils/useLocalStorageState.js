import { useState, useEffect } from 'react';
// import seedPalatte from './DATA/seedPalatte';

const COLOR_KEY = 'colors';

export default function useLocalStorageState(defaultVal) {
  const localData = JSON.parse(localStorage.getItem(COLOR_KEY));
  const [state, setState] = useState(localData || defaultVal);

  const handleSetState = newState => {
    setState(newState);
  };
  useEffect(() => {
    localStorage.setItem(COLOR_KEY, JSON.stringify(state));
  }, [state]);

  return [state, handleSetState];
}
