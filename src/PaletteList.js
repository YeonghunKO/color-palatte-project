import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@mui/styles';

import uuid from 'react-uuid';

import MiniPalette from './MiniPalette';

const styles = {
  root: {
    backgroundColor: 'blue',
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  container: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    color: 'white',
  },
  palettesClass: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: '8% 2%',
  },
};

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
          </nav>
          <div className={palettesClass}>{palettes}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
