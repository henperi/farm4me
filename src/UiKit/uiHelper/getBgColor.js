import { css } from 'styled-components';

export const getBgColor = (props) => {
  const { color } = props;

  const bgColors = {
    primary: css`
      background-color: #747be5;
      color: #fff;
    `,
    accent: css`
      background-color: #dfdefa;
      color: #747be5;
    `,
    grey: css`
      background-color: #f6f9fd;
      color: #747be5;
    `,
    lightGrey: css`
      background-color: #EBF0FE;
      color: #747be5;
    `,
  };

  if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
    return color;
  }

  if (Object.keys(bgColors).includes(color)) {
    return bgColors[color];
  }

  return bgColors.primary;
};
