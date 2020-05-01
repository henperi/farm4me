import React from 'react';
import styled, { css } from 'styled-components';

import PropsType from 'prop-types';

import { TextColor } from '../theme';
import { Text } from '../Text';

export const Input = styled.input.attrs((props) => ({
  type: props.type,
}))`
  outline: none;
  color: ${TextColor.default};
  border: unset;
  background-color: transparent;
  font-size: 16px;
  flex: 3;
  margin: auto 2%;
  width: 100%;
  max-height: 50px;
  min-height: 50px;
`;

Input.defaultProps = {};

const TextFieldContainer = styled.div`
  margin: 15px 0;
`;

export const StyledTextField = styled.div.attrs((props) => ({
  className: props.className,
}))`
  background-color: ${(props) => props.color};
  border-radius: 12px;

  ${(props) => props.color
    && css`
      background-color: ${props.color};
    `};

  ${(props) => props.hasError
    && css`
      border: 2px solid #ff3e3ea6;
      /* box-shadow: inset 1px 1px 0px #ff3e3ea6; */
    `};

  .icon {
    background-color: rgba(135, 108, 245, 0.178);
    border-radius: 12px;
    padding: 15px 20px;
    max-height: 50px;
    min-height: 50px;

    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const TextField = (props) => {
  const {
    leftIcon, rightIcon, color, error, errorColor, ...inputProps
  } = props;

  return (
    <TextFieldContainer>
      <StyledTextField color={color} hasError={!!error} className="row row__mainAxis--spaceBetween">
        {leftIcon && <div className="icon">{leftIcon}</div>}
        <Input {...inputProps} />

        {rightIcon && <div className="icon">{rightIcon}</div>}
      </StyledTextField>
      {error && (
        <Text color={errorColor} size={12}>
          {error}
        </Text>
      )}
    </TextFieldContainer>
  );
};

TextField.propTypes = {
  as: PropsType.string,
  className: PropsType.string,
  type: PropsType.string,
  placeholder: PropsType.string,
  leftIcon: PropsType.string,
  rightIcon: PropsType.string,
  color: PropsType.string,
  accept: PropsType.string,
  value: PropsType.oneOfType([PropsType.string, PropsType.number]),
  required: PropsType.bool,
  onChange: PropsType.func,
  rows: PropsType.number,
  min: PropsType.oneOfType([PropsType.string, PropsType.number]),
  disabled: PropsType.bool,
  error: PropsType.string,
  name: PropsType.string,
  errorColor: PropsType.string,
};

TextField.defaultProps = {
  className: 'textField--container',
  type: 'text',
  placeholder: '',
  leftIcon: '',
  rightIcon: '',
  color: '#fff',
  accept: null,
  required: false,
  onChange: () => null,
  min: '',
  rows: 5,
  as: null,
  value: undefined,
  disabled: false,
  error: '',
  name: '',
  errorColor: 'error',
};
