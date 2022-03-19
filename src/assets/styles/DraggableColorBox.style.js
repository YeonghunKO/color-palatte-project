import styled from '@emotion/styled';

import sizes from './sizes.style';

import { makeStyles } from '@mui/styles';

import { getColorByLuminance } from '../../utils/getColorByLuminance';

const DraggableColorDiv = styled.div`
  width: 20%;
  height: 25%;
  margin: 0 auto;
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin-bottom: -7px;
  background-color: ${props => props.color};
  color: ${props => getColorByLuminance(props.color)};
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
  padding-bottom: 4px;
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

const DragTextBox = styled.span`
  position: absolute;
  right: 0.2rem;
  top: 5px;
  ${sizes.down('xs')} {
    font-size: 10px;
  }
`;

const useStyles = makeStyles({
  boxContainer: {
    height: '93vh',
    [sizes.down('xl')]: {
      height: '88vh',
    },
    [sizes.down('xs')]: {
      height: '92vh',
    },
  },
  lockIcon: {
    width: '25%',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    left: '6px',
    top: '6px',

    '& svg': {
      [sizes.down('xs')]: {
        fontSize: '1.3rem',
      },
    },

    '& .locked-icon': {
      color: props => props.locked && 'red',
    },
  },
});

export { DraggableColorDiv, BoxContent, useStyles, DragTextBox };
