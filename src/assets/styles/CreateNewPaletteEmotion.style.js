import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const DrawerInnerDiv = styled.div`
  height: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h6 {
    font-weight: bold;
    /* font-size: 1rem; */
    background: -webkit-linear-gradient(
      25deg,
      rgba(34, 193, 195, 1) 0%,
      rgba(253, 187, 45, 1) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${props => {
      if (props.open) {
        return css`
          ${bounce} 1s 1
        `;
      }
    }};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem;
  width: 83%;

  button {
    font-size: 0.7rem;
  }
`;

export { DrawerInnerDiv, ButtonContainer };
