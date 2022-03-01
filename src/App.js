import { Routes, Route } from 'react-router-dom';

import Palette from './pages/Palette';
import seedPalatte from './DATA/seedPalatte';

import PaletteList from './pages/PaletteList';
import SingleColorPalette from './pages/SingleColorPalette';
import CreateNewPalette from './pages/CreateNewPalette';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PaletteList paletteList={seedPalatte} />} />
        <Route path="/palette/new" element={<CreateNewPalette />} />
        <Route path="/palette/:id" element={<Palette />}>
          <Route path=":colorId" element={<SingleColorPalette />} />
        </Route>
        <Route path="*" element={<PaletteList paletteList={seedPalatte} />} />
      </Routes>
    </div>
  );
}

export default App;
