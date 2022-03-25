import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@mui/styles';

import MiniPalette from '../components/MiniPalette';
import BackgroundChangeDialog from '../components/BackgroundChangeDialog';

import styles, { PaletteWrapper } from '../assets/styles/PaletteListStyles';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue } from '@mui/material/colors';
import { red } from '@mui/material/colors';

import { getItem, setItem } from '../utils/storage';

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      deletePaletteId: '',
      deletePaletteName: '',
      backgroundObj: getItem('background'),
    };

    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogDelete = this.handleDialogDelete.bind(this);
    this.setBackground = this.setBackground.bind(this);
  }

  componentDidMount() {
    const backgroundObj = getItem('background');
    this.setState({ backgroundObj });
  }

  handleDialogClose() {
    this.setState({ isDialogOpen: false });
  }

  handleDialogOpen(deletePaletteId, deletePaletteName) {
    this.setState({ isDialogOpen: true, deletePaletteId, deletePaletteName });
  }

  handleDialogDelete(deletePaletteId) {
    this.props.removePalette(deletePaletteId);
    this.setState({ isDialogOpen: false });
  }

  setBackground(backgroundObj) {
    this.setState({ backgroundObj });
    setItem('background', backgroundObj);
  }

  render() {
    const { isDialogOpen, deletePaletteName, deletePaletteId, backgroundObj } =
      this.state;
    const { paletteList, classes, editingPaletteStart } = this.props;
    const { container, nav, palettesClass } = classes;
    const palettes = paletteList.map(palette => (
      <CSSTransition key={palette.id} timeout={500} classNames="PaletteItem">
        <Link to={`palette/${palette.id}`}>
          <MiniPalette
            key={palette.id}
            {...palette}
            openDeleteDialog={this.handleDialogOpen}
            editingPaletteStart={editingPaletteStart}
          />
        </Link>
      </CSSTransition>
    ));

    return (
      <PaletteWrapper backgroundObj={backgroundObj}>
        <div className={container}>
          <nav className={nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">Create New Palette</Link>
          </nav>
          <TransitionGroup className={palettesClass}>
            {palettes}
          </TransitionGroup>
        </div>
        <Dialog onClose={this.handleDialogClose} open={isDialogOpen}>
          <DialogTitle>{`Do you want to delete ${deletePaletteName} Palette?`}</DialogTitle>
          <List sx={{ pt: 0 }}>
            <ListItem
              button
              onClick={() => this.handleDialogDelete(deletePaletteId)}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <CheckCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
            <ListItem button onClick={this.handleDialogClose}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                  <HighlightOffIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </Dialog>
        <BackgroundChangeDialog setBackground={this.setBackground} />
      </PaletteWrapper>
    );
  }
}

export default withStyles(styles)(PaletteList);
