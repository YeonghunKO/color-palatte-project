import { useOutletContext, useNavigate } from 'react-router-dom';
import ColorBox from './ColorBox';
import './SingleColorBox.css';
import uuid from 'react-uuid';

function SingleColorBox(props) {
  const navigate = useNavigate();
  const [colorsByBrightness, format] = useOutletContext();

  const ColorBoxes = colorsByBrightness.map(colorsObj => (
    <ColorBox
      key={uuid()}
      isSingleColor={true}
      name={colorsObj.name}
      background={colorsObj[format]}
    />
  ));
  return (
    <div className="Palette-colors">
      <div className="Palette-colors">
        {ColorBoxes}
        <div style={{ background: 'black' }} className="Single-color-box">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="go-back-button"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleColorBox;
