import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { useStyles } from '../assets/styles/CreateMetaNav.style';

function NewPaletteMetaForm(props) {
  const [open, setOpen] = useState(false);
  const { paletteList, savePalette } = props;

  const [newPaletteName, setPaletteName] = useState('');

  const { form, validator } = useStyles(props);

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
        <DialogTitle>Choose Palette Name</DialogTitle>
        <ValidatorForm
          className={form}
          onSubmit={() => savePalette(newPaletteName)}
        >
          <DialogContent>
            <DialogContentText>
              Please Write down New Palette Name. And Make sure it's Unique!
            </DialogContentText>

            <TextValidator
              label="Palette Name"
              className={validator}
              variant="filled"
              value={newPaletteName}
              onChange={updateNewPaletteName}
              validators={['required', 'isPlatteNameUnique']}
              errorMessages={[
                'Enter Palette Name',
                'Palette Name already exists',
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default NewPaletteMetaForm;
