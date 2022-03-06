import React from "react";
import styled from "styled-components";
import { Interfaces, Styles } from "../../../site-config";

interface Props {
  src: string;
  width: string;
  boxShadow: boolean;
  objectFit?: "cover" | "contain";
  maxWidth?: string;
  height?: string;
  minWidth: string;
  margin?: string;
  padding?: string;
  displayAlign?: Interfaces.DisplayAlign;
}

const Img = styled.img<Props>`
  max-width: ${(props) => props.maxWidth || "100%"};
  width: ${(props) => props.width};
  height: ${(props) => props.height || "auto"};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};
  object-fit: ${(props) => props.objectFit || "contain"};
  min-width:  ${(props) => props.minWidth || '1em'};
  box-shadow: ${(props) =>
    props.boxShadow ? Styles.Colors.boxShadow : "none"};
  ${(props) => Styles.Defaults.DisplayAlign({ props })}
`;

const Image: React.FC<Props> = (props) => {
  const handleChangeImage = () => {};

  return <Img {...props}></Img>;
};

export default Image;
