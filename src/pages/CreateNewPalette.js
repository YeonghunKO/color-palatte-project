import uuid from 'react-uuid';

import { useState, useMemo, useEffect } from 'react';

import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { Button } from '@mui/material';

import chroma from 'chroma-js';

import {
  DrawerInnerDiv,
  ButtonContainer,
} from '../assets/styles/CreateNewPaletteEmotion.style';

import {
  Main,
  DrawerHeader,
  drawerWidth,
} from '../assets/styles/CreateNewPalette.style';

import DraggableColorList from '../components/DraggableColorList';
import CreateColorNav from '../components/CreateColorNav';

import { arrayMove } from 'react-sortable-hoc';
import CreateColorPicker from '../components/CreateColorPicker';

const getColorByLuminance = currentColor => {
  return chroma(currentColor).luminance() >= 0.58
    ? 'rgb(29, 27, 27)'
    : 'rgb(255, 255, 255)';
};

function CreateNewPalette(props) {
  const { maxCardNum, paletteList, addPalette } = props;
  const navigation = useNavigate();
  const allColors = paletteList.map(palette => palette.colors).flat();
  // const [open, setOpen] = useState(false);
  const [colors, setColors] = useState([{ name: 'wowsers', color: 'blue' }]);
  const [open, setOpen] = useState(false);
  // const [newPaletteName, setPaletteName] = useState('');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addColor = newColorObj => {
    setColors([...colors, newColorObj]);
  };

  const removeColorBox = name => {
    const removedColors = colors.filter(color => color.name !== name);
    setColors(removedColors);
  };

  const savePalette = newPaletteName => {
    const newPaletteObj = {
      paletteName: newPaletteName,
      id: newPaletteName.toLocaleLowerCase().replace(/ /g, '-'),
      colors,
    };
    addPalette(newPaletteObj);
    navigation('/');
  };

  const sortEnd = ({ oldIndex, newIndex }) => {
    setColors(oldColors => {
      return arrayMove(oldColors, oldIndex, newIndex);
    });
  };

  const addRandomColor = () => {
    let randomColor;
    do {
      randomColor = allColors[Math.floor(Math.random() * allColors.length)];
    } while (colors.some(color => color.color === randomColor.color));
    setColors([...colors, randomColor]);
  };

  const clearColors = () => {
    setColors([]);
  };

  const isPaletteFull = colors.length >= maxCardNum;
  console.log('createNewPalette');
  return (
    <Box sx={{ display: 'flex' }}>
      <CreateColorNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        savePalette={savePalette}
        paletteList={paletteList}
      />
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
            <Button variant="contained" onClick={clearColors}>
              Clear Palette
            </Button>
            <Button
              variant="contained"
              onClick={addRandomColor}
              style={{
                background: `${isPaletteFull ? 'grey' : '#c11780'}`,
                color: `${isPaletteFull && 'white'}`,
              }}
              disabled={isPaletteFull}
            >
              {isPaletteFull ? 'Palette Full' : 'Random Color'}
            </Button>
          </ButtonContainer>
          <CreateColorPicker
            addColor={addColor}
            isPaletteFull={isPaletteFull}
            colors={colors}
            getColorByLuminance={getColorByLuminance}
          />
        </DrawerInnerDiv>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          distance={1}
          onSortEnd={sortEnd}
          axis="xy"
          colors={colors}
          remove={removeColorBox}
        />
      </Main>
    </Box>
  );
}

export default CreateNewPalette;
