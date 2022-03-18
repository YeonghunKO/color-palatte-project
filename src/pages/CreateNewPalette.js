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

import smartColorGenerator from '../utils/smartColorGenrater';

class CreateNewPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [{ name: 'Malibu', color: 'rgb(110,178,224)' }],
      open: false,
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
      this.randomColor =
        this.allColors[Math.floor(Math.random() * this.allColors.length)];
    } while (
      this.state.colors.some(color => color.color === this.randomColor.color)
    );
    this.setState(prevSt => ({ colors: [...prevSt.colors, this.randomColor] }));
  }

  clearColors() {
    this.setState({ colors: [] });
  }

  render() {
    const { maxCardNum, paletteList, classes } = this.props;
    const { drawer } = classes;

    const { open, colors } = this.state;

    const isPaletteFull = this.state.colors.length >= maxCardNum;

    return (
      <Box sx={{ display: 'flex' }}>
        <CreateColorNav
          open={open}
          handleDrawerOpen={this.handleDrawerOpen}
          savePalette={this.savePalette}
          paletteList={paletteList}
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
              // key={uuid()}
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
          />
        </Main>
      </Box>
    );
  }
}

export default withStyles(styles)(withNavigate(CreateNewPalette));
