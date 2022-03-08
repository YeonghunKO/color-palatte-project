import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => {
  return createStyles({
    chromePickerClassName: {
      width: '70% !important',
    },
    TextValidatorFormClassName: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // justifyContent: 'center',
      width: '100%',
    },
    TextValidatorClassName: {
      margin: '1rem 0 !important',
      width: '15rem',
    },
  });
});

export default useStyles;
