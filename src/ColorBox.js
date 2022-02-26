import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styles from './assets/styles/ColorBoxStyles';
import './assets/css/ColorBox.css';

import { withStyles } from '@mui/styles';

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
    const { name, background, moreUrl, isSingleColor, classes } = this.props;
    const { copyText, colorName, copyButton, moreButton } = classes;
    const { copied } = this.state;
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
          <div className={`copy-msg ${copied && 'show'} `}>
            <h1>Copied!</h1>
            <p className={copyText}>{background}</p>
          </div>

          <div className="copy-container">
            <div className={`box-content ${colorName}`}>
              <span>{name}</span>
            </div>
            <button className={`copy-button ${copyButton}`}>COPY</button>
          </div>
          {!isSingleColor && (
            <Link to={`${moreUrl}`} onClick={e => e.stopPropagation()}>
              <span className={`see-more ${moreButton}`}>MORE</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
