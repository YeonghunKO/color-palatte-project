import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@mui/styles';

import uuid from 'react-uuid';

import MiniPalette from '../components/MiniPalette';
import styles from '../assets/styles/PaletteListStyles';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { paletteList, classes, removePalette } = this.props;
    const { root, container, nav, palettesClass } = classes;
    const palettes = paletteList.map(palette => (
      <CSSTransition key={palette.id} timeout={500} classNames="PaletteItem">
        <Link key={uuid()} to={`palette/${palette.id}`}>
          <MiniPalette
            removePalette={removePalette}
            key={uuid()}
            {...palette}
          />
        </Link>
      </CSSTransition>
    ));

    return (
      <div className={root}>
        <div className={container}>
          <nav className={nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">Create New Palette</Link>
          </nav>
          <TransitionGroup className={palettesClass}>
            {palettes}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
