import { memo } from 'react';

import { useNavigate } from 'react-router';

import { withStyles } from '@mui/styles';
import styles from '../assets/styles/MiniPlatteStyles';
import Delete from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function MiniPalette(props) {
  const {
    classes,
    colors,
    emoji,
    paletteName,
    id,
    openDeleteDialog,
    editingPaletteStart,
  } = props;
  const {
    root,
    colorsClass,
    title,
    emojiClass,
    miniColor,
    deleteIcon,
    editIcon,
  } = classes;
  const miniColorBoxes = colors.map(color => (
    <div
      key={color.name}
      className={miniColor}
      style={{ backgroundColor: color.color }}
    ></div>
  ));

  const handleDelete = evt => {
    evt.preventDefault();
    openDeleteDialog(id, paletteName);
  };

  const editBox = evt => {
    evt.preventDefault();
    editingPaletteStart(id);
  };

  console.log('minipalette', paletteName);
  return (
    <div className={root}>
      <Delete className={deleteIcon} onClick={handleDelete} />
      <EditIcon className={editIcon} onClick={editBox} />
      <div className={colorsClass}>{miniColorBoxes}</div>
      <h5 className={title}>
        {paletteName} <span className={emojiClass}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(memo(MiniPalette));
