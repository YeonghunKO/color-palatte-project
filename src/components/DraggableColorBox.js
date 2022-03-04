import {
  DraggableColorDiv,
  BoxContent,
} from '../assets/styles/DraggableColorBox.style';

import DeleteIcon from '@mui/icons-material/Delete';

import { SortableElement } from 'react-sortable-hoc';

// import { memo } from 'react';

const DraggableColorBox = SortableElement(props => {
  // console.log(props);
  const { color, name, handleClick } = props;
  return (
    <DraggableColorDiv color={color}>
      <BoxContent>
        <span>{name}</span>
        <DeleteIcon onClick={handleClick} />
      </BoxContent>
    </DraggableColorDiv>
  );
});

export default DraggableColorBox;
