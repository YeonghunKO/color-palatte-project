import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';
import uuid from 'react-uuid';

const DraggableColorList = SortableContainer(({ colors, remove }) => {
  return (
    <div style={{ height: '100%' }}>
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
