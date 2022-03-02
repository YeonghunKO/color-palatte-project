import { DraggableColorDiv } from '../assets/styles/DraggableColorBox.style';
import { memo } from 'react';

function DraggableColorBox(props) {
  console.log('draggable');
  const { color } = props;
  return <DraggableColorDiv color={color}>{color}</DraggableColorDiv>;
}

export default memo(DraggableColorBox);
