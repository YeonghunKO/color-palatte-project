import { useState } from 'react';
import './NavBar.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './NavBar.css';
import { FormControl, Select, MenuItem } from '@mui/material';

function NavBar(props) {
  const { level, format, changeLevel, changeFormat } = props;
  const [formatState, setFormat] = useState(format);
  const onSelectFormat = e => {
    setFormat(e.target.value);
    changeFormat(e.target.value);
  };
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
      <FormControl variant="standard" sx={{ ml: 'auto', minWidth: 120 }}>
        {/* <InputLabel id="demo-simple-select-filled-label">Age</InputLabel> */}
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={formatState}
          onChange={onSelectFormat}
          defaultValue={formatState}
        >
          <MenuItem value={'hex'}>HEX - #ffffff</MenuItem>
          <MenuItem value={'rgb'}>RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value={'rgba'}>RGBA - rgba(255,255,255, 1.0)</MenuItem>
        </Select>
      </FormControl>
    </header>
  );
}

export default NavBar;
