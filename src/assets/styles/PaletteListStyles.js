import sizes from './sizes.style';
import styled from '@emotion/styled';

const PaletteWrapper = styled.div`
  background-image: ${props => `url(${props.backgroundObj.img})`};
  background-size: ${props =>
    ['Liquid Cheese', 'Mountains', 'Sun Tornado'].includes(
      props.backgroundObj.title
    )
      ? 'cover'
      : 'auto'};
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: scroll;
  &::-webkit-scrollbar-track {
    background-color: #fff;
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #babac0;
    border-radius: 16px;
    border: 4px solid #fff;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
`;

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
      fontSize: '1.5rem',
      background:
        'linear-gradient(90deg, red, orange, yellow, green, #5151e6, #3131dd, #bb4abb);',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      [sizes.down('xs')]: {
        fontSize: '1.4rem',
      },
    },
    '& a': {
      fontFamily: 'fantasy',
      background: 'white',
      height: '42%',
      padding: '0 .3rem',
      borderRadius: '10px',
      color: 'black',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: '.9rem',
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
    '& a': {
      textDecoration: 'none',
    },
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

export { PaletteWrapper };
