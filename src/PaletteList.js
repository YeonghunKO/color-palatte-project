import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { paletteList } = this.props;
    const palettes = paletteList.map(palette => (
      <p>
        <Link to={`palette/${palette.id}`}>{palette.paletteName}</Link>
      </p>
    ));

    return <div>{palettes}</div>;
  }
}

export default PaletteList;
