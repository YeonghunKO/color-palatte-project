# 🏳‍🌈React Color

<p align="center">
	<img width="250px" alt="surf_logo" src="https://raw.githubusercontent.com/YeonghunKO/for-video-container/master/%5B%ED%81%AC%EA%B8%B0%EB%B3%80%ED%99%98%5Drainbow.jpg">
</p>

<br>

<p align="center">
이제 일일이 색깔을 찾으러 구글링 할 필요 없다.
	</p>
<p align="center">
React color를 통해 나만의 palette을 만들어보자
	</p>
<p align="center">
이제 손쉽고 빠르게 내가 원하는 색깔을 바로 복사해서 사용해보자.💨💨😎
	</p>

### ✏️ 이 프로젝트를 시작하게 된 동기

리액트라는 기술을 완전히 내것으로 만들고 싶었다. 그래서 Udemy에서 Colt Steele의 color palette 프로젝트를 참고하였다.

### 📃 프로젝트 진행 과정

- 강의를 보고 그대로 따라하기 보다는 일단 결과물을 보고 내 스스로 코드를 직접 짜보기.
- 하루정도 고민해도 모를경우 강의를 보지말고 깃헙에 올려진 코드를 보고 로직을 파악하기.
- 파악한 로직을 토대로 코드를 다시 짜보기.
- 새롭게 배운 로직, 기술을 문서로 정리하기.
- 내가 짰던 코드에서 부족했던 점 문서로 정리하기.
- 그리고 새롭게 추가하고 싶은 기능을 생각하고 추가하기.

<br>

## 🤖기술 스택

### 📚&nbsp;&nbsp;Frameworkes & Libraries

- react
- emotion
- mui
- chroma(color picker)
- emoji-mart
- rc-slider
- react-router
- netlify

## 🗣 배포

<a href="https://react-colorpalette-colorpicker.netlify.app/">프로젝트 보러가기 👈🏻</a>

## 👁‍🗨 데모

| **Palette**  |   **Palette** - More Color    |
| :----------: | :---------------------------: |
| ![palette](https://user-images.githubusercontent.com/65995664/160326707-923b69f7-390b-4d0a-acde-7ba6072d8e1f.gif) | ![singleColor](https://user-images.githubusercontent.com/65995664/160326734-02619b56-56f0-4779-8252-a0f15b9c688c.gif)
 |

|   New Palette - Edit box    | **New Palette - Add and clear box**  |  **New Palette - autogenerator and lock**  |  **New Palette - save**  |
| :-------------------------: | :----------------------------------: | :----------------------------------------: | :----------------------: |
| ![New Palette - Edit box]() | ![New Palette - Add and clear box]() | ![New Palette -  autogenerator and lock]() | ![New Palette -  save]() |

|     **Edit and Delete Platte**     |            **Change background**             |
| :--------------------------------: | :------------------------------------------: |
| ![**Edit and Delete Platte**  ]()) |            ![Change background]()            |
|        마이 페이지에서 이동        | 연도별 필터링, 해당 달의 작성 일수 확인 가능 |

## 📂 디렉토리 구조

```
src
├─ DATA
│  ├─ backgroundImgs.js
│  └─ seedPalatte.js
├─ assets
│  ├─ css
│  │  ├─ ColorBox.css
│  │  ├─ NavBar.css
│  │  ├─ Page.css
│  │  ├─ Palette.css
│  │  ├─ README.md
│  │  ├─ SingleColorBox.css
│  │  └─ index.css
│  ├─ img
│  │  ├─ confetti-doodles.svg
│  │  ├─ endless-constellation.svg
│  │  ├─ flat-mountains.svg
│  │  ├─ liquid-cheese.svg
│  │  ├─ sun-tornado.svg
│  │  └─ vanishing-stripes.svg
│  └─ styles
│     ├─ BackgroundChangeDialog.style.js
│     ├─ ColorBoxStyles.js
│     ├─ CreateColorPicker.style.js
│     ├─ CreateMetaNav.style.js
│     ├─ CreateNewPalette.style.js
│     ├─ CreateNewPaletteEmotion.style.js
│     ├─ CreateNewPaletteNav.style.js
│     ├─ DraggableColorBox.style.js
│     ├─ MiniPlatteStyles.js
│     ├─ PaletteListStyles.js
│     └─ sizes.style.js
├─ components
│  ├─ BackgroundChangeDialog.js
│  ├─ ColorBox.js
│  ├─ CreateColorNav.js
│  ├─ CreateColorPicker.js
│  ├─ DraggableColorBox.js
│  ├─ DraggableColorList.js
│  ├─ MiniPalette.js
│  ├─ NavBar.js
│  ├─ NewPaletteMetaForm.js
│  └─ Page.js
├─ pages
│  ├─ CreateNewPalette.js
│  ├─ Palette.js
│  ├─ PaletteList.js
│  └─ SingleColorPalette.js
├─ utils
│  ├─ findPalette.js
│  ├─ getColorByLuminance.js
│  ├─ getScaleForColor.js
│  ├─ newColorContext.js
│  ├─ paletteContext.js
│  ├─ smartColorGenerater.js
│  ├─ storage.js
│  ├─ useLocalStorageState.js
│  ├─ useStateCallBack.js
│  ├─ withNagivate.js
│  └─ withParams.js
├─ App.js
├─ App.test.js
├─ index.js
├─ reportWebVitals.js
└─ setupTests.js

```

### 🔻컴포넌트 위계

<a href="https://www.figma.com/file/PAiWdvNxBEFWIe1SjxG8rS/react-color-UML?node-id=0%3A1">컴포넌트 위계 보러가기 👈🏻</a>

### 📖TIL와 회고 보러가기!

<a href="https://www.figma.com/file/PAiWdvNxBEFWIe1SjxG8rS/react-color-UML?node-id=0%3A1">컴포넌트 위계 보러가기 👈🏻</a>
