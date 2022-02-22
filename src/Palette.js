import React, { Component } from 'react';

import ColorBox from './ColorBox';
import NavBar from './NavBar';
import withParams from './withParams';

import { generatePalette } from './getScaleForColor';
import seedPalatte from './seedPalatte';

import './Palette.css';

function findPalette(currentPaletteId) {
  return seedPalatte.find(paletteObj => paletteObj.id === currentPaletteId);
}

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500, format: 'hex' };
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }

  changeFormat(format) {
    this.setState({ format });
  }
  render() {
    const { param } = this.props;
    const { level, format } = this.state;
    const { colors, paletteName, emoji } = generatePalette(findPalette(param));

    const ColorBoxes = colors[level].map(color => (
      <ColorBox key={color.name} background={color[format]} name={color.name} />
    ));
    return (
      <div className="Palette">
        <NavBar
          changeFormat={this.changeFormat}
          format={format}
          level={level}
          changeLevel={this.changeLevel}
        />

        <div className="Palette-colors">{ColorBoxes}</div>
        <footer className="Palette-footer">
          {paletteName} {emoji}
        </footer>
      </div>
    );
  }
}

export default withParams(Palette);
