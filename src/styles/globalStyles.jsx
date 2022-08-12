import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    * {
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS";
        box-sizing: border-box;
    }

    :root {
        --white: rgb(255,255,255);
        --0: linear-gradient(45deg, #003407 0%, #010901 50%, #042602 100%);
        --1: #141414;
        --2: #0c0c0c;
        --3: #000000;
        --4: #1eff00;
        /* --0: linear-gradient(45deg, #0a000f 0%, #2e033c 100%);
        --1: #0d0d13;
        --2: #171717;
        --3: #000000;
        --4: #9d00ff; */
        /* --black: rgb(0,0,0); */        

        /* --shadow:  0px 5px 10px 0px rgba(0, 0, 0, 0.3); */
        --background: #2C3639;
    }

    .root {
        height: 100vh;
        width: 100%;
    }

    body {
        height: 100vh;
        width: 100%;
    }
`;

export default GlobalStyle;
