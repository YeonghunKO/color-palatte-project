export default {
  root: {
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    // overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  colorsClass: {
    backgroundColor: 'grey',
    height: '150px',
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    borderRadius: '5px',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5rem',
    fontSize: '1rem',
    position: 'relative',
  },
  emojiClass: {
    marginLeft: '0.5rem',
    fontSize: '1.5rem',
  },

  miniColor: {
    height: '25%',
    width: '20%',
    display: 'inline-block',
    // margin: '0 auto',
    position: 'relative',
    marginBottom: '-3.5px',
  },
};
