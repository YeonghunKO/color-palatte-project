import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';

class Palette extends Component {
  render() {
    const ColorBoxes = this.props.colors.map(color => (
      <ColorBox key={color.name} background={color.color} name={color.name} />
    ));
    return (
      <div className="Palette">
        <div className="Palette-colors">{ColorBoxes}</div>
      </div>
    );
  }
}

export default Palette;
