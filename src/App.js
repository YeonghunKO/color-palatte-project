import { Routes, Route } from 'react-router-dom';

import Palette from './Palette';
import seedPalatte from './seedPalatte';

import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import CreateNewPalette from './CreateNewPalette';

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
