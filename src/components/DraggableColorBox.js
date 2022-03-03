import {
  DraggableColorDiv,
  BoxContent,
} from '../assets/styles/DraggableColorBox.style';
import { memo } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';

function DraggableColorBox(props) {
  // console.log('draggable');
  const { color, name } = props;
  return (
    <DraggableColorDiv color={color}>
      <BoxContent>
        <span>{name}</span>
        <DeleteIcon />
      </BoxContent>
    </DraggableColorDiv>
  );
}

export default DraggableColorBox;
