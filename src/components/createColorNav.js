import { useState, useEffect } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';

import { AppBar } from '../assets/styles/CreateNewPalette.style';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

function CreateColorNav(props) {
  const { open, handleDrawerOpen, savePalette, paletteList } = props;

  const [newPaletteName, setPaletteName] = useState('');

  const updateNewPaletteName = e => {
    setPaletteName(e.target.value);
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isPlatteNameUnique', value => {
      return paletteList.every(({ paletteName }) => {
        return paletteName.toLowerCase() !== newPaletteName.toLowerCase();
      });
    });
  }, [newPaletteName]);

  return (
    <>
      <CssBaseline />
      <AppBar color="default" position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
          <ValidatorForm
            style={{ display: 'flex' }}
            onSubmit={() => savePalette(newPaletteName)}
          >
            <TextValidator
              value={newPaletteName}
              onChange={updateNewPaletteName}
              validators={['required', 'isPlatteNameUnique']}
              errorMessages={[
                'Enter Palette Name',
                'Palette Name already exists',
              ]}
            />
            <Button type="submit" variants="contained" color="secondary">
              Save Palette
            </Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default CreateColorNav;
