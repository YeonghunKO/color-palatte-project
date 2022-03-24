import { useState } from 'react';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import useStyles from '../assets/styles/BackgroundChangeDialog.style';

import backgroundImgs from '../DATA/backgroundImgs';

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
      <Dialog onClose={handleDialogClose} open={open}>
        <DialogTitle>{'Choose the background'}</DialogTitle>
        <ImageList sx={{ width: 400, height: 350, padding: '.3rem' }} cols={2}>
          {backgroundImgs.map(item => (
            <ImageListItem key={item.img}>
              <img
                onClick={() => {
                  props.setBackground(item.title);
                }}
                src={`${item.img}`}
                srcSet={`${item.img}`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar title={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
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
