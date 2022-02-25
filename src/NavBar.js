import { useState } from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './NavBar.css';

import { FormControl, Select, MenuItem, Snackbar, Alert } from '@mui/material';

function NavBar(props) {
  const { level, format, changeLevel, changeFormat, isSingleColor } = props;
  const [open, setOpen] = useState(false);
  const [formatState, setFormat] = useState(format);
  const onSelectFormat = e => {
    setFormat(e.target.value);
    changeFormat(e.target.value);
    setOpen(true);
  };

  const onClose = (evt, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <header className="Navbar">
      <div className="logo">
        <Link to="/">reactcolorpicker</Link>
      </div>
      {!isSingleColor && (
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            step={100}
            max={900}
            onAfterChange={changeLevel}
          />
        </div>
      )}
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
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={onClose}
        sx={{ width: '110%', height: '2%' }}
      >
        <Alert onClose={onClose} severity="success">
          Format Changed To {format.toUpperCase()}
        </Alert>
      </Snackbar>
    </header>
  );
}

export default NavBar;
