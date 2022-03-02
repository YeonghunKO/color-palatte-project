import uuid from 'react-uuid';

import { useState, useMemo, useEffect } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { Button } from '@mui/material';

import chroma from 'chroma-js';

import { ChromePicker } from 'react-color';

import {
  DrawerInnerDiv,
  ButtonContainer,
} from '../assets/styles/CreateNewPaletteEmotion.style';

import {
  Main,
  AppBar,
  DrawerHeader,
  drawerWidth,
} from '../assets/styles/CreateNewPalette.style';

import DraggableColorBox from '../components/DraggableColorBox';

const getColorByLuminance = currentColor => {
  return chroma(currentColor).luminance() >= 0.58
    ? 'rgb(29, 27, 27)'
    : 'rgb(255, 255, 255)';
};

function CreateNewPalette(props) {
  // const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState('purple');
  const [colors, setColors] = useState(['teal', 'red']);
  const [name, setName] = useState('');

  const updateCurrentColor = newColor => {
    setCurrentColor(newColor.hex);
  };

  const addColor = newColor => {
    setColors([...colors, newColor]);
  };

  const handleForm = evt => {
    setName(evt.target.value);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
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
          <ValidatorForm>
            <TextValidator onChange={handleForm} />
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
          </ValidatorForm>
        </DrawerInnerDiv>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {colors.map(color => (
          <DraggableColorBox key={uuid()} color={color} />
        ))}
      </Main>
    </Box>
  );
}

export default CreateNewPalette;
