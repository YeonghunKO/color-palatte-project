import { withStyles } from '@mui/styles';
import styles from '../assets/styles/MiniPlatteStyles';
import Delete from '@mui/icons-material/Delete';

function MiniPalette(props) {
  const { classes, colors, emoji, paletteName, id, removePalette } = props;
  const { root, colorsClass, title, emojiClass, miniColor, deleteIcon } =
    classes;
  const miniColorBoxes = colors.map(color => (
    <div
      key={color.name}
      className={miniColor}
      style={{ backgroundColor: color.color }}
    ></div>
  ));

  const handleDelete = evt => {
    evt.preventDefault();
    removePalette(id);
  };

  return (
    <div className={root}>
      <Delete className={deleteIcon} onClick={handleDelete} />
      <div className={colorsClass}>{miniColorBoxes}</div>
      <h5 className={title}>
        {paletteName} <span className={emojiClass}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
