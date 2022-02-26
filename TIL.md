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

# 해야할 일

1. withStyles function에 대해서 TIL쓰기.
   - 인자를 따로 정해놓을 수 있음. 근데 인자를 따로 패스하지 않으면 withStyles가 적용된 함수에 패스된 props가 자동적으로 pass됨
