import chroma from 'chroma-js';

export default {
  copyText: props => ({
    color:
      chroma(props.background).luminance() >= 0.58
        ? 'rgb(29, 27, 27)'
        : 'rgb(255, 255, 255)',
  }),
  colorName: props => ({
    color:
      chroma(props.background).luminance() >= 0.58
        ? 'rgb(29, 27, 27)'
        : 'rgb(255, 255, 255)',
  }),
  copyButton: props => ({
    color:
      chroma(props.background).luminance() >= 0.58
        ? 'rgb(29, 27, 27)'
        : 'rgb(255, 255, 255)',
  }),
  moreButton: props => ({
    color:
      chroma(props.background).luminance() >= 0.58
        ? 'rgb(29, 27, 27)'
        : 'rgb(255, 255, 255)',
  }),
};
