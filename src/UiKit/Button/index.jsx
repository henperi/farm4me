import styled, { css } from 'styled-components';

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

const getBgColor = (props) => {
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
  };

  if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
    return color;
  }

  if (Object.keys(bgColors).includes(color)) {
    return bgColors[color];
  }

  return bgColors.primary;
};

export const Button = styled.button.attrs((props) => ({
  type: getButtonType(props),
}))`
  outline: none;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bolder;
  padding: 10px 28px;
  font-family: 'Open Sans', sans-serif;

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

Button.defaultProps = {
  fullWidth: false,
};
