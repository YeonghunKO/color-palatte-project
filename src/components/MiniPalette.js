import { withStyles } from '@mui/styles';
import styles from '../assets/styles/MiniPlatteStyles';

function MiniPalette(props) {
  const { classes, colors, emoji, paletteName } = props;
  const { root, colorsClass, title, emojiClass, miniColor } = classes;
  const miniColorBoxes = colors.map(color => (
    <div
      key={color.name}
      className={miniColor}
      style={{ backgroundColor: color.color }}
    ></div>
  ));
  return (
    <div className={root}>
      <div className={colorsClass}>{miniColorBoxes}</div>
      <h5 className={title}>
        {paletteName} <span className={emojiClass}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
