import { DraggableColorDiv } from '../assets/styles/DraggableColorBox.style';
import { memo } from 'react';

function DraggableColorBox(props) {
  // console.log('draggable');
  const { color, name } = props;
  return <DraggableColorDiv color={color}>{name}</DraggableColorDiv>;
}

export default memo(DraggableColorBox);
