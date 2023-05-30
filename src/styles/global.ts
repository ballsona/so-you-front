import { css } from '@emotion/react';

export const globalStyles = css`
  @font-face {
    font-family: 'Pretendard Variable';
    font-weight: 100 800;
    font-style: normal;
    font-display: swap;
    src: local('Pretendard Variable'),
      url('/PretendardVariable.woff2') format('woff2-variations');
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Pretendard Variable';
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  button {
    border: none;
    cursor: pointer;
  }

  input {
    padding: 0;
    margin: 0;

    :focus {
      outline: none;
    }
  }
`;
