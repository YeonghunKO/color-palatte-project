import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { useStyles } from '../assets/styles/CreateMetaNav.style';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

function NewPaletteMetaForm(props) {
  const [dialogType, setDialogType] = useState('form');

  const { paletteList, savePalette, formClose } = props;

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

  const handleDialog = type => {
    setDialogType(type);
  };

  const handleSelectEmoji = emoji => {
    savePalette({ newPaletteName, emoji: emoji.native });
  };

  return (
    <div>
      <Dialog open={dialogType === 'emoji'}>
        <DialogTitle>Choose Palette Emoji</DialogTitle>
        <Picker title="Choose Platte Emoji" onSelect={handleSelectEmoji} />
      </Dialog>
      <Dialog open={dialogType === 'form'} onClose={formClose}>
        <DialogTitle>Choose Palette Name</DialogTitle>
        <ValidatorForm className={form} onSubmit={() => handleDialog('emoji')}>
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
            <Button variant="contained" color="error" onClick={formClose}>
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
