import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@mui/styles';

import uuid from 'react-uuid';

import MiniPalette from '../components/MiniPalette';
import styles from '../assets/styles/PaletteListStyles';

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { paletteList, classes } = this.props;
    const { root, container, nav, palettesClass } = classes;
    const palettes = paletteList.map(palette => (
      <Link key={uuid()} to={`palette/${palette.id}`}>
        <MiniPalette key={uuid()} {...palette} />
      </Link>
    ));

    return (
      <div className={root}>
        <div className={container}>
          <nav className={nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">Create New Palette</Link>
          </nav>
          <div className={palettesClass}>{palettes}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
