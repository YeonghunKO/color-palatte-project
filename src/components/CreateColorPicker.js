import { memo, useState, useEffect } from 'react';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { Button } from '@mui/material';

import { ChromePicker } from 'react-color';

import useStyles from '../assets/styles/CreateColorPicker.style';

import chroma from 'chroma-js';

function CreateColorPicker(props) {
  const { addColor, isPaletteFull, colors } = props;
  const [currentColor, setCurrentColor] = useState('#800080');

  const [newColorName, setNewColorName] = useState('');
  const {
    chromePickerClassName,
    TextValidatorFormClassName,
    TextValidatorClassName,
  } = useStyles(props);

  const getColorByLuminance = currentColor => {
    console.log('getColorByLuminance');
    return chroma(currentColor).luminance() >= 0.58
      ? 'rgb(29, 27, 27)'
      : 'rgb(255, 255, 255)';
  };

  const updateCurrentColor = newColor => {
    console.log(newColor);
    setCurrentColor(newColor.hex);
  };

  const handleForm = evt => {
    setNewColorName(evt.target.value);
  };

  const handleSubmit = e => {
    const newColorObj = {
      name: newColorName,
      color: currentColor,
    };
    addColor(newColorObj);
    setNewColorName('');
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isNameUnique', value => {
      // 각각 대조해보고 다르면 true가 나옴.
      // 한개라도 같은게 있으면 false가 나오면서 isColorUnique가 발동됨
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });

    ValidatorForm.addValidationRule('isColorUnique', value => {
      return colors.every(({ color }) => {
        console.log(color, currentColor);
        return currentColor !== color;
      });
    });
  }, [newColorName, currentColor, colors]);
  console.log('color picker');
  return (
    <>
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        className={chromePickerClassName}
      />
      <ValidatorForm
        onSubmit={handleSubmit}
        className={TextValidatorFormClassName}
      >
        <TextValidator
          validators={['required', 'isNameUnique', 'isColorUnique']}
          errorMessages={[
            'Enter Color Name',
            'Name has already been taken',
            'Color has already been taken',
          ]}
          value={newColorName}
          onChange={handleForm}
          className={TextValidatorClassName}
          variant="filled"
          placeholder="Color Name"
        />
        <Button
          type="submit"
          variants="contained"
          style={{
            background: `${isPaletteFull ? 'grey' : currentColor}`,
            color: getColorByLuminance(currentColor),
            width: '40%',
            padding: '.5rem',
          }}
          disabled={isPaletteFull}
        >
          {isPaletteFull ? 'Palette Full' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </>
  );
}

export default memo(CreateColorPicker);
