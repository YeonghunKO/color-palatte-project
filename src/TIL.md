# JS

1. 위계

- App
  - Palattes
    - Palatte(ex>aussie color picker)
      - NavBar
      - colorBox
      - footer

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

1. ColorBox isSingleColor에 따라서 리턴 다시 되도록 해라(클래스, copy-msg등등)
1. SingleColorBox에 go back버튼에 navigation(-1) 기능 추가
