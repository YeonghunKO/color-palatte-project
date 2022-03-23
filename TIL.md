# JS

<!-- 각각의 번호에 맞는 커밋 링크 첨부하기 -->

1. 위계

- App
  - Palattes
    - Palatte(ex>aussie color picker)
      - NavBar
      - colorBox
      - footer

2. stopPropagation을 드림코딩에서는 부모 이벤트까지 모두 차단하기 때문에 예상치 못한 버그가 일어나서 지양해야한다고 했지만 , 콜트는 사용하였다.

근데 more버튼을 클릭했을때 copy가 안일어나게 하려고 CopyClipBoard에서 `e.taget, e.currentTarget`을 이용해 이벤트를 차단하려고 했는데, onCopy를 통해 전달되는 인자는 copy결과였다 이벤트가 아니라.

onClick으로 이벤트객체를 받아오려 했으니 CopyClipBoard 컴포넌트는 onClick을 지원하지 않는것 같다. 이벤트가 undefined가 뜬다.

아마 이벤트 객체는 은닉화 되어있는 것 같은 느낌이 든다.

그리고 stackoverflow에서 보니깐 stopPropagation을 사용할 때는 사용해도 아무 문제 없다고 답변을 달았다. 무조건 지양하는것은 근시안적인 사고방식이라면서 말이다.

음 일단, 근데 여기서 처럼 stopPropagation을 사용할 수 밖에 없는 경우가 있으니 드림코딩의 논리는 설득력이 떨어진다.

```javascript
// ColorBox.js
<CopyToClipboard text={background} onCopy={this.changeCopyState}>
  {!isSingleColor && (
   <Link to={`${moreUrl}`} onClick={e => e.stopPropagation()}>
      <span className={`see-more ${moreButton}`}>MORE</span>
   </Link>
   )}
<CopyToClipboard/>
```

이렇게 하면 CopyToClipboard에 걸려있는 onCopy이벤트가 작동되지 않는다. 이벤트가 더이상 bubbling하지 않기 때문

3. MiniPalette에서 삭제버튼 구현시 부모 anchor에 걸린 default 이벤트까지 실행되는 이슈

   - 2번처럼 stopPropagation을 해보았으나 a태그가 이미 실행이 되고 난 뒤에 작동하는 거 같다.

   - `pointer-events:none`도 시도해보았으나 실패다. 왜냐면 이건 클릭 target본인이나 자식 요소만 적용가능하기 때문.

   - 근데, preventDefault를 해주니 깔끔하게 해결이 되었다!

   - 음... 삭제버튼은 svg인데 그게 버블링 되어서 anchor까지 도달한다. 즉, 삭제에서의 `e.preventDefault`는 부모 anchor에 까지 도달하여 적용되는 것인가?

코드를 보자.

```javascript
// PaletteList.js
const palettes = paletteList.map(palette => (
  <Link key={uuid()} to={`palette/${palette.id}`}>
    <MiniPalette removePalette={removePalette} key={uuid()} {...palette} />
  </Link>
));

// MiniPalette.js

const handleDelete = evt => {
  evt.preventDefault();
  removePalette(id);
};

return (
  <div className={root}>
    <Delete className={deleteIcon} onClick={handleDelete} />
    <div className={colorsClass}>{miniColorBoxes}</div>
    <h5 className={title}>
      {paletteName} <span className={emojiClass}>{emoji}</span>
    </h5>
  </div>
);
```

아래의 사진을 보면 좀 더 자세하게 알 수 있을 것이다.

{velog폴더에 miniColorPalette 사진 첨부하기}

2. 공식문서나 소스코드를 확인!

- colorpicker 안에서 validateform submit을 했을때 이전 값이 바로 평가되면서 에러메시지가 뜨는 것을 확인하였다
- add color버튼을 누를때만 validate 체크를 했으면 했다.
- 공식문서를 찾아본 결과 마땅한 방법을 발견할 수 없었다. 그래서 ctrl 을 눌러 소스코드를 확인해본 결과 `instantValidate` 라는 prop이 있다는 것을 발견했고 false값을 준 결과 해결하였다!
- 이처럼 새로운 기능을 추가하려하거나 버그가 발견되었을때는 혼자서 헤매지 말고 공식문서나 소스코드를 확인해보자!

3. 조금 생소한 문법을 발견했다.
   그럼 일단 코드부터 보자

```javascript
// createNewPaltte.style.js
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => {
  return {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // 아래의 코드는 무엇을 의미할까??
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  };
});
```

AppBar의 모습이다.

근데 open뒤에 코드가 조금 생소해보인다.

무슨뜻이냐면, createNewPalette에서 open state를 받아와서 true일 경우 open뒤에 있는 {...}를 모두 풀어서 펼치라는 뜻이다.

4. transitionGroup, CSStransition을 router에 적용하는 과정에서 발생한 버그

- CSStransition에 `classNames` 라고 잘 입력해주자! 그리고 거기에 해당하는 클래스이름도 오타없이 잘 적어주고
- 원래라면 이전 route location로 인해 랜더링된 컴포넌트와 새로운 location으로 인해 새롭게 랜더링된 컴포넌트가 나와야한다.
- 이전 컴포넌트에 적용된 classs는 `exit` 이 붙고 새로운 컴포넌트에는 `enter`가 붙는다.
- 근데 이전 exit, enter 둘다 새로운 컴포넌트이다.
- 이전 컴포넌트는 어디로 갔나?
- routes에 location을 지정해주지 않아서 그렇다.
- [이것을 참고하거라](https://www.youtube.com/watch?v=jMl0qOgcf6Y&t=116s)

5. 부모 컴포넌트는 되도록 class 컴포넌트로!

- 왜냐면 자식으로 메소드 넘겨줄때 함수형 컴포넌트면 계속 reference가 다른 메소드를 넘겨주므로 리랜더링 방지가 어렵다.
- addRandomColor랑 removeColor 함수를(참고로 두 함수는 모두 colors obj에 의존하고 있다.) useCallback 을 이용해서 reference를 같게 유지하여 draggableColorBox의 리랜더링을 최소화하려고 했다.

근데 addRandomColor를 호출할 때 마다 colors가 바뀌므로 removeColor도 새롭게 호출되어 draggableColorBox에 전달된다.

두 함수를 철저하게 분리시키는 방법은 dependency를 분리하는 방법인데 어쩔 수 없이 colors를 참조할 수 밖에 없으니... 그래서 결국 class 컴포넌트로 다 바꾸고 두 함수는 메소드와 시켜서 constructor에 bind시켜주었더니 removeColor의 reference를 그대로 유지할 수 있게 되었다. 고로, draggableColorBox를 삭제할 때 위치가 바뀌지 않은 colorbox는 리랜더링 되지 않는 것을 확인 할 수 있었다.

# <<<<<<< HEAD

7. state가 어떤 부분에 국한되어있는지 살피자

- 왜냐면 state를 고립시켜야할때도 있고, 확장시켜야 할 때도 있다.
- 예를들어, Palette.js에서 level이나 format같은 state는 부모 컴포넌트 , 즉 Palette.js에서 관리하는게 맞다. 왜냐면 level이나 format은 그 밑에 컴포넌트까지 공유하는 state이기 때문. 그러나 Colorbox안에 있는 copied state는 Colorbox안에서 관리한다. ColorBox안에서만 통용되기 때문. 아니면 state의 사용 범위가 꽤나 넓을 것 같다고 판단되면 context를 쓰는 것도 괜찮은 방법이다.

- state를 변형시키는 방법이 굉장히 다양하다고 한다면(todo App같은 경우) useReduce를 활용해도 괜찮다.

> > > > > > > 8ff1c64037fbddf256dbe801f838f399af58c532 6. 자식과 부모의 setState가 차례대로 실행될 경우 자식의 setState가 실행되지 않았다.
> > > > > > > NavBar에서 Hook을 사용하여 snackBar와 Slider(color format을 선택할 수 있는 dropdown)를 구현하려고 했다.

Slider에서 format을 선택하면 `onSelectFormat`가 실행된다. setFormat,setOpen이 실행되면서 slider의 value가 바뀌고 snackBar가 open된다. 그리고 부모 컴포넌트, 즉 Palette.js에서 format이 바뀌고 리랜더링 된다. 즉 3번 리랜더링 된다는 의미이다.

```javascript
// NavBar.js
const { changeLevel, changeFormat, isSingleColor } = props;
  const [open, setOpen] = useState(false);
  const [formatState, setFormat] = useState('hex');

  const onSelectFormat = e => {
    setFormat(e.target.value); //
    setOpen(true); //
    changeFormat(e.target.value); // 부모로 부터 내려온 메소드
  };

//Palette.js
  changeFormat(format) {
    this.setState({ format });
  }
```

근데, setFormat,setOpen이 실행되지 않는다... 혹시나 해서, changeFormat을 지워버리니 잘 작동한다. 역시 부모에서 리랜더링 될때 나머지 두개의 setState가 덮어씌어진 느낌이 든다. 아! 이거 이전 포스팅에서 설명한적이 있다.

[여기 참고](https://velog.io/@yhko1992/setState-%EC%95%88%EC%A0%84%ED%95%98%EA%B2%8C)

<<<<<<< HEAD 7. state가 어떤 부분에 국한되어있는지 살피자

- 왜냐면 state를 고립시켜야할때도 있고, 확장시켜야 할 때도 있다.
- 예를들어, Palette.js에서 level이나 format같은 state는 부모 컴포넌트 , 즉 Palette.js에서 관리하는게 맞다. 왜냐면 level이나 format은 그 밑에 컴포넌트까지 공유하는 state이기 때문. 그러나 Colorbox안에 있는 copied state는 Colorbox안에서 관리한다. ColorBox안에서만 통용되기 때문. 아니면 state의 사용 범위가 꽤나 넓을 것 같다고 판단되면 context를 쓰는 것도 괜찮은 방법이다.

- state를 변형시키는 방법이 굉장히 다양하다고 한다면(todo App같은 경우) useReduce를 활용해도 괜찮다.

8. # Palette에서 format바뀔때 setOpen이 안먹힘.

   이에 대한 자세한 내용은 8번에서 추후 설명하겠다.

9. Palette에서 format바뀔때 setOpen이 안먹힘.(6번의 보충 설명)
   > > > > > > > 8ff1c64037fbddf256dbe801f838f399af58c532

- changeFormat때문에 그렇다.
- setOpen이 먹히기 전에 changeFormat가 랜더링해버려서그러나?
- 앞서 배웠다시피, setState가 async라서 그렇다. useStateCallBack을 통해 changeForamat을 조금 뒤에 실행해보았다.
- 그러니깐 setOpen에 의해서 open state가 true로 바뀌는걸 확인했는데 changeFormat이 워낙 빨리 실행되어서 snackBar가 순식간에 사라져 눈에 보이지도 않는다 ㅋㅋㅋ
- 결국 setTimeOut으로 더 뒤에 changeFormat이 실행되도록 하니 snackBar가 나오더라!

```javascript
//NavBar.js
const onSelectFormat = e => {
  setOpen(true);
  setFormat(e.target.value);
  setTimeout(() => {
    changeFormat(e.target.value);
  }, 500);
};
```

아아아아!! 근데 setTimeOut안쓰고도 state가 유지되는 법을 알았다. 바로 NavBar에 key를 없애주면 된다.... 아니 정확히 말하면 key에 uuid값을 매번 새로 보내주고 있었다. 그러니깐 랜더링 될때 uuid값이 매번 변경되므로 다른 컴포넌트로 인식해서 NavBar도 완전 새로고침 되지 않을까하는 추측을 해본다.(key='NavBar'라고 하니깐 state값이 그대로 유지된다!)

그럼 NavBar안에 있는 format state가 새로 랜더링 되어 원래대로 돌아가지 않고 그대로 유지 된다. CreateColorPicker에서 submit을 하고 나서도 colorName state가 유지되는것을 발견하였고 차이점이 뭔지 살펴보다가 알아냈다...

**아래 글은 따로 아티클로 뽑아내기**

이건 리액트가 실행되는 원리와 연관이 깊다. 리액트는 리랜더링이 일어날때 마다(setState, componentDidMount etc) diffing이라는 걸 한다.

> Diffing: The process of **checking the difference** between the new VDOM tree and the old VDOM tree

그렇다 예전 DOM TREE(이하 ODT)와 새로운 DOM TREE(이하 NDT)를 비교하는 것이다. 이때 DOM TREE안에 새로운 element가 있으면 tree를 다시 구성하는 것이다.

그런데 ODT와 NDT사이에 겹치는 element가 있으면 재사용한다. 그럼, 겹치는 건 빼놓고 ODT에 없는것만 적절한 위치에 삽입하거나 갈아끼우면 된다. 이때 필요한것이 바로 KEY PROP이다!

element type이 같다하더라도 key prop이 없으면 재사용하지 않고 다시 element를 생성하고 위치까지 바뀔 수 있다. 근데 key prop이 있으면 재사용할 수 있는 element가 명확해진다.

[KEY PROP 공식문서](https://reactjs.org/docs/reconciliation.html#keys)

위의 문서를 참고해보면 될것이다. 이때 중요한것은 KEY는 unique, predictable, stable 해야한다. 그렇지 않다면 쓸데없는 인스턴스가 생겨나고, 쓸데없이 element가새로 만들어지며 이전 local state는 다 날라갈 것이다. 그래서 color project할때 navbar안에 있는 open, format state가 리랜더링 할때마다 다 새로고침되었던 것!

아래는 공식문서에서 그대로 가져온 말이다.

> Keys should be stable, predictable, and unique. Unstable keys (like those produced by Math.random()) will cause many component instances and DOM nodes to be unnecessarily recreated, which can cause performance degradation and lost state in child components.

이렇게 비교해서 새로 DOM TREE를 만드는 과정을 `reconciliation`이라고 한다. 영영사전의 뜻은 아래와 같다.

> the act of causing two people or groups to become friendly again after an argument or disagreement
> the process of finding a way to make two different ideas, facts, etc., exist or be true at the same time

한 마디로 차이점, 모난 부분을 다듬어서 조화를 이루는 것이다.

근데 diffing algorithms은 tree의 뿌리까지 파고 들어가는 작업이다. 즉, 재귀가 일어난다. 근데 자바스크립트는 single thread 언어라서 재귀가 일어나면 재귀가 끝날 때 까지 다음 작업을 하지 못한다. 모든 작업이 완료되면 모든 변경사항이 응집되어있는 vDOM을 브라우저에 업데이트한다.

즉, 애니메이션, 레이아웃 변경 같은 효과가 일어날 시에 상당히 느려질 수 있다는 단점이 있다. 이를 방지하기 위해 리액트는 `fiber`라는 새로운 알고리즘을 도입하였다.

9. draggablBox안에 있는 edit 버튼 구현

- useState에 isEditting인경우 초기값을 바꾸려고 했으나 안되었다. 그 이유는 state같은 경우 setState를 하기 전까지 초기 값을 그대로 유지하기 때문

```javascript
// CreateColorPicker.js
const {
  addColor,
  isPaletteFull,
  colors,
  isColorBoxEditing,
  editingBoxInfo,
  editColorBoxEnd,
} = props;

const [currentColor, setCurrentColor] = useState(
  isColorBoxEditing ? editingBoxInfo.name : 'purple'
);
```

- 따라서 useEffect를 이용하려고 했다. dependency로는 editingBoxInfo값을 이용하려고 했으나 obj이기 때문에 매번 colorPicker가 변경되었다.

- class 컴포넌트인 createNewPalette안에 있는 editingBoxInfo obj를 memoization하려고 찾아보았다. 그러나 마땅한 방법이 없었다

- 그래서 editingBoxInfo값을 JSON.stringify 해서 넘겨주거나 editingBoxInfo안에 있는 name, color를 dependency로 사용하기로 했다!

10. map안에서 obj는 memo를 이용해서 reference를 유지시켜주지 않아도 되나?

```javascript
const palettes = paletteList.map(palette => (
  <CSSTransition key={palette.id} timeout={500} classNames="PaletteItem">
    <Link to={`palette/${palette.id}`}>
      <MiniPalette
        key={palette.id}
        {...palette} // colors:[..blahblah]
        openDeleteDialog={this.handleDialogOpen}
      />
    </Link>
  </CSSTransition>
));
```

miniPalette은 memo로 저장되어있다.

그래서 `MiniPalette`으로 넘어가는 props의 reference는 똑같이 유지가 되어야 한다. 그러나 map안에서 cb function의 parameter는 reference가 똑같이 유지되는건가? palette안에 colors라는 key가 있는데 value는 array이다. 그럼 Minipalette으로 넘어갈때마다 다른 ref로 된 array가 넘어가서 새로 랜더링 될 수 있는데 리랜더링 되지 않는다.

paletteList가 useState안에 있어서 그런가? useState는 ref까지 자동으로 고정시켜주나? 알아봐야겠다.

# CSS

1. ` display: inline-block;` 이라고 하면 wrap이랑 똑같은 효과가 나타난다. 왜냐면 span처럼 inline처리가 되기 때문이다.

2. `.copy-overlay` 에서 width,height 다 100% 정해놓고 `.copy-overlay.show` 일때 position을 absolute로 바꿈으로써 다른 color-box를 변경시키지 않고 전 화면을 깔끔하게 다 덮게 할 수 있는것이다.

```css
.copy-overlay {
  opacity: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease-in-out;
  transform: scale(0.1);
}

.copy-overlay.show {
  opacity: 1;
  transform: scale(50);
  z-index: 10;
  position: absolute;
}
```

3. border-radius에 의해서 코너가 삐죽 튀어나왔을때 `overflow:hidden` 이라고 해주면 깔끔하게 정리된다. nth-child로 코너에 있는 dom만 선별해서 border-radius를 일일이 설정해주지 않아도 된다.

4. draggableColorBox의 부모 div에 분명히 `{height:100%}`라고 설정했는데도 마지막 줄에 있는 box가 짤리는 버그가 있었다.
   - 개발자 도구로 부모 div를 선택했는데 화면 아래까지 쭉 뻗어있었다. 그럼 뭐가 문제지.
   - 가장 최상위 div 즉, root에 높이를 설정해주지 않아서 생기는 버그였다😂

# 팁

1. 강의보고 따라하지 말고 일단 전체적인 숲을 먼저 머릿속에 그려놓자.

   - 컴포넌트의 위계질서를 적어보는거다.

2. 그리고 커밋 보면서 코드를 쭉 훑어보자.

   - 로직을 이해하면서 어떤식으로 코드를 짜야할지 대충 맥락을 이해한다

3. 그리고 이해한 맥락을 토대로 내가 코드를 짜본다.

   - psuedo code를 적어보면 더 좋다.

4. 그리고 pseudo code를 적고 깃헙에 올리면 더더욱 좋다.

5. 핵심은 내가 직접 생각해서 나만의 방식대로 말해보는거다.

   - 내가 직접 코드를 짤때 그 느낌과 시행착오를 체험해봐야한다.

6. seedColor를 보면 colt가 JSON 데이터를 설계한 흔적을 엿볼 수 있다. Palette,PaletteList,ColorBox와 같은 컴포넌트를 만들때 어떠한 데이터가 필요하고 그 데이터가 어떻게 정리되어야할지 분명 고민했을것이고 그러한 고민의 결과가 바로 seedColor이다.

나도 앱을 만들때 아래와 같은 흐름으로 사고해보자(top-down방식)

- 앱에 필요한 기능을 적어보기
  - 그 기능들이 어떠한 페이지에 들어갈지 페이지를 생각해보기
    - 페이지에 들어갈 컴포넌트를 생각해보기
      - 컴포넌트에 어떠한 데이터가 필요할지 생각해보기
        - 최대한 컴포넌트간 의존성을 최소화하기.(state 분리) 쓸데없는 랜더링을 방지하기 위함이다.
      - 또한 각각의 컴포넌트에 들어갈 기능을 쉽게 구현가능한 라이브러리가 있는지 찾아보기
      - 어떤 페이지, 또는 어떤 컴포넌트를 누가 설계하고 구현할지 역할 분담하기
      - 각각의 진행상황을 노션같은 툴에 정리하고 수시로 공유하기
      - 중간에 이슈가 생기면 같이 얘기해보면서 해결하기.

# 해야할 일

1. emoji 속도 빠르게 하기(스페인 개발자 코드 참고)

2. fiber알고리즘에 대해서 더 공부해라.

- https://immigration9.github.io/react/2021/05/29/react-fiber-architecture.html (fiber)
- https://www.youtube.com/watch?v=0ympFIwQFJw(fiber)

`<Processing phase>`

1. render phase

- 비동기적
- task가 우선, 중지, 삭제 될 수 있음
- internal function이 있음 beginWork, completeWork 같은

2. commit phase

- commitWork가 실행
- 동기적, 중간에 중지 못함
- 최종적으로 화면에 표시됨

> Fiber는 일의 단위이다

> Fiber prop

- 'sth'과 1대1로 관계형성(EX> DOM, 컴포넌트 인스턴스 등등)
- 'sth'의 타입은 태그 prop에 저장

> Fibers는 리액트 엘리먼트와 비슷

- 맞다. 근데 차이점은 Fibers같은 경우 리액트 엘리먼트와는 다르게 최대한 재사용된다.
- DOMtree 형성함.
- 첫번째 자식과 연결되어있음

> 리액트 에서 말하는 `Work`

- 애니메이션 같이 즉각 실행가능한건 high priority 로 분류 (requestAnimationFrame 함수 실행)
- API request 같이 시간이 걸리는건 low priority 로 분류 (requestIdleCallback 함수 실행)
