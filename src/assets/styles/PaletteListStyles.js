import sizes from './sizes.style';
import doodlesImg from './img/confetti-doodles.svg';
// import flatMountainImg from './img/flat-mountains.svg';

const rootStyle = bg => ({
  backgroundImage: bg,
  height: '100vh',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  overflowY: 'scroll',
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#fff',
    width: '12px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: ' #babac0',
    borderRadius: '16px',
    border: '4px solid #fff',
  },
  '&::-webkit-scrollbar-button': {
    display: 'none',
  },
});
export default {
  '@global': {
    '.PaletteItem-exit': {
      opacity: 1,
    },
    '.PaletteItem-exit-active': {
      opacity: 0,
      transition: 'opacity 500ms ease-in',
    },
  },

  root: rootStyle(`url(${doodlesImg})`),
  container: {
    width: '50%',
    display: 'flex',
    flexWrap: 'wrap',
    '& a': {
      height: '120%',
    },
    [sizes.down('xs')]: {
      width: '75%',
    },
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    '& h1': {
      [sizes.down('xs')]: {
        fontSize: '1.3rem',
      },
    },
    '& a': {
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: '1.1rem',
      [sizes.down('xs')]: {
        fontSize: '.9rem',
      },
    },
    '& a:hover': {
      opacity: '0.8',
      transition: 'all 100ms linear',
    },
  },
  palettesClass: {
    // height: '100vh',
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    [sizes.down('sm')]: {
      gridTemplateColumns: 'repeat(2,1fr)',
    },
    [sizes.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
    gap: '4% 2%',
  },
};
