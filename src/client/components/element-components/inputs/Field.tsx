import React from "react";
import styled, { keyframes } from "styled-components";
import NumberFormat from "react-number-format";

import { Styles } from "../../../../site-config";

const morph = keyframes`
   0%{background-position:0 0}
   100%{background-position:100% 0}
  
`;

const WebflowStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  border-radius: 2px;
  padding: 0;
  background: $input-background;
  &:after {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 999;
    height: 2px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    background-position: 0% 0%;
    background: linear-gradient(
      to right,
      ${Styles.Colors.primary},
      ${Styles.Colors.primary},
      ${Styles.Colors.secondary},
      ${Styles.Colors.secondary},
      ${Styles.Colors.primary},
      ${Styles.Colors.primary}
    );
    background-size: 500% auto;
    animation: ${morph} 5s linear infinite;
  }
`;

// $input-background: rgba(57, 63, 84, 0.8);
// $input-text-inactive: #7881A1;
// $input-text-active: #BFD2FF;

// // gradient animation

const FieldWrapper = styled.div`
  width: 100%;
  input,
  select {
    flex-grow: 1;
    color: $input-text-active;
    font-size: ${Styles.FontSizes.p};
    font-family: ${Styles.FontFamily.primary};
    line-height: 1em;
    padding: 0.6em 0.3em;
    vertical-align: middle;
    border-style: none;
    background: transparent;
    outline: none;
    width: 100%;
    &::-webkit-input-placeholder {
      color: $input-text-inactive;
    }
  }
`;

const TextField = styled.input``;

const SelectField = styled.select``;

const NumberField = (props) => (
  <NumberFormat
    {...props}
    onValueChange={(e) => props.onChange(e)}></NumberFormat>
);

const Button = styled.button`
  color: $input-text-inactive;
  font-size: 2.4em;
  line-height: 2.4em;
  vertical-align: middle;
  transition: color 0.25s;
  &:hover {
    color: $input-text-active;
  }

  padding: 0;
  background: none;
  border: none;
  outline: none;
`;

const Icon = styled.i``;



const FieldRoot = (props) => {
  const propsToSpread = {...props};
  const { fieldType } = props;
  if (fieldType === "select") {
    propsToSpread.options = props.options;

    return <SelectField {...propsToSpread}></SelectField>;
  } else if (fieldType === "number") {
    propsToSpread.allowNegative = false;
    propsToSpread.allowLeadingZeros = false;
    propsToSpread.prefix = "$";
    propsToSpread.thousandSeparator = true;
    propsToSpread.decimalScale = 2;
    propsToSpread.fixedDecimalScale = true;
    propsToSpread.onChange = null;
    propsToSpread.onValueChange = (values) =>
      props.onChange({ target: { value: values.floatValue * 100 } });
    propsToSpread.value =
      typeof props.value === "number"
        ? Math.round(props.value / 100)
        : props.value;
    return (
      <NumberField
        {...propsToSpread}
        onChange={(e) => {
          if (typeof e?.floatValue === "number") {
            props.onChange({ target: { value: e.floatValue * 100 } });
          }
        }}></NumberField>
    );
  } else return <TextField {...propsToSpread}></TextField>;
};

interface FieldProps {
  name: string;
  placeholder: string;
  onChange: any;
  fieldType: "text" | "number" | "select";
  value?: string | number;
  defaultValue?: string | number;
  type?: string;
  onBlur?: any;
  options?: string[];
}

const Field: React.FC<FieldProps> = (props) => {
  const {
    type,
    placeholder,
    value,
    defaultValue,
    options,
    fieldType,
    onChange,
    onBlur,
    name,
  } = props;

  const propsToSpread: any = {
    type,
    placeholder,
    value,
    onChange,
    onBlur,
    defaultValue,
    name,
  };

  return (
    <WebflowStyle>
      <FieldWrapper>
        <FieldRoot {...propsToSpread} fieldType={fieldType}></FieldRoot>
      </FieldWrapper>
      {/* <Button type="submit"><Icon ></Icon></Button> */}
    </WebflowStyle>
  );
};

export default Field;
