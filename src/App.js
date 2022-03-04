import { Routes, Route } from 'react-router-dom';

import { useState } from 'react';

import Palette from './pages/Palette';
import seedPalatte from './DATA/seedPalatte';

import PaletteList from './pages/PaletteList';
import SingleColorPalette from './pages/SingleColorPalette';
import CreateNewPalette from './pages/CreateNewPalette';
import createPalette from '@mui/material/styles/createPalette';

function App() {
  const [palette, setPalette] = useState(seedPalatte);

  const addPalette = newPalette => {
    setPalette([...palette, newPalette]);
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<PaletteList paletteList={palette} />} />
        <Route
          path="/palette/new"
          element={
            <CreateNewPalette addPalette={addPalette} paletteList={palette} />
          }
        />
        <Route path="/palette/:id" element={<Palette paletteList={palette} />}>
          <Route path=":colorId" element={<SingleColorPalette />} />
        </Route>
        <Route path="*" element={<PaletteList paletteList={palette} />} />
      </Routes>
    </div>
  );
}

CreateNewPalette.defaultProps = {
  maxCardNum: 20,
};

export default App;
