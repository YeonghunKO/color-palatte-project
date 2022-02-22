// import React, { Component } from 'react';
import './NavBar.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './NavBar.css';

function NavBar(props) {
  const { level, changeLevel } = props;
  return (
    <header className="Navbar">
      <div className="logo">
        <a href="#">reactcolorpicker</a>
      </div>
      <div className="slider">
        <Slider
          defaultValue={level}
          min={100}
          step={100}
          max={900}
          onAfterChange={changeLevel}
        />
      </div>
    </header>
  );
}

export default NavBar;
