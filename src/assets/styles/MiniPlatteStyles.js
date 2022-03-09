export default {
  root: {
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    transition: 'all .15s linear',
    '&:hover': {
      wbkitTransform: 'scale(1.1)',
      wmoztransform: 'scale(1.1)',
      wotransform: 'scale(1.1)',
      transform: 'scale(1.1)',
      transition: 'all .15s linear',
      woTransition: 'all .15s linear',
      wmozTransition: 'all .15s linear',
      webkitTransition: 'all .15s linear',
    },
    '&:hover svg': {
      opacity: '1',
      transition: 'all .3s ease-in-out',
      color: 'white',
    },
  },
  colorsClass: {
    backgroundColor: 'grey',
    height: '6rem',
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    borderRadius: '5px',
    '@media (min-width: 1300px)': {
      height: '10rem',
    },
    '@media (max-width: 600px)': {
      height: '5rem',
    },
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5rem',
    fontSize: '.8rem',
    position: 'relative',
    '@media (max-width: 600px)': {
      fontSize: '.3rem',
    },
  },
  emojiClass: {
    marginLeft: '0.5rem',
  },

  miniColor: {
    width: '20%',
    display: 'inline-block',
    position: 'relative',
    marginBottom: '-3.5px',
  },
  deleteIcon: {
    color: 'black',
    position: 'absolute',
    backgroundColor: 'red',
    padding: '2px',
    borderRadius: '2px',
    top: '-1px',
    right: '0',
    zIndex: '10',
    opacity: '0',
    '& *': {
      PointerEvent: 'none',
    },
  },
};
