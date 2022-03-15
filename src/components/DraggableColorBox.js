import {
  DraggableColorDiv,
  BoxContent,
  DragTextBox,
} from '../assets/styles/DraggableColorBox.style';

import DeleteIcon from '@mui/icons-material/Delete';

import { SortableElement } from 'react-sortable-hoc';

import { memo } from 'react';

const DraggableColorBox = SortableElement(props => {
  // console.log(props);
  const { color, name, remove } = props;
  console.log('Sortable color box', name);

  const handleClick = () => {
    remove(name);
  };

  return (
    <DraggableColorDiv color={color}>
      <BoxContent>
        <span>{name}</span>
        <DeleteIcon onClick={handleClick} />
      </BoxContent>
      <DragTextBox color={color}>{'Drag! 🤏'}</DragTextBox>
    </DraggableColorDiv>
  );
});

export default memo(DraggableColorBox);
