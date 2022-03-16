import { useState } from 'react';

import { Link } from 'react-router-dom';

import '../assets/css/NavBar.css';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { FormControl, Select, MenuItem, Snackbar, Alert } from '@mui/material';

function NavBar(props) {
  const { changeLevel, changeFormat, isSingleColor, format, level } = props;
  const [open, setOpen] = useState(false);
  const [formatState, setFormat] = useState(format);

  const onSelectFormat = e => {
    setOpen(true);
    setFormat(e.target.value);
    setTimeout(() => {
      changeFormat(e.target.value);
    }, 800);
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
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={formatState}
          onChange={onSelectFormat}
          defaultValue={formatState}
        >
          <MenuItem value={'hex'}>HEX - #fff</MenuItem>
          <MenuItem value={'rgb'}>RGB - rgb</MenuItem>
          <MenuItem value={'rgba'}>RGBA - rgba</MenuItem>
        </Select>
      </FormControl>
      <Snackbar
        open={open}
        autoHideDuration={800}
        onClose={onClose}
        sx={{ width: '110%', height: '2%', marginBottom: '1rem' }}
      >
        <Alert onClose={onClose} severity="success">
          Format Changed To {formatState.toUpperCase()}
        </Alert>
      </Snackbar>
    </header>
  );
}

export default NavBar;
