import { createGlobalStyle } from "styled-components";
import Reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${Reset};
    * {
        box-sizing: border-box;
        scroll-behavior: smooth;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.textColor};
        font-family: 'Ubuntu', sans-serif;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
`;

export default GlobalStyle;
