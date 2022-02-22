import './App.css';
import { Routes, Route } from 'react-router-dom';

import Palette from './Palette';
import seedPalatte from './seedPalatte';

import PaletteList from './PaletteList';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PaletteList paletteList={seedPalatte} />} />
        <Route path="/palette/:id" element={<Palette />} />
      </Routes>
    </div>
  );
}

export default App;
