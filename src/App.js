import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

import Palette from './pages/Palette';
import seedPalatte from './DATA/seedPalatte';

import PaletteList from './pages/PaletteList';
import SingleColorPalette from './pages/SingleColorPalette';
import CreateNewPalette from './pages/CreateNewPalette';
import useLocalStorageState from './utils/useLocalStorageState';

import Page from './components/Page';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  const location = useLocation();
  const [palette, setPalette] = useLocalStorageState(seedPalatte);

  const [isEditing, setIsEditing] = useState(false);
  const [editingPaletteId, setEditingPaletteId] = useState('');

  const addPalette = useCallback(newPalette => {
    setPalette([...palette, newPalette]);
  }, []);

  const removePalette = useCallback(paletteId => {
    const deletedPalette = palette.filter(palette => palette.id !== paletteId);
    setPalette(deletedPalette);
  }, []);

  const editingPaletteStart = useCallback(paletteId => {
    setIsEditing(true);
    setEditingPaletteId(paletteId);
  }, []);

  return (
    <TransitionGroup style={{ position: 'relative' }}>
      <CSSTransition classNames="Page" timeout={500} key={location.key}>
        {/* 리액트 dev툴에 들어가서 이전과 이후의 컴포넌트의 location을 잘 살펴봐라 */}
        <Routes location={location}>
          <Route
            path="/"
            element={
              <Page>
                <PaletteList
                  removePalette={removePalette}
                  paletteList={palette}
                  editingPaletteStart={editingPaletteStart}
                />
              </Page>
            }
          />
          <Route
            path="/palette/new"
            element={
              <Page>
                <CreateNewPalette
                  addPalette={addPalette}
                  paletteList={palette}
                  editingPaletteId={editingPaletteId}
                />
              </Page>
            }
          />
          <Route
            path="/palette/:id"
            element={
              <Page>
                <Palette paletteList={palette} />
              </Page>
            }
          >
            <Route path=":colorId" element={<SingleColorPalette />} />
          </Route>
          <Route
            path="*"
            element={
              <PaletteList
                removePalette={removePalette}
                paletteList={palette}
              />
            }
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

CreateNewPalette.defaultProps = {
  maxCardNum: 20,
};

export default App;
