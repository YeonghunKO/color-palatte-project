import { useState, useCallback } from 'react';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

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
  const navigation = useNavigate();
  const [paletteList, setPalette] = useLocalStorageState(seedPalatte);

  const [editingPaletteId, setEditingPaletteId] = useState(null);

  const addPalette = newPalette => {
    setPalette([...paletteList, newPalette]);
  };

  const removePalette = paletteId => {
    const deletedPalette = paletteList.filter(
      palette => palette.id !== paletteId
    );

    setPalette(deletedPalette);
  };

  const editingPaletteStart = useCallback(paletteId => {
    setEditingPaletteId(paletteId);
    navigation('/palette/new');
  }, []);

  const editingPaletteEnd = useCallback(editedPalettObj => {
    if (editedPalettObj) {
      const editedPaletteList = paletteList.map(palette =>
        palette.id === editedPalettObj.id ? editedPalettObj : palette
      );

      setPalette(editedPaletteList);
    }

    setEditingPaletteId(null);
  }, []);
  // paletteList 추가 일단 안해보고 결과 보기

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
                  paletteList={paletteList}
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
                  paletteList={paletteList}
                  editingPaletteId={editingPaletteId}
                  editingPaletteEnd={editingPaletteEnd}
                />
              </Page>
            }
          />
          <Route
            path="/palette/:id"
            element={
              <Page>
                <Palette paletteList={paletteList} />
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
                paletteList={paletteList}
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
