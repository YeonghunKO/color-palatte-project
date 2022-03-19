const randomColor = (basedOn, compareList = this.state.colors) => {
  let newColor;
  // basedOn = basedOn || this.state.colors[this.state.colors.length - 1];
  const repeated = newColor =>
    compareList.some(
      color => color.name === newColor.name || color.color === newColor.color
    );
  do {
    newColor = smartColorGenerator(basedOn);
  } while (repeated(newColor));
  return { ...newColor, locked: false, key: newColor.name };
};

const updateOneByOne = (newColors, idx) => {
  this.setState(
    //{colors:[...newColors.slice(0,idx),newColors[idx]]}
    {
      colors: this.state.colors.map((c, i) => (i === idx ? newColors[idx] : c)),
    },
    () => {
      if (idx < 19) {
        setTimeout(() => {
          this.updateOneByOne(newColors, idx + 1);
        }, 0); // time을 바꿔보자. 조금 더디게 펼쳐지는지 궁금ㅋ
      }
    }
  );
};

const throttleForAutoGenerator = () => {
  // this.setState(prevSt => ({isAutoGenertor:true}),this.autoGenerate)
  // this.setState(prevSt => ({isAutoGenertor:false}))

  this.setState(() => {
    isAutoGenertor: true;
  }, this.autoGenerate);
  this.setState(() => {
    isAutoGenertor: false;
  });
};

const autoGenerate = () => {
  // reason to use locked colors for baseColors is to take locked colors into account to autogenerate

  let baseColors = this.state.colors.filter(c => c.locked);
  let newColors = [];
  for (let i = 0; i < 20; i++) {
    const originalColor = this.state.colors[i];
    if (originalColor && originalColor.locked) newColors[i] = originalColor;
    else {
      const basedOn = pickRandom(baseColors);
      const newColor = this.randomColor(basedOn, baseColors);
      baseColors.push(newColor);
      newColors[i] = newColor;
    }
  }

  //Use a temporary array with different keys and empty colors to allow updating one by one without duplicating keys
  let tempColors = [];
  // tempColors는 어짜피 교체되니깐 그냥 각각의 요소를 아무값이나 바꿔도 되지 않나?
  //   const arr20 = Array.from({length:20},(v,i) => i) // 요런식으로?

  // 왜 굳이 값을 확인하고 조건에 따라 교체하는거지?
  for (let i = 0; i < 20; i++) {
    let isColorExist = this.state.colors[i];
    if (isColorExist) {
      tempColors[i] = isColorExist.locked
        ? isColorExist
        : { ...isColorExist, key: i + 'temp' };
    } else {
      tempColors[i] = { name: '', color: 'rgba(0,0,0,0)', key: i + 'temp' };
    }
  }

  this.setState({ colors: tempColors }, () => {
    this.updateOneByOne(newColors, 0);
  });
};
