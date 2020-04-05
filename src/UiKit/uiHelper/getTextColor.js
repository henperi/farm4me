
// const getTextColor = (color) => {
//   if (Object.keys(TextColors).includes(color)) {
//     return TextColors[color];
//   }

//   if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
//     return color;
//   }

//   return TextColors.default;
// };

import { css } from 'styled-components';

export const textColors = {
  primary: css`
    color: #747be5;
  `,
  default: css`
    color: #757994;
  `,
  white: css`
    color: #fff;
  `,
  accent: css`
    color: #dfdefa;
  `,
  grey: css`
    color: #f6f9fd;
  `,
  lightGrey: css`
    color: #ebf0fe;
  `,
  error: css`
    color: #ff3e3e;
  `,
  pink: css`
    color: #e14eca;
  `,
  success: css`
    color: #19d888;
  `,
};

export const getTextColor = (props) => {
  const { color } = props;

  if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
    return color;
  }

  if (Object.keys(textColors).includes(color)) {
    return textColors[color];
  }

  return textColors.default;
};
