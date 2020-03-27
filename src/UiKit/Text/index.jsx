import styled, { css } from 'styled-components';
import React from 'react';

const TextColors = {
  default: '#757994',
  primary: '#747be5',
  accent: '#2655ee',
  secondary: '',
  white: '#fff',
};

const getTextType = (props) => {
  const { type } = props;

  if (type === 'h1') {
    return css`
      font-size: 24px;
    `;
  }
  if (type === 'subtitle') {
    return css`
      font-weight: lighter;
    `;
  }

  return css`
    font-size: 16px;
  `;
};

const getTextAlignment = (props) => {
  const { alignment } = props;

  switch (alignment) {
    case 'center':
      return css`
        text-align: center;
      `;

    case 'end':
      return css`
        text-align: end;
      `;

    default:
      return css`
        text-align: left;
      `;
  }
};

const getFontWeight = (props) => {
  const { weight } = props;

  switch (weight) {
    case 'bold':
      return css`
        font-weight: bolder;
      `;

    default:
      return css`
        font-weight: lighter;
      `;
  }
};

const getTextColor = (color) => {
  if (Object.keys(TextColors).includes(color)) {
    return TextColors[color];
  }

  if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
    return color;
  }

  return TextColors.default;
};

const getTextSize = (props) => {
  const { size } = props;

  if (typeof size === 'number') {
    return css`
      font-size: ${size}px;
      line-height: ${size * (size < 13 ? 1 : 1.35)}px;
    `;
  }

  return css`
    font-size: 16px;
  `;
};

const StyledText = styled.span.attrs(() => ({}))`
  color: ${(props) => getTextColor(props.color)};
  font-weight: lighter;
  font-family: 'Open Sans', sans-serif;
  ${(props) => getTextType(props)}
  ${(props) => getTextAlignment(props)}
  ${(props) => getFontWeight(props)}
  ${(props) => getTextSize(props)};
`;


export const Text = (props) => (
  <StyledText {...props} />
);
