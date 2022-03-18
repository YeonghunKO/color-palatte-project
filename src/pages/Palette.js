import React, { Component } from 'react';

import ColorBox from '../components/ColorBox';
import NavBar from '../components/NavBar';
import withParams from '../utils/withParams';

import { generatePalette } from '../utils/getScaleForColor';

import '../assets/css/Palette.css';
import { Outlet } from 'react-router';

function findPalette(palette, currentPaletteId) {
  return palette.find(paletteObj => paletteObj.id === currentPaletteId);
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
    const { PaleltteIdParam, colorIdParam, paletteList } = this.props;
    const { level, format } = this.state;

    const { colors, paletteName, emoji } = generatePalette(
      findPalette(paletteList, PaleltteIdParam)
    );
    let renderResult;
    if (colorIdParam) {
      const colorsByBrightness = [];
      for (const colorLevel in colors) {
        if (colorLevel === '50') {
          continue;
        }
        for (const colorObj of colors[colorLevel]) {
          if (colorObj.id === colorIdParam) {
            colorsByBrightness.push({
              name: colorObj.name,
              [format]: colorObj[format],
            });
            break;
          }
        }
      }
      const footer = (
        <footer className="Single-color-footer">
          {colorIdParam} {emoji}
        </footer>
      );

      renderResult = (
        <>
          <NavBar
            changeFormat={this.changeFormat}
            level={level}
            changeLevel={this.changeLevel}
            isSingleColor={true}
          />

          <Outlet context={[colorsByBrightness, format, footer]} />
        </>
      );
    } else {
      const ColorBoxes = colors[level].map(color => (
        <ColorBox
          moreUrl={`${color.id}`}
          background={color[format]}
          name={color.name}
          key={color.id}
        />
      ));
      renderResult = (
        <>
          <NavBar
            changeFormat={this.changeFormat}
            level={level}
            changeLevel={this.changeLevel}
          />

          <div className="Palette-colors">
            {ColorBoxes}
            <footer className="Palette-footer">
              {paletteName} {emoji}
            </footer>
          </div>
        </>
      );
    }

    return <div className="Palette">{renderResult}</div>;
  }
}

export default withParams(Palette);
