import MuiAppBar from '@mui/material/AppBar';

import { styled } from '@mui/material/styles';

import { createStyles, makeStyles } from '@mui/styles';

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
      // background:
      //   'linear-gradient(227deg, rgba(148,170,233,1) 0%, rgba(144,152,193,1) 30%, rgba(169,137,182,1) 74%, rgba(238,174,202,1) 100%)',
    },
    goBackButton: {
      margin: '1rem 1rem !important',
    },
  });
});

export { AppBar, useStyles };
