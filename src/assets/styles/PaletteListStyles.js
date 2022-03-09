const rootStyle = color => ({
  backgroundColor: color,
  height: '100vh',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  overflowY: 'scroll',
});

export default {
  root: rootStyle('blue'),
  container: {
    width: '50%',
    display: 'flex',
    flexWrap: 'wrap',
    '& a': {
      height: '120%',
    },
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    '& a': {
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: '1.2rem',
      marginTop: '12px',
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
    gap: '4% 2%',
  },
};
