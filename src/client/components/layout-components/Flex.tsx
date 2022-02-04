import React, { useRef } from "react";
import styled from "styled-components";

import { Interfaces, Styles, Types } from "../../../site-config";
import { getFlexAlignment } from "../../util/functions";

interface Props {
  column?: boolean;
  background?: Types.Colors;
  noWrap?: boolean;
  yAlign?: string;
  xAlign?: string;
  alignment?: Array<string>;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  className?: string;
  maxWidth?: string;
  id?: string;
  style?: any;
}

const Vessel = styled.div<Props>`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  flex-wrap: ${(props) => (props.noWrap ? "nowrap" : "wrap")};
  background: ${(props) =>
    props.background
      ? Styles.Colors[props.background]
      : Styles.Colors.transparent};
  ${(props) => Styles.Defaults.Spacing({ props })}
  ${(props) => Styles.Defaults.Dimensions({ props })}
  ${(props) => props.alignment?.map((str) => str)}
`;

const Flex: React.FC<Props> = (props) => {
  const sectionRef = useRef(null);

  const alignment = getFlexAlignment({
    column: props.column,
    yAlign: props.yAlign,
    xAlign: props.xAlign,
  });
  return <Vessel ref={sectionRef} {...props} alignment={alignment}></Vessel>;
};

export default Flex;
