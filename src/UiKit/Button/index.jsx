import styled, { css } from 'styled-components';

import React, { Fragment } from 'react';
import PropsType from 'prop-types';
import { getBgColor } from '../uiHelper/getBgColor';

const getButtonType = (props) => {
  const { type } = props;

  if (type === 'submit') {
    return 'submit';
  }
  if (type === 'reset') {
    return 'reset';
  }
  return 'button';
};

const getRadius = (props) => {
  const { radius } = props;
  if (typeof radius === 'number') {
    return `${radius}px`;
  }
  return '8px';
};

const fullWidth = css`
  width: 100%;
`;

export const StyledButton = styled.button.attrs((props) => ({
  type: getButtonType(props),
  ...props,
}))`
  outline: none;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bolder;
  padding: 10px 28px;
  font-family: 'Open Sans', sans-serif;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  transition: all 300ms ease-in-out;
  margin-right: 5px;
  width: fit-content;
  cursor: pointer;
  border-radius: ${(props) => getRadius(props)};
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.13);

  ${(props) => props.size === 'sm'
    && css`
      padding: 12px 22px;
      font-size: 14px;
    `}

  ${(props) => props.size === 'xs'
    && css`
      padding: 8px 16px;
      font-size: 10px;
    `}

  &:hover {
    box-shadow: 0px 8px 26px rgba(0, 0, 0, 0.23);
  }

  ${(props) => getBgColor(props)}

  ${(props) => props.fullWidth && fullWidth}
`;


export const Button = (props) => <StyledButton {...props} />;

Button.propTypes = {
  className: PropsType.string,
  type: PropsType.string,
  color: PropsType.string,
  size: PropsType.string,
  fullWidth: PropsType.bool,
  children: PropsType.node,
  onClick: PropsType.func,
  disabled: PropsType.bool,
};

Button.defaultProps = {
  fullWidth: false,
  className: 'textField--container',
  type: 'text',
  color: 'primary',
  size: 'md',
  children: <Fragment />,
  onClick: () => null,
  disabled: false,
};
