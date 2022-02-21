import './App.css';
import Palette from './Palette';
import seedPalatte from './seedPalatte';
import { generatePalette } from './getScaleForColor';
function App() {
  return (
    <div>
      <Palette palette={generatePalette(seedPalatte[4])} />{' '}
    </div>
  );
}

export default App;
