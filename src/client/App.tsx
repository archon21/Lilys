import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";

import { Nav, Footer } from "./components";

import { WindoW } from "./components/layout-components";
import Routes from "./Routes";
import { BrowserContext } from "./context";
import { siteConfig, Styles } from "../site-config";
import store from "./store";

const GlobalStyle = createGlobalStyle`
html {
  font-size: calc(1em + 1vw);
}

li, ul {
  margin-block-end: 0;
  margin-block-start: 0;
  padding-left: 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-inline-start: 0;
  background-origin: none;
}

h1{
  font-size: 3em;
  color: #333;
  font-family: ${Styles.FontFamily.primary};
}
h2{
  font-size: 2.5em;
  color: #333;
  font-family: ${Styles.FontFamily.primary};
}
h3{
  font-size: 2em;
  color: #333;
  font-family: ${Styles.FontFamily.primary};
}
h4{
  font-size: 1.5em;
  color: #333;
  font-family: ${Styles.FontFamily.primary};
}
h5{
  font-size: 1.25em;
  color: #333;
  font-family: ${Styles.FontFamily.primary};
}
h6{
  font-size: 1em;
  color: #333;
  font-family: ${Styles.FontFamily.primary};
}
p{
  font-size: 0.75em;
  color: #333;
  font-family: ${Styles.FontFamily.primary};
}
span{
 
  font-family: ${Styles.FontFamily.primary};
}

nav {
  transition: all 300ms;
}
 
`;

interface Props {
  defaultState: any;
}

const App: React.FC<Props> = ({ defaultState }) => {
  const [providersValues, setProviderValues] = useState({
    browser: { browserWidth: 0 },
  });
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false)

  global?.window?.addEventListener("scroll", () =>
    setScrollY(Number(global?.window?.scrollY))
  );

  useEffect(() => {

    store.defaultStateHandler({defaultState })
    setMounted(true)
  }, [])

  useEffect(() => {
    store.defaultScrollHandler({ scrollY, lastScrollY: store.window.scrollY });
    
  }, [scrollY]);

  return (
    <ThemeProvider theme={{ mode: "light" }}>
      <GlobalStyle />
      <BrowserContext.Provider value={providersValues?.browser}>
        <Nav></Nav>

        <WindoW
          id="routes-wrapper"
          fullWidth
          init
          column
          // padding={
          //   siteConfig.client.nav.style.position === "fixed"
          //     ? siteConfig.client.nav.style.navHeight + " 0 0 0"
          //     : "0"
          // }
        >
          {mounted &&  <Routes defaultState={defaultState}></Routes>}
         
        </WindoW>
        <Footer></Footer>
      </BrowserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
