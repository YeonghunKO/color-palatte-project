import MuiAppBar from '@mui/material/AppBar';

import { styled } from '@mui/material/styles';

import { createStyles, makeStyles } from '@mui/styles';

import sizes from './sizes.style';

const drawerWidth = 350;

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
      marginRight: 'auto !important',
      fontWeight: 'bold',
      fontStyle: 'italic',

      [sizes.down('xs')]: {
        fontSize: '10px',
      },
    },
    goBackButton: {
      margin: '1rem 1rem !important',
      [sizes.down('xs')]: {
        padding: '4px 1px !important',
        fontSize: '.2rem !important',
      },
    },
    saveButton: {
      [sizes.down('xs')]: {
        padding: '4px 1px !important',
        fontSize: '.2rem !important',
      },
    },
  });
});

export { AppBar, useStyles };
