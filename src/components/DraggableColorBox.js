import {
  DraggableColorDiv,
  BoxContent,
  DragTextBox,
  useStyles,
} from '../assets/styles/DraggableColorBox.style';

import DeleteIcon from '@mui/icons-material/Delete';

import { SortableElement } from 'react-sortable-hoc';

import { memo } from 'react';

import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';

const DraggableColorBox = SortableElement(props => {
  const { idx, color, name, remove, locked, toggleBoxLock, editColorBoxStart } =
    props;

  const handleClick = () => {
    remove(name);
  };

  const { lockIcon } = useStyles(props);

  const toggleBox = () => {
    toggleBoxLock(name);
  };

  const editBox = () => {
    console.log(idx);
    editColorBoxStart({ name, color, index: idx });
  };
  // console.log('drggable', name);
  return (
    <DraggableColorDiv color={color}>
      <BoxContent>
        <span>{name.length > 13 ? name.slice(0, 13) + '...' : name}</span>
        <DeleteIcon onClick={handleClick} />
      </BoxContent>

      <div className={lockIcon}>
        {locked ? (
          <LockIcon onClick={toggleBox} className="locked-icon" />
        ) : (
          <LockOpenIcon onClick={toggleBox} />
        )}
        <EditIcon onClick={editBox} />
      </div>

      <DragTextBox color={color}>{'Drag! 🤏'}</DragTextBox>
    </DraggableColorDiv>
  );
});

export default memo(DraggableColorBox);
