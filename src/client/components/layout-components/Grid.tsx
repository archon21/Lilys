import React from "react";

import styled from "styled-components";
import { siteConfig, Styles } from "../../../site-config";

interface Props {
  layout: Array<number>;
  gridGap?: string;
  centerMobile?: boolean;
  children: React.ReactNode;
  formattedLayout?: string;
  width?: string;
  margin?: string;
  padding?: string;
  maxWidth?: string;
}

const Vessel = styled.div<Props>`
  display: grid;
  grid-template-columns: ${(props) => props.formattedLayout};
  width: ${(props) => props.width || "100%"};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};
  grid-gap: ${(props) => props.gridGap || "0"};

  ${(props) => Styles.Defaults.Dimensions({ props })}

  @media screen and (max-width: ${siteConfig.client.required.layouts
    .tablet}px) {
    ${(props) =>
      props.centerMobile && "grid-template-columns: repeat(auto-fill, 100%);"}
  }
`;

const Grid: React.FC<Props> = (props) => {
  const formattedLayout: string = props.layout.reduce(
    (acc, curr) => (acc += ` ${curr}%`),
    ""
  );
  return (
    <Vessel {...props} formattedLayout={formattedLayout}>
      {props.children}
    </Vessel>
  );
};

export default Grid;
