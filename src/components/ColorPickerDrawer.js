import Drawer from '@mui/material/Drawer';

import Typography from '@mui/material/Typography';

import Divider from '@mui/material/Divider';

import IconButton from '@mui/material/IconButton';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { Button } from '@mui/material';

import { ChromePicker } from 'react-color';

import {
  DrawerInnerDiv,
  ButtonContainer,
} from '../assets/styles/CreateNewPaletteEmotion.style';

import { drawerWidth } from '../assets/styles/CreateNewPalette.style';

const getColorByLuminance = currentColor => {
  return chroma(currentColor).luminance() >= 0.58
    ? 'rgb(29, 27, 27)'
    : 'rgb(255, 255, 255)';
};

function ColorPickerDrawer(props) {
  const [currentColor, setCurrentColor] = useState('purple');

  const updateCurrentColor = newColor => {
    setCurrentColor(newColor.hex);
  };
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <DrawerInnerDiv open={open}>
        <Typography variant="h5">Create Your Own Palette</Typography>
        <ButtonContainer>
          <Button variant="contained">Clear Palette</Button>
          <Button variant="contained">Random Color</Button>
        </ButtonContainer>
        <ChromePicker
          color={currentColor}
          onChangeComplete={updateCurrentColor}
        />
        <Button
          variants="contained"
          style={{
            background: currentColor,
            color: getColorByLuminance(currentColor),
            width: '70%',
            margin: '1rem',
            padding: '1rem',
          }}
          onClick={() => addColor(currentColor)}
        >
          Add Color
        </Button>
      </DrawerInnerDiv>
    </Drawer>
  );
}

export default ColorPickerDrawer;
