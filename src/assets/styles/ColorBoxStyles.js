import chroma from 'chroma-js';
import size from './sizes.style';

const getColorByLuminance = props => ({
  color:
    chroma(props.background).luminance() >= 0.58
      ? 'rgb(29, 27, 27)'
      : 'rgb(255, 255, 255)',
});

export default {
  copyText: getColorByLuminance,
  colorName: getColorByLuminance,
  copyButton: getColorByLuminance,
  moreButton: getColorByLuminance,
  colorBox: {
    [size.down('lg')]: {
      width: '25%',
      height: props => (props.isSingleColor ? '45%' : '40%'),
    },
    [size.down('md')]: {
      width: '50%',
      height: props => (props.isSingleColor ? '35%' : '30%'),
    },
    [size.down('xs')]: {
      width: '100%',
      height: props => (props.isSingleColor ? '15%' : '10%'),
    },
  },
};
