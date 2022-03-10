import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';
import uuid from 'react-uuid';

import { useStyles } from '../assets/styles/DraggableColorBox.style';

const DraggableColorList = SortableContainer(({ colors, remove }) => {
  const { boxContainer } = useStyles('');
  return (
    <div className={boxContainer}>
      {colors.map((color, index) => (
        <DraggableColorBox
          index={index}
          color={color.color}
          key={uuid()}
          name={color.name}
          handleClick={() => remove(color.name)}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;
