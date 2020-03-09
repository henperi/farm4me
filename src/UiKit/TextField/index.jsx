/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled, { css } from 'styled-components';

import PropsType from 'prop-types';

import { TextColor } from '../theme';

export const Input = styled.input.attrs((props) => ({
  type: props.type,
}))`
  outline: none;
  color: ${TextColor.default};
  border: unset;
  background-color: unset;
  font-size: 16px;
  flex: 3;
  margin: auto 2%;
`;

Input.defaultProps = {};

export const StyledTextField = styled.div.attrs((props) => ({
  className: props.className,
}))`
  background-color: ${(props) => (props.color)};
  border-radius: 12px;
  margin: 10px 0;

  ${(props) => props.color
    && css`
      background-color: ${props.color};
    `};

  .icon {
    background-color: rgba(135, 108, 245, 0.178);
    border-radius: 12px;
    padding: 15px 20px;
    max-height: 50px;

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
    leftIcon, rightIcon, color, ...inputProps
  } = props;

  return (
    <StyledTextField color={color} className="row row__mainAxis--spaceBetween">
      {leftIcon && <div className="icon">{leftIcon}</div>}
      <Input {...inputProps} />

      {rightIcon && <div className="icon">{rightIcon}</div>}
    </StyledTextField>
  );
};

TextField.propTypes = {
  className: PropsType.string,
  type: PropsType.string,
  placeholder: PropsType.string,
  leftIcon: PropsType.string,
  rightIcon: PropsType.string,
  color: PropsType.string,
};

TextField.defaultProps = {
  className: 'textField--container',
  type: 'text',
  placeholder: '',
  leftIcon: '',
  rightIcon: '',
  color: '#fff',
};
