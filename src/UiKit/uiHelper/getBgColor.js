import { css } from 'styled-components';

export const bgColors = {
  primary: css`
    background-color: #747be5;
    color: #fff;

    span {
      color: #fff;
    }
  `,
  accent: css`
    background-color: #dfdefa;
    color: #747be5;

    span {
      color: #747be5;
    }
  `,
  grey: css`
    background-color: #f6f9fd;
    color: #747be5;
    
    span {
      color: #747be5;
    }
  `,
  lightGrey: css`
    background-color: #ebf0fe;
    color: #747be5;

    span {
      color: #747be5;
    }
  `,
  error: css`
    background-color: #ff3e3ea6;
    color: #fff;

    span {
      color: #fff;
    }
  `,
  pink: css`
    background-color: #e14eca;
    color: #fff;

    span {
      color: #fff;
    }
  `,
  success: css`
    background-color: #19d888;
    color: #fff;
    font-weight: 400;

    span {
      color: #fff;
      font-weight: 400;
    }
  `,
};

export const getBgColor = (props) => {
  const { color } = props;

  if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
    return color;
  }

  if (Object.keys(bgColors).includes(color)) {
    return bgColors[color];
  }

  return bgColors.primary;
};
