import { Component } from 'react';
import withNavigate from '../utils/withNagivate';

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

import { arrayMoveImmutable } from 'array-move';
import CreateColorPicker from '../components/CreateColorPicker';

import { smartColorGenerator, pickRandom } from '../utils/smartColorGenerater';

import findPalette from '../utils/findPalette';

class CreateNewPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: props.editingPaletteId
        ? findPalette(props.paletteList, props.editingPaletteId).colors
        : [
            { name: 'Spindle', color: 'rgb(173,211,237)', locked: false },
            { name: 'Malibu', color: 'rgb(110,178,224)', locked: true },
          ],
      open: false,
      isAutoGenerting: false,
      isColorBoxEditing: false,
      editingBoxInfo: { name: '', color: '', index: null },
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.addColor = this.addColor.bind(this);
    this.removeColorBox = this.removeColorBox.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.sortEnd = this.sortEnd.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.allColors = this.props.paletteList
      .map(palette => palette.colors)
      .flat();

    this.randomColor = null;

    this.autoGenerator = this.autoGenerator.bind(this);
    this.updateOneByOne = this.updateOneByOne.bind(this);
    this.getRadomSmartColor = this.getRadomSmartColor.bind(this);
    this.toggleBoxLock = this.toggleBoxLock.bind(this);
    this.editColorBoxStart = this.editColorBoxStart.bind(this);
    this.editColorBoxEnd = this.editColorBoxEnd.bind(this);
    this.onUpdateEditingBoxColor = this.onUpdateEditingBoxColor.bind(this);
    this.editColorBoxCancel = this.editColorBoxCancel.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  addColor(newColorObj) {
    this.setState(prevSt => {
      return { colors: [...prevSt.colors, newColorObj] };
    });
  }

  removeColorBox(name) {
    const removedColors = this.state.colors.filter(
      color => color.name !== name
    );
    this.setState({ colors: removedColors });
  }

  savePalette({ newPaletteName, emoji }) {
    const newPaletteObj = {
      paletteName: newPaletteName,
      id: newPaletteName.toLocaleLowerCase().replace(/ /g, '-'),
      colors: this.state.colors,
      emoji,
    };
    this.props.addPalette(newPaletteObj);
    this.props.navigation('/');
  }

  sortEnd({ oldIndex, newIndex }) {
    if (oldIndex !== newIndex) {
      this.setState(prevSt => {
        return {
          colors: arrayMoveImmutable(prevSt.colors, oldIndex, newIndex),
        };
      });
    }
  }

  addRandomColor() {
    do {
      this.randomColor = pickRandom(this.allColors);
    } while (
      this.state.colors.some(color => color.color === this.randomColor.color)
    );
    this.setState(prevSt => ({
      colors: [...prevSt.colors, { ...this.randomColor, locked: false }],
    }));
  }

  getRadomSmartColor(basedOn, compareList = this.state.colors) {
    let newColor;
    const notUniqueColorObj = newColor =>
      compareList.some(
        color => color.name === newColor.name || color.color === newColor.color
      );
    do {
      newColor = smartColorGenerator(basedOn);
    } while (notUniqueColorObj(newColor));
    return { ...newColor, locked: false };
  }

  updateOneByOne(newColors, idx) {
    this.setState(
      { colors: [...newColors.slice(0, idx), newColors[idx]] },
      () => {
        if (idx < 19) {
          setTimeout(() => {
            this.updateOneByOne(newColors, idx + 1);
          }, 10);
        }
      }
    );
  }

  autoGenerator() {
    // reason to use locked colors for baseColors is to take locked colors into account to autogenerate
    this.setState({ isAutoGenerting: true });
    const baseColors = this.state.colors.filter(c => c.locked);
    const newColors = [];
    for (let i = 0; i < 20; i++) {
      const originalColor = this.state.colors[i];
      if (originalColor && originalColor.locked) {
        newColors[i] = originalColor;
      } else {
        const basedOn = pickRandom(baseColors) || pickRandom(this.state.colors);
        const randomColorObj = this.getRadomSmartColor(basedOn, baseColors);
        baseColors.push(randomColorObj);
        newColors[i] = randomColorObj;
      }
    }

    this.updateOneByOne(newColors, 0);
    setTimeout(() => {
      this.setState({ isAutoGenerting: false });
    }, 1100);
  }

  toggleBoxLock(toggleBoxName) {
    const lockedColors = this.state.colors.map(colorObj =>
      colorObj.name === toggleBoxName
        ? { ...colorObj, locked: !colorObj.locked }
        : colorObj
    );

    this.setState({ colors: lockedColors });
  }

  clearColors() {
    this.setState(prevSt => ({
      colors: prevSt.colors.filter(color => color.locked),
    }));
  }

  editColorBoxStart(editingBoxInfo) {
    this.handleDrawerOpen();
    this.setState({
      isColorBoxEditing: true,
      editingBoxInfo,
    });
  }

  onUpdateEditingBoxColor(newColor) {
    const updatingColors = this.state.colors.map(color =>
      color.name === this.state.editingBoxInfo.name
        ? { ...color, color: newColor }
        : color
    );
    this.setState({ colors: updatingColors });
  }

  editColorBoxEnd({ name, color }) {
    // console.log(name);
    this.setState(prevSt => ({
      isColorBoxEditing: false,
      editingBoxInfo: { name: '', color: '', index: null },
      colors: prevSt.colors.map(prevColor =>
        prevColor.name === this.state.editingBoxInfo.name
          ? { ...prevColor, name, color }
          : prevColor
      ),
    }));
  }

  editColorBoxCancel() {
    this.setState(prevSt => ({
      isColorBoxEditing: false,
      editingBoxInfo: { name: '', color: '', index: null },
      colors: prevSt.colors.map((prevColor, index) =>
        index === this.state.editingBoxInfo.index
          ? {
              ...prevColor,
              color: this.state.editingBoxInfo.color,
              name: this.state.editingBoxInfo.name,
            }
          : prevColor
      ),
    }));
  }

  render() {
    const { maxCardNum, paletteList, classes } = this.props;
    const { drawer } = classes;

    const { open, colors, isAutoGenerting, isColorBoxEditing, editingBoxInfo } =
      this.state;

    const isPaletteFull = this.state.colors.length >= maxCardNum;

    return (
      <Box sx={{ display: 'flex' }}>
        <CreateColorNav
          open={open}
          handleDrawerOpen={this.handleDrawerOpen}
          savePalette={this.savePalette}
          paletteList={paletteList}
          autoGenerator={this.autoGenerator}
          isAutoGenerting={isAutoGenerting}
        />
        <Drawer
          className={drawer}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <DrawerInnerDiv open={open}>
            <Typography variant="h6">Create Your Own Palette</Typography>
            <ButtonContainer>
              <Button variant="contained" onClick={this.clearColors}>
                Clear Palette
              </Button>
              <Button
                variant="contained"
                onClick={this.addRandomColor}
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
              addColor={this.addColor}
              isPaletteFull={isPaletteFull}
              colors={colors}
              isColorBoxEditing={isColorBoxEditing}
              editingBoxInfo={editingBoxInfo}
              editColorBoxEnd={this.editColorBoxEnd}
              onUpdateEditingBoxColor={this.onUpdateEditingBoxColor}
              editColorBoxCancel={this.editColorBoxCancel}
            />
          </DrawerInnerDiv>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <DraggableColorList
            distance={1}
            onSortEnd={this.sortEnd}
            axis="xy"
            colors={colors}
            remove={this.removeColorBox}
            toggleBoxLock={this.toggleBoxLock}
            editColorBoxStart={this.editColorBoxStart}
            editingBoxInfoIdx={editingBoxInfo.index}
          />
        </Main>
      </Box>
    );
  }
}

export default withStyles(styles)(withNavigate(CreateNewPalette));
