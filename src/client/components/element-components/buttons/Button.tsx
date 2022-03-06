import React from "react";
import styled from "styled-components";
import { Styles, Interfaces, Types } from "../../../../site-config";
import { Typography } from "../../typography-components";

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  background?: Types.Colors;
  color?: Types.Colors;
  onClick: any;
  margin?: string;
  padding?: string;
  disabled?: boolean;
  variant?: Types.TypographyVariant;
  style?: React.CSSProperties;
}

const Element = styled.button<ButtonProps>`
  display: inline-flex;
  flex-direction: column;
  width: max-content;

  cursor: pointer;
  background: ${(props) =>
    props.background
      ? Styles.Colors[props.background]
      : Styles.Colors.background};

  border-radius: 3px;
  outline: none;

  border: none;
  z-index: 10;

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
  }
  ${(props) => Styles.Defaults.Spacing({ props })}
  padding: 1em 2em;
`;

const Button: React.FC<ButtonProps> = (props) => {
  const { onClick } = props;

  return (
    <Element {...props} onClick={onClick} style={props.style}>
  <Typography {...props} margin="0" padding="0" >
        {props.children}
      </Typography>
    </Element>
  );
};
export default Button;
