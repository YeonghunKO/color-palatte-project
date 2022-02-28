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

export const DrawerInnerDiv = styled.div`
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h5 {
    font-weight: bold;
    font-size: 2rem;
    background: -webkit-linear-gradient(
      25deg,
      rgba(34, 193, 195, 1) 0%,
      rgba(253, 187, 45, 1) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${props => {
      if (props.info) {
        return css`
          ${bounce} 1s 1
        `;
      }
    }};
  }
`;
