import chroma from 'chroma-js';

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
};
