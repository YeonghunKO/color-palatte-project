import chroma from 'chroma-js';
import namer from 'color-namer';

// Helper functions
const getHSLvalue = (col, type) => chroma(col).get('hsl.' + type);
const setColor = (col, type, val) => chroma(col).set('hsl.' + type, val);

const pickRandom = arr => arr[randomIdx(arr.length)];
const randomIdx = num => Math.floor(Math.random() * num);
const randomDir = num => (Math.random() > 0.5 ? num : -num);
// colorComponent has internal function called `rgb` to return rgb number in array
const colorStr = colorComponent => `rgb(${colorComponent.rgb().join(',')})`;

function smartColorGenerator(prevColor) {
  let newColor;
  let newName;

  if (prevColor) {
    const rules = [
      //change Hue
      ({ color }) => {
        const prevHue = getHSLvalue(color, 'h');
        // inner possible rules;
        //1) Change color slightly
        //2) Change color a third of the color wheel
        //3) Change color half the color wheel
        const innerRules = [10, 255 / 3, 255 / 2];
        let hue = prevHue + randomDir(pickRandom(innerRules));
        hue = hue % 255;
        const newColor = setColor(color, 'h', hue);
        return colorStr(newColor);
      },
      // change Saturation
      ({ color }) => {
        const prevSat = getHSLvalue(color, 's');
        let sat;
        do {
          sat = prevSat + randomDir(Math.random() * 0.3);
        } while (sat < 0.1 || sat > 0.9);
        const newColor = setColor(color, 's', sat);
        return colorStr(newColor);
      },
      // change Lightness
      ({ color }) => {
        const prevLuma = getHSLvalue(color, 'l');
        let luma;
        do {
          luma = prevLuma + randomDir(Math.random() * 0.2);
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
  const chosenNameOptions = Object.keys(nameOptions).map(
    k => nameOptions[k][0]
  );
  // nameOptions has various categories sorted by distance each
  // extract top-most distance from each category
  newName = pickRandom(chosenNameOptions).name;

  return { name: newName, color: newColor };
}

export { smartColorGenerator, pickRandom };
