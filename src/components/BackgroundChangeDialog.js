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
  const { changeButton, doneButton, backgroundImg } = useStyles();

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
        <DialogTitle style={{ textAlign: 'center' }}>
          Choose the background
        </DialogTitle>
        <ImageList
          sx={{ width: '100%', height: '100%', padding: '.3rem' }}
          cols={2}
          rowHeight={300}
        >
          {backgroundImgs.map(backgroundObj => (
            <ImageListItem key={backgroundObj.img}>
              <img
                onClick={() => {
                  props.setBackground(backgroundObj);
                }}
                src={`${backgroundObj.img}`}
                srcSet={`${backgroundObj.img}`}
                alt={backgroundObj.title}
                loading="lazy"
                className={backgroundImg}
              />
              <ImageListItemBar title={backgroundObj.title} />
            </ImageListItem>
          ))}
        </ImageList>
        <div className={doneButton}>
          <Button onClick={handleDialogClose} variant="contained">
            Done
          </Button>
        </div>
      </Dialog>
    </>
  );
}

export default BackgroundChangeDialog;
