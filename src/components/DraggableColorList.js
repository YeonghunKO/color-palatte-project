import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

import { memo } from 'react';

import { useStyles } from '../assets/styles/DraggableColorBox.style';

const DraggableColorList = SortableContainer(({ colors, remove }) => {
  const { boxContainer } = useStyles('');

  return (
    <div className={boxContainer}>
      {colors.map((color, index) => (
        <DraggableColorBox
          index={index}
          color={color.color}
          key={color.color}
          name={color.name}
          remove={remove}
        />
      ))}
    </div>
  );
});

export default memo(DraggableColorList);
