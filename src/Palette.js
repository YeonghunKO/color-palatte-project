import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = { level: 500 };
    this.changeLevel = this.changeLevel.bind(this);
  }

  changeLevel(level) {
    this.setState({ level });
  }
  render() {
    const { level } = this.state;
    const { colors } = this.props.palette;
    const ColorBoxes = colors[level].map(color => (
      <ColorBox key={color.name} background={color.hex} name={color.name} />
    ));
    return (
      <div className="Palette">
        <Slider
          defaultValue={level}
          min={100}
          step={100}
          max={900}
          onAfterChange={this.changeLevel}
        />
        <div className="Palette-colors">{ColorBoxes}</div>
      </div>
    );
  }
}

export default Palette;
