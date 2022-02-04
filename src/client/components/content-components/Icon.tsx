import React from "react";
import styled from "styled-components";
import { Styles, Interfaces } from "../../../site-config";
import { Defaults } from "../../../site-config/styles";
import { SVG } from "../../assets";

const iconSizes = {
  verySmall: "10px",
  small: "20px",
  normal: "30px",
  large: "40px",
  veryLarge: "50px",
};

const I = styled.i<Interfaces.Icon>`
  font-size: ${(props) =>
    props.size ? iconSizes[props.size] : iconSizes.normal};
  color: ${(props) =>
    props.color ? Styles.Colors[props.color] : Styles.Colors.background};
  ${(props) => Defaults.Spacing({ props })}
`;

const Svg = styled.div<any>`
  text-align: center;
  margin: 0;
  & > svg {
    fill: ${(props) => Styles.Colors[props.color] || Styles.Colors.primary};
    width: ${(props) => iconSizes[props.size] || iconSizes.normal};
    transition: all 300ms ease-in-out;
    ${(props) => Defaults.Spacing({ props })}
  }
`;

const Icon: React.FC<Interfaces.Icon> = (props) => {
  return props.type === "svg" ? (
    <Svg {...props}>{React.createElement("svg", SVG[props.name])}</Svg>
  ) : (
    <I {...props} className={`${props.provider || "material-icons"}`}>
      {props.name}
    </I>
  );
};

export default Icon;
