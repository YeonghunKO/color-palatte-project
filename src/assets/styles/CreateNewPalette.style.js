import { keyframes } from '@emotion/react';

import { styled } from '@mui/material/styles';

import sizes from './sizes.style';

const drawerWidth = 350;

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: '100vh',
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    [sizes.down('xs')]: {
      marginLeft: `-${window.innerWidth}px`,
    },
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  minHeight: '70px !important',
  [sizes.down('xs')]: {
    minHeight: '58px !important',
  },
}));

const styles = {
  drawer: {
    width: drawerWidth,
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    [sizes.down('xs')]: {
      width: `${window.innerWidth}px`,
    },
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      [sizes.down('xs')]: {
        width: `${window.innerWidth}px`,
      },
    },
  },
};

export { Main, DrawerHeader, drawerWidth, styles };
