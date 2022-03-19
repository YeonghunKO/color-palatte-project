import { useState, memo } from 'react';
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
  const {
    open,
    handleDrawerOpen,
    savePalette,
    paletteList,
    autoGenerator,
    isAutoGenerting,
  } = props;

  const navigation = useNavigate();

  const [paletteNameSave, setPaletteNameSave] = useState(false);

  const { goBackButton, saveButton, autoGenButton, extendButton, toolBar } =
    useStyles(props);

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
        <Toolbar className={toolBar}>
          <IconButton
            className={extendButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 0, ...(open && { display: 'none' }) }}
          >
            <AddToPhotos />
          </IconButton>
          <div>
            <Button
              className={goBackButton}
              color="secondary"
              onClick={() => navigation('/')}
              variant="contained"
            >
              Go Back
            </Button>
            <Button
              className={autoGenButton}
              color="warning"
              onClick={autoGenerator}
              variant="contained"
              disabled={isAutoGenerting}
            >
              Auto Generator
            </Button>
            <Button
              className={saveButton}
              variant="contained"
              onClick={handlePaletteNameFormOpen}
            >
              Save
            </Button>
          </div>

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

export default memo(CreateColorNav);
