import chroma from 'chroma-js';
import namer from 'color-namer';

const getHSLvalue = (col, type) => chroma(col).get('hsl.' + type);
const pickRandom = arr => arr[randomIdx(arr.length)];
const randomIdx = num => Math.floor(Math.random() * num);
const randomDir = num => (Math.random() > 0.5 ? num : -num);
const setColor = (col, type, val) => chroma(col).set('hsl.' + type, val);
const colorStr = colorComponent => `rgb(${colorComponent.rgb().join(',')})`;

function smartColorGenerator(prevColor) {
  let newColor;
  let newName;

  if (prevColor) {
    const rules = [
      //change hue
      ({ color }) => {
        const prevHue = getHSLvalue(color, 'h');
        const innerRules = [10, 255 / 3, 255 / 2];
        let hue = prevHue + randomDir(pickRandom(innerRules));
        hue = hue % 255;
        const newColor = setColor(color, 'h', hue);
        return colorStr(newColor);
      },
      // change saturation
      ({ color }) => {
        const prevSat = getHSLvalue(color, 's');
        let sat;
        do {
          sat = prevSat + randomDir(0.3);
        } while (sat < 0.1 || sat > 0.9);
        const newColor = setColor(color, 's', sat);
        return colorStr(newColor);
      },
      // change lightness
      ({ color }) => {
        const prevLuma = getHSLvalue(color, 'l');
        let luma;
        do {
          luma = prevLuma + randomDir(0.15);
        } while (luma < 0.2 || luma > 0.95);
        const newColor = setColor(color, 'l', luma);
        return colorStr(newColor);
      },
    ];

    newColor = pickRandom(rules)(prevColor);
  } else {
    newColor = `rgb(${randomIdx(256)},${randomIdx(256)},${randomIdx(256)})`;
  }

  const nameOptions = namer(newColor);
  newName = Object.keys(nameOptions)
    .map(k => nameOptions[k][0])
    .sort((a, b) => a.distance - b.distance)[0].name;

  return { name: newName, color: newColor };
}
