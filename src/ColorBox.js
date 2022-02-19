import React, { Component } from 'react';
class ColorBox extends Component {
  render() {
    return (
      <div
        style={{ backgroundColor: this.props.background }}
        className="color-box"
      >
        {this.props.name}
      </div>
    );
  }
}

export default ColorBox;
