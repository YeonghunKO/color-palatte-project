# JS

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

# CSS

1. ` display: inline-block;` 이라고 하면 wrap이랑 똑같은 효과가 나타난다. 왜냐면 span처럼 inline처리가 되기 때문이다.

2. `.copy-overlay` 에서 width,height 다 100% 정해놓고 `.copy-overlay.show` 일때 position을 absolute로 바꿈으로써 다른 color-box를 변경시키지 않고 전 화면을 깔끔하게 다 덮게 할 수 있는것이다.

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

나도 앱을 만들때 아래와 같은 흐름으로 사고해보자

- 앱에 필요한 기능을 적어보기
  - 그 기능들이 어떠한 페이지에 들어갈지 페이지를 생각해보기
    - 페이지에 들어갈 컴포넌트를 생각해보기
      - 컴포넌트에 어떠한 데이터가 필요할지 생각해보기
      - 또한 각각의 컴포넌트에 들어갈 기능을 쉽게 구현가능한 라이브러리가 있는지 찾아보기
      - 어떤 페이지, 또는 어떤 컴포넌트를 누가 설계하고 구현할지 역할 분담하기
      - 각각의 진행상황을 노션같은 툴에 정리하고 수시로 공유하기
      - 중간에 이슈가 생기면 같이 얘기해보면서 해결하기.

# 해야할 일

1. makeStyles에 대해서 TIL쓰기
2. makeStyles를 이용해서 colorPicker style 완성하기
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

<!--
3. PaletteList,colors(createNewPalette안에)는 여러곳에서 자주 쓰이므로 context로 만들어서 바로 보낼 수도록 해보기

4. draggable 함수 최소한만 랜더링 되도록 최적화 하기

5. createNewPalette컴포넌트안에 있는 기능들이 분리되어야 한다.(drawer랑 main으로)

   - 왜냐면 current color가 바뀌는 순간마다 draggablecolorbox 가 새로 랜더링 되기 때문
   - 이는 createNewPalette컴포넌트 안에 drawer랑 Main이 같이 있기 때문이고 state들도 같이 존재하기 때문이다.
   - colors를 reducer와 context로 따로 구현해서 리팩토링하고 분리시켜서 최대한 독립적으로 랜더링 되도록 해보자

     - 그런데 drawer하고 main모두 createNewPalette에서 open state에 의존하고 있다. 결국 open을 클릭할떄 setOpen이 실행되면서 box안에 있는 drawer하고 main이 리랜더링된다.

     - 투두앱처럼 todos / dispatch 로 완전히 구분할 수 가 없는것인가. 투두앱같은경우 부모 컴포넌트에 어떤 state도 없었기 때문에 각각 따로 랜더링이 가능했었다. 요번 경우는 부모 state를 공유하고 있으니... 이를 어쩔꼬.

     - 아니다. state만 분리시키면 된다. 즉 customHook을 만들면 될지도 모르겠다. 그리고 state를 각각 다르게 manipulate하는 메소드가 많으니깐(handleForm,handleDrawerOpen,handleDrawerClose,removeColorBox...) Reducer를 사용해서 customHook을 만들어보자.
     - 음... 일단 퍼포먼스 신경쓰기 말고 구현이 되도록 신경쓰자. -->
