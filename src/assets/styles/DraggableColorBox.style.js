import styled from '@emotion/styled';
import { css } from '@emotion/react';

import chroma from 'chroma-js';

import sizes from './sizes.style';

import { makeStyles } from '@mui/styles';

// draggableColorBoxList height 변경을 위한 makeStyle을 만들어라
// height: innerWidht-css 13gxv32 값을 빼라
const DraggableColorDiv = styled.div`
  width: 20%;
  height: 25%;
  margin: 0 auto;
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin-bottom: -7px;
  background-color: ${props => props.color};
  color: ${props =>
    chroma(props.color).luminance() >= 0.58
      ? css`rgb(29, 27, 27)`
      : css`rgb(255, 255, 255)`};

  ${sizes.down('sm')} {
    width: 25%;
    height: 20%;
  }
  ${sizes.down('xs')} {
    width: 50%;
    height: 10%;
  }
`;

const BoxContent = styled.div`
  width: 100%;
  position: absolute;
  padding: 10px;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 1px;
  font-size: 12px;
  text-transform: uppercase;

  svg {
    transition: all 0.3s ease-in-out;
  }
  svg:hover {
    color: red;
    transform: scale(1.5);
  }
`;

const useStyles = makeStyles({
  boxContainer: {
    height: '89vh',
    [sizes.down('xs')]: {
      height: '92vh',
    },
  },
});

export { DraggableColorDiv, BoxContent, useStyles };
