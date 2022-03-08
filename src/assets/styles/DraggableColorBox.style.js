import styled from '@emotion/styled';
import { css } from '@emotion/react';

import chroma from 'chroma-js';

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
`;

const BoxContent = styled.div`
  width: 100%;
  position: absolute;
  padding: 10px;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
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

export { DraggableColorDiv, BoxContent };
