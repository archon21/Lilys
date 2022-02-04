import React from "react";
import styled from "styled-components";
import { Styles, Interfaces } from "../../../../site-config";
import { Icon } from "../../content-components";
import { Typography } from "../../typography-components";

interface ButtonProps {
  children?: React.ReactNode;
  background?: Interfaces.Colors;
  color?: Interfaces.Colors;
  onClick: any;
  margin?: string;
  padding?: string;
  disabled?: boolean;
  iconConfig: Interfaces.Icon;
  typographyConfig?: Interfaces.Typography.Typography;
}

const Element = styled.button<ButtonProps>`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: max-content;
  font-size: calc(0.7em + 1vw);
  cursor: pointer;
  background: ${(props) =>
    props.background
      ? Styles.Colors[props.background]
      : Styles.Colors.background};
  color: ${(props) =>
    props.color ? Styles.Colors[props.color] : Styles.Colors.background};
  ${(props) => Styles.Defaults.Spacing({ props })}
  border-radius: 999px;
  outline: none;
  border: none;
  padding: 0.1em 0.1em;
  z-index: 10;
  min-width: 1.3em;
  min-height: 1.3em;
  max-width: 1.3em;
  max-height: 1.3em;
  

  &:disabled {
    background: ${Styles.Colors.disabled};
    color: #fff;
    opacity: 0.7;
    cursor: not-allowed;
  }
  &:not([disabled]):hover {
    cursor: pointer;
    box-shadow: var(
      --devsite-button-primary-box-shadow-hover,
      0 1px 2px 0 rgba(60, 64, 67, 0.3),
      0 1px 3px 1px rgba(60, 64, 67, 0.15)
    );
    // &:before {
    //   content: "Yo";
    // }
  }
`;

const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, iconConfig, typographyConfig } = props;

  

  return (
    <Element {...props} onClick={onClick}>
      {Boolean(iconConfig?.name) ? (
        <Icon {...iconConfig}></Icon>
      ) : (
        <Typography color={typographyConfig?.color} textAlign="center" variant="p">
          {typographyConfig?.children}
        </Typography>
      )}
    </Element>
  );
};
export default Button;
