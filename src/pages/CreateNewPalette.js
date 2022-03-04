import uuid from 'react-uuid';

import { useState, useMemo, useEffect } from 'react';

import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
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
  DrawerHeader,
  drawerWidth,
} from '../assets/styles/CreateNewPalette.style';

import DraggableColorList from '../components/DraggableColorList';
import CreateColorNav from '../components/createColorNav';

import { arrayMove } from 'react-sortable-hoc';

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
  const [currentColor, setCurrentColor] = useState('#800080');
  const [colors, setColors] = useState([{ name: 'wowsers', color: 'blue' }]);
  const [newColorName, setNewColorName] = useState('');
  const [open, setOpen] = useState(false);
  // const [newPaletteName, setPaletteName] = useState('');

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
  }, [newColorName, currentColor]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = newColor => {
    setCurrentColor(newColor.hex);
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
                background: `${isPaletteFull ? 'grey' : currentColor}`,
                color: getColorByLuminance(currentColor),
                width: '70%',
                margin: '1rem',
                padding: '1rem',
              }}
              disabled={isPaletteFull}
            >
              {isPaletteFull ? 'Palette Full' : 'Add Color'}
            </Button>
          </ValidatorForm>
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
