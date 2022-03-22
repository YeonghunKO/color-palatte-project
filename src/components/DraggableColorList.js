import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

import { memo } from 'react';

import { useStyles } from '../assets/styles/DraggableColorBox.style';

const DraggableColorList = SortableContainer(
  ({ colors, remove, toggleBoxLock, editColorBoxStart }) => {
    const { boxContainer } = useStyles();

    return (
      <div className={boxContainer}>
        {colors.map((color, index) => (
          <DraggableColorBox
            {...color}
            index={index}
            key={color.color}
            idx={index}
            remove={remove}
            toggleBoxLock={toggleBoxLock}
            editColorBoxStart={editColorBoxStart}
          />
        ))}
      </div>
    );
  }
);

export default memo(DraggableColorList);
