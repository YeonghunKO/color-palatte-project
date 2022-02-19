import React, { Component } from 'react';
import ColorBox from './ColorBox';

class Palette extends Component {
  render() {
    const ColorBoxes = this.props.colors.map(color => (
      <ColorBox background={color.color} name={color.name} />
    ));
    return <div className="palette">{ColorBoxes}</div>;
  }
}

export default Palette;
