import { useState, useRef, useEffect, useCallback } from 'react';

function useStateCallback(initState) {
  const [state, setState] = useState(initState);
  const cbRef = useRef(null);

  const setStateWithCallBack = useCallback((state, cb) => {
    cbRef.current = cb;
    setState(state);
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return [state, setStateWithCallBack];
}

export default useStateCallback;
