import chroma, { hex } from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
  let newPalette = {
    paletteName: 'Material UI Colors',
    id: 'material-ui-colors',
    emoji: '🎨',
    colors: {},
  };

  for (const level of levels) {
    newPalette.colors[level] = [];
  }

  for (const colorObj of starterPalette.colors) {
    const scale = getScale(colorObj.color, 10).reverse();
    for (const idx in scale) {
      newPalette.colors[levels[idx]].push({
        name: `${colorObj.name} ${levels[idx]}`,
        id: colorObj.name.toLowerCase().replace(/ /g, '-'),
        hex: scale[idx],
        rgb: chroma(scale[idx]).css(),
        rgba: chroma(scale[idx])
          .css()
          .replace('rgb', 'rgba')
          .replace(')', ',1.0)'),
      });
    }
  }

  return newPalette;
}

function getRange(hexColor) {
  const end = '#fff';
  return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
}

function getScale(hexColor, numberOfColors) {
  return chroma.scale(getRange(hexColor)).mode('lab').colors(numberOfColors);
}

export { generatePalette };
