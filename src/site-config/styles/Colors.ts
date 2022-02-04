import theme from "styled-theming";

const DARK = "#5E8F72";
const LIGHT = "goldenrod";
const WHITE = "#E1D9D1";
const QUATERNARY = "##F0BF59";

const Colors = {
  primary: DARK,
  secondary: LIGHT,
  tertiary: "#9C1B31",
  textPrimary: LIGHT,
  textSecondary: DARK,
  textTertiary: '#333',
  textQuaternary: "#F0BF59",
  textQuinary: WHITE,

  quaternary: "yellow",
  danger: "red",
  safe: "forestgreen",
  backgroundPrimary: DARK,
  backgroundSecondary: '#fff',
  navBackground: DARK,
  navMobileBackground: "rgba(94, 143, 114, .9)",
  footerBackground: DARK,
  disabled: "#eee",
  boxShadow:
    "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
  buttonPrimary: DARK,
  buttonSecondary: LIGHT,
  transparent: "transparent",

  lightGray: '#999',
  black: "#333",
  white: "#fff"
};


Object.entries(Colors).forEach(([colorKey, colorTone]) => {
  Colors[colorKey] = theme("mode", { light: colorTone });
});

export default Colors;
