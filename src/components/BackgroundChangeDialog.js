import { useState } from 'react';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import useStyles from '../assets/styles/BackgroundChangeDialog.style';

function BackgroundChangeDialog(props) {
  const [open, setOpen] = useState(false);
  const { changeButton, doneButton } = useStyles();

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        onClick={handleDialogOpen}
        className={changeButton}
        variant="contained"
      >
        Change Background
      </Button>
      <Dialog onClick={handleDialogClose} open={open}>
        <DialogTitle>{'Choose the background'}</DialogTitle>
        <div className={doneButton}>
          <Button size="small" onClick={handleDialogClose} variant="contained">
            Done
          </Button>
        </div>
      </Dialog>
    </>
  );
}

export default BackgroundChangeDialog;
