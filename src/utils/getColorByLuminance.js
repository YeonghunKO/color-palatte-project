import chroma from 'chroma-js';

const getColorByLuminance = currentColor => {
  const colorLuminance = chroma(currentColor).luminance();
  const opacity = chroma(currentColor).alpha();
  return colorLuminance >= 0.58 || opacity <= 0.5
    ? 'rgb(29, 27, 27)' // 검은
    : 'rgb(255, 255, 255)'; // 흰
};

export { getColorByLuminance };
