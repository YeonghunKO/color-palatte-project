import MuiAppBar from '@mui/material/AppBar';

import { styled } from '@mui/material/styles';

import { createStyles, makeStyles } from '@mui/styles';

const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => {
  return {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  };
});

const useStyles = makeStyles(() => {
  return createStyles({
    title: {
      marginRight: 'auto',
    },
    goBackButton: {
      margin: '1rem 1rem',
    },
    saveButton: {
      margin: '1rem 0',
    },
  });
});

export { AppBar, useStyles };
