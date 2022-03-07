import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

function NewPaletteMetaForm(props) {
  const [open, setOpen] = useState(false);
  const { paletteList, savePalette } = props;

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Save Palette
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
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
            <Button type="submit" variant="contained">
              Save Palette
            </Button>
          </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewPaletteMetaForm;
