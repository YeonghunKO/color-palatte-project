import { Main, DrawerHeader } from '../assets/styles/CreateNewPalette.style';

import DraggableColorBox from '../components/DraggableColorBox';
import uuid from 'react-uuid';

function DraggableColorContainer(props) {
  return (
    <Main open={open}>
      <DrawerHeader />
      {colors.map(color => (
        <DraggableColorBox key={uuid()} color={color} />
      ))}
    </Main>
  );
}

export default DraggableColorContainer;
