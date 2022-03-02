import uuid from 'react-uuid';

const colorReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.color];
    default:
      return state;
  }
};

export default colorReducer;
