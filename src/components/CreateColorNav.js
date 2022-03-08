import { useState } from 'react';
import { useNavigate } from 'react-router';

import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
// import MenuIcon from '@mui/icons-material/Menu';
import { AddToPhotos } from '@mui/icons-material';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';

import { AppBar } from '../assets/styles/CreateNewPaletteNav.style';

import { useStyles } from '../assets/styles/CreateNewPaletteNav.style';

import NewPaletteMetaForm from '../components/NewPaletteMetaForm';

function CreateColorNav(props) {
  const { open, handleDrawerOpen, savePalette, paletteList } = props;

  const navigation = useNavigate();

  const [paletteNameSave, setPaletteNameSave] = useState(false);

  const { title, goBackButton } = useStyles(props);

  const handlePaletteNameFormOpen = () => {
    setPaletteNameSave(true);
  };

  const handlePaletteNameFormClose = () => {
    setPaletteNameSave(false);
  };

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
            <AddToPhotos />
          </IconButton>
          <Typography className={title} variant="h7" noWrap component="div">
            Let's Custom Your Own Palette ~
          </Typography>

          <Button
            className={goBackButton}
            color="secondary"
            onClick={() => navigation('/')}
            variant="contained"
          >
            Go Back
          </Button>
          <Button variant="contained" onClick={handlePaletteNameFormOpen}>
            Save Palette
          </Button>
          {paletteNameSave && (
            <NewPaletteMetaForm
              paletteList={paletteList}
              savePalette={savePalette}
              formClose={handlePaletteNameFormClose}
            />
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default CreateColorNav;
