import styled from '@emotion/styled';

const DraggableColorDiv = styled.div`
  width: 20%;
  height: 25%;
  margin: 0 auto;
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin-bottom: -3.5px;
  background-color: ${props => props.color};
`;

export { DraggableColorDiv };
