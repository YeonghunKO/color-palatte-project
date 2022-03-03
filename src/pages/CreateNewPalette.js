import uuid from 'react-uuid';

import { useState, useMemo, useEffect } from 'react';

import { useNavigate } from 'react-router';

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
  const navigation = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState('#800080');
  const [colors, setColors] = useState([{ name: 'wowsers', color: 'blue' }]);
  const [newColorName, setNewColorName] = useState('');
  const [newPaletteName, setPaletteName] = useState('');

  useEffect(() => {
    ValidatorForm.addValidationRule('isNameUnique', value => {
      // 각각 대조해보고 다르면 true가 나옴.
      // 한개라도 같은게 있으면 false가 나오면서 isColorUnique가 발동됨
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });

    ValidatorForm.addValidationRule('isColorUnique', value => {
      return colors.every(({ color }) => {
        return currentColor !== color;
      });
    });

    ValidatorForm.addValidationRule('isPlatteNameUnique', value => {
      return props.paletteList.every(({ paletteName }) => {
        return paletteName.toLowerCase() !== newPaletteName.toLowerCase();
      });
    });
  }, [newColorName, currentColor, newPaletteName]);

  const updateCurrentColor = newColor => {
    setCurrentColor(newColor.hex);
  };

  const updateNewPaletteName = e => {
    setPaletteName(e.target.value);
  };

  const addColor = () => {
    const newColor = {
      name: newColorName,
      color: currentColor,
    };
    setColors([...colors, newColor]);
    setNewColorName('');
  };

  const handleForm = evt => {
    setNewColorName(evt.target.value);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const savePalette = () => {
    const newPaletteObj = {
      paletteName: newPaletteName,
      id: newPaletteName.toLocaleLowerCase().replace(/ /g, '-'),
      colors,
    };
    props.addPalette(newPaletteObj);
    navigation('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar color="default" position="fixed" open={open}>
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
          <ValidatorForm onSubmit={savePalette}>
            <TextValidator
              value={newPaletteName}
              onChange={updateNewPaletteName}
              validators={['required', 'isPlatteNameUnique']}
              errorMessages={[
                'Enter Palette Name',
                'Palette Name already exists',
              ]}
            />
            <Button type="submit" variants="contained" color="secondary">
              Save Palette
            </Button>
          </ValidatorForm>
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
          <ValidatorForm onSubmit={addColor}>
            <TextValidator
              validators={['required', 'isNameUnique', 'isColorUnique']}
              errorMessages={[
                'Enter Color Name',
                'Name has already been taken',
                'Color has already been taken',
              ]}
              value={newColorName}
              onChange={handleForm}
            />
            <Button
              type="submit"
              variants="contained"
              style={{
                background: currentColor,
                color: getColorByLuminance(currentColor),
                width: '70%',
                margin: '1rem',
                padding: '1rem',
              }}
            >
              Add Color
            </Button>
          </ValidatorForm>
        </DrawerInnerDiv>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {colors.map(color => (
          <DraggableColorBox
            key={uuid()}
            color={color.color}
            name={color.name}
          />
        ))}
      </Main>
    </Box>
  );
}

export default CreateNewPalette;
