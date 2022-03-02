import { createContext, useReducer } from 'react';
import colorReducer from './colorReducer';

const colorsContext = createContext('');
const colorDispatchContext = createContext('');

const initColors = ['teal', 'red'];

function NewColorContextWrapper(props) {
  const [colors, dispatch] = useReducer(colorReducer, initColors);
  return (
    <colorContext value={colors}>
      <colorDispatchContext value={dispatch}>
        {props.children}
      </colorDispatchContext>
    </colorContext>
  );
}

export default NewColorContextWrapper;

// reducer도 만들어라.
