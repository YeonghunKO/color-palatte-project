import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';

import './ColorBox.css';

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };
    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState(e) {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }

  render() {
    const { name, background, moreUrl, isSingleColor } = this.props;
    const { copied } = this.state;
    const isLight = chroma(background).luminance() >= 0.58;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div
          style={{ background }}
          className={`${isSingleColor ? 'Single-color-box' : 'Color-box'}`}
        >
          <div
            style={{ background }}
            className={`copy-overlay ${copied && 'show'}`}
          />
          <div
            className={`copy-msg ${copied && 'show'} ${
              isLight ? 'dark-text' : 'light-text'
            }`}
          >
            <h1>Copied!</h1>
            <p>{background}</p>
          </div>

          <div className="copy-container">
            <div
              className={`box-content ${isLight ? 'dark-text' : 'light-text'}`}
            >
              <span>{name}</span>
            </div>
            <button
              className={`copy-button ${isLight ? 'dark-text' : 'light-text'}`}
            >
              COPY
            </button>
          </div>
          {!isSingleColor && (
            <Link to={`${moreUrl}`} onClick={e => e.stopPropagation()}>
              <span
                className={`see-more ${isLight ? 'dark-text' : 'light-text'}`}
              >
                MORE
              </span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
