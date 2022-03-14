import { useState, useCallback, useMemo } from 'react';

import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { Button } from '@mui/material';
import { withStyles } from '@mui/styles';

import {
  DrawerInnerDiv,
  ButtonContainer,
} from '../assets/styles/CreateNewPaletteEmotion.style';

import {
  Main,
  DrawerHeader,
  styles,
} from '../assets/styles/CreateNewPalette.style';

import DraggableColorList from '../components/DraggableColorList';
import CreateColorNav from '../components/CreateColorNav';

import { arrayMove } from 'react-sortable-hoc';
import CreateColorPicker from '../components/CreateColorPicker';

import PropTypes from 'prop-types';

function CreateNewPalette(props) {
  const { maxCardNum, paletteList, addPalette, classes } = props;
  const { drawer } = classes;

  const navigation = useNavigate();

  const allColors = paletteList.map(palette => palette.colors).flat();

  const [colors, setColors] = useState([{ name: 'wowsers', color: 'blue' }]);
  const [open, setOpen] = useState(false);
  const [isRemoveBoxStart, setRemoveBoxStart] = useState(false);

  console.log(colors);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const addColor = useCallback(
    newColorObj => {
      setColors([...colors, newColorObj]);
    },
    [colors]
  );

  const removeColorBox = useCallback(
    name => {
      const removedColors = colors.filter(color => color.name !== name);
      setColors(removedColors);
    },
    [isRemoveBoxStart]
  );

  const savePalette = useCallback(
    ({ newPaletteName, emoji }) => {
      const newPaletteObj = {
        paletteName: newPaletteName,
        id: newPaletteName.toLocaleLowerCase().replace(/ /g, '-'),
        colors,
        emoji,
      };
      addPalette(newPaletteObj);
      navigation('/');
    },
    [colors]
  );

  const sortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      if (oldIndex !== newIndex) {
        setColors(oldColors => {
          return arrayMove(oldColors, oldIndex, newIndex);
        });
      }
    },
    [colors]
  );
  // const = useCallback(()=>{})

  const addRandomColor = useCallback(() => {
    let randomColor;
    do {
      randomColor = allColors[Math.floor(Math.random() * allColors.length)];
    } while (colors.some(color => color.color === randomColor.color));
    setColors([...colors, randomColor]);
  }, [colors]);

  const clearColors = useCallback(() => {
    setColors([]);
  }, []);

  const isPaletteFull = colors.length >= maxCardNum;
  return (
    <Box sx={{ display: 'flex' }}>
      <CreateColorNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        savePalette={savePalette}
        paletteList={paletteList}
      />
      <Drawer className={drawer} variant="persistent" anchor="left" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <DrawerInnerDiv open={open}>
          <Typography variant="h6">Create Your Own Palette</Typography>
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
                minWidth: '47%',
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
          setRemoveBoxStart={setRemoveBoxStart}
        />
      </Main>
    </Box>
  );
}

CreateNewPalette.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateNewPalette);
