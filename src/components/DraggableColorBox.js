import {
  DraggableColorDiv,
  BoxContent,
} from '../assets/styles/DraggableColorBox.style';

import DeleteIcon from '@mui/icons-material/Delete';

import { SortableElement } from 'react-sortable-hoc';

import { memo, useCallback } from 'react';

const DraggableColorBox = SortableElement(props => {
  // console.log(props);
  const { color, name, remove, setRemoveBoxStart } = props;
  console.log('Sortable color box', name);

  const handleClick = useCallback(() => {
    setRemoveBoxStart(true);
    remove(name);
  }, [color]);

  return (
    <DraggableColorDiv color={color}>
      <BoxContent>
        <span>{name}</span>
        <DeleteIcon onClick={handleClick} />
      </BoxContent>
    </DraggableColorDiv>
  );
});

export default memo(DraggableColorBox);
