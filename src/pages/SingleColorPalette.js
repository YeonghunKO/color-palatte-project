import { useOutletContext, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ColorBox from '../components/ColorBox';
import '../assets/css/SingleColorBox.css';
import uuid from 'react-uuid';

import styles from '../assets/styles/ColorBoxStyles';
import { withStyles } from '@mui/styles';

function SingleColorPalette(props) {
  const navigate = useNavigate();
  const [colorsByBrightness, format, footer] = useOutletContext();

  // console.log(props);
  const ColorBoxes = colorsByBrightness.map(colorsObj => (
    <ColorBox
      key={uuid()}
      isSingleColor={true}
      name={colorsObj.name}
      background={colorsObj[format]}
    />
  ));
  return (
    <div style={{ height: '100%' }}>
      <div className="Palette-colors">
        {ColorBoxes}
        <div
          style={{ background: 'black' }}
          className="Single-color-box go-back-box"
        >
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="go-back-button"
          >
            Go Back
          </button>
        </div>
        {footer}
      </div>
    </div>
  );
}

export default SingleColorPalette;
