import './App.css';
import Palette from './Palette';
import seedPalatte from './seedPalatte';

function App() {
  return (
    <div className="App">
      <Palette colors={seedPalatte[0].colors} />
    </div>
  );
}

export default App;
