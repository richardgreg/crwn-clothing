import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
  font-family: 'Open Sans Condensed', sans-serif;
  padding: 20px 60px;

  @media screen and (max-width: 800px){
      padding: 10px;
    }
  }
  @media screen and (max-width: 420px) {
    .djJJRx{
      padding: 0;
    }
  }
    
  a{ 
    text-decoration: none;
    color: rgb(56, 4, 4);
  }

  * {
    box-sizing: border-box;
  }
`;