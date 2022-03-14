import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';
import uuid from 'react-uuid';

import { memo } from 'react';

import { useStyles } from '../assets/styles/DraggableColorBox.style';

const DraggableColorList = SortableContainer(
  ({ colors, remove, setRemoveBoxStart }) => {
    const { boxContainer } = useStyles('');
    // console.log('draggable List rendering');
    return (
      <div className={boxContainer}>
        {colors.map((color, index) => (
          <DraggableColorBox
            index={index}
            color={color.color}
            key={color.color}
            name={color.name}
            remove={remove}
            setRemoveBoxStart={setRemoveBoxStart}
          />
        ))}
      </div>
    );
  }
);

export default memo(DraggableColorList);
