import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'NanumSquareRoundOTFR';
    src: url('/fonts/nanum-square-round/NanumSquareRoundOTFR.otf') format('opentype');
  }

  @font-face {
    font-family: 'NanumSquareRoundOTFB';
    src: url('/fonts/nanum-square-round/NanumSquareRoundOTFB.otf') format('opentype');
  }

  @font-face {
    font-family: 'NanumSquareRoundOTFEB';
    src: url('/fonts/nanum-square-round/NanumSquareRoundOTFEB.otf') format('opentype');
  }
`;

export default GlobalStyles;
