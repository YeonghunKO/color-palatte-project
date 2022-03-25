import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  changeButton: {
    position: 'absolute !important',
    bottom: '1rem',
    left: '1rem',
    background:
      'linear-gradient(227deg, rgba(244,115,255,1) 0%, rgba(229,124,255,1) 22%, rgba(184,167,255,1) 48%, rgba(175,168,255,1) 68%, rgba(138,148,255,1) 100%)',
    opacity: 0.5,
    transition: 'opacity .15s linear !important',
    '&:hover': {
      opacity: 1,
      transition: 'opacity 0.15s linear',
      woTransition: 'opacity .15s linear',
      wmozTransition: 'opacity .15s linear',
      webkitTransition: 'opacity .15s linear',
    },
  },
  doneButton: {
    // width: '50%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  backgroundImg: {
    cursor: 'pointer',
    transition: 'all .1s linear',
    '&:hover': {
      opacity: 0.8,
    },
  },
});

export default useStyles;
