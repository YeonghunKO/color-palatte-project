import { memo, useState, useEffect, useMemo } from 'react';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { Button, Snackbar, Alert } from '@mui/material';

import { ChromePicker } from 'react-color';

import useStyles from '../assets/styles/CreateColorPicker.style';

import { getColorByLuminance } from '../utils/getColorByLuminance';

import useStateCallBack from '../utils/useStateCallBack';

function CreateColorPicker(props) {
  const {
    addColor,
    isPaletteFull,
    colors,
    isColorBoxEditing,
    editingBoxInfo,
    editColorBoxEnd,
    onUpdateEditingBoxColor,
    editColorBoxCancel,
  } = props;

  const [currentColor, setCurrentColor] = useStateCallBack('purple');

  const [newColorName, setNewColorName] = useState('purple');

  const [open, setOpen] = useState(false);

  const {
    chromePickerClassName,
    TextValidatorFormClassName,
    TextValidatorClassName,
    pickerButtonContainer,
  } = useStyles(props);

  const prevColorsForEditing = useMemo(
    () => colors,
    [editingBoxInfo.name, editingBoxInfo.color]
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const updateCurrentColor = newColor => {
    setCurrentColor(newColor.hex, newColor => {
      if (isColorBoxEditing) {
        onUpdateEditingBoxColor(newColor);
      }
    });
  };

  const handleForm = evt => {
    setNewColorName(evt.target.value);
  };

  const handleSubmit = e => {
    const newColorObj = {
      name: newColorName,
      color: currentColor,
      locked: false,
    };
    if (isColorBoxEditing) {
      editColorBoxEnd(newColorObj);
      setOpen(true);
    } else {
      addColor(newColorObj);
    }

    setNewColorName('');
  };

  const onEditCancel = () => {
    setCurrentColor('purple');
    setNewColorName('');
    editColorBoxCancel();
  };

  const validator = compareColors => {
    ValidatorForm.addValidationRule('isNameUnique', value => {
      // 각각 대조해보고 다르면 true가 나옴.
      // 한개라도 같은게 있으면 false가 나오면서 isColorUnique가 발동됨
      return compareColors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });

    if (isColorBoxEditing) {
      ValidatorForm.addValidationRule('isColorUnique', value => {
        return true;
      });
    } else {
      ValidatorForm.addValidationRule('isColorUnique', value => {
        return compareColors.every(({ color }) => {
          return currentColor !== color;
        });
      });
    }

    ValidatorForm.addValidationRule('isStrLengthEnough', value => {
      return value.length < 14;
    });
  };
  useEffect(() => {
    if (isColorBoxEditing) {
      validator(prevColorsForEditing);
    } else {
      validator(colors);
    }
  }, [newColorName, currentColor, colors]);

  useEffect(() => {
    if (editingBoxInfo.name || editingBoxInfo.color) {
      const { name, color } = editingBoxInfo;
      setCurrentColor(color);
      setNewColorName(name);
    }
  }, [editingBoxInfo.name, editingBoxInfo.color]);

  return (
    <>
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        className={chromePickerClassName}
        disableAlpha={true}
      />
      <ValidatorForm
        onSubmit={handleSubmit}
        className={TextValidatorFormClassName}
        instantValidate={false}
      >
        <TextValidator
          validators={[
            'required',
            'isNameUnique',
            'isColorUnique',
            'isStrLengthEnough',
          ]}
          errorMessages={[
            'Enter Color Name',
            'Name has already been taken',
            'Color has already been taken',
            'Name should be less than 13 chars',
          ]}
          value={newColorName.toUpperCase()}
          onChange={handleForm}
          className={TextValidatorClassName}
          variant="filled"
          placeholder="Color Name"
        />
        <div className={pickerButtonContainer}>
          {isColorBoxEditing && (
            <Button color="error" variant="contained" onClick={onEditCancel}>
              Cancel Edit
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            style={{
              background: `${
                !isColorBoxEditing && isPaletteFull ? 'grey' : currentColor
              }`,
              color: currentColor && getColorByLuminance(currentColor),
              width: '40%',
              padding: '.5rem',
            }}
            disabled={!isColorBoxEditing && isPaletteFull}
          >
            {(function () {
              if (isColorBoxEditing) {
                return 'Edit!';
              } else if (isPaletteFull) {
                return 'Palette Full';
              } else {
                return 'Add Color';
              }
            })()}
          </Button>
        </div>
      </ValidatorForm>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Edit Completed!
        </Alert>
      </Snackbar>
    </>
  );
}

export default memo(CreateColorPicker);
