import { css } from 'styled-components';
import { ScreenSizes } from './screenSizes';

export const getWidth = (props) => {
  const { width } = props;

  if (typeof width === 'number') {
    return `${width}px`;
  }

  if (width && width.substring(width.length - 1) === '%') {
    return width;
  }

  return 'fit-content';
};

export const mediaQueryWidth = (props, size) => {
  const { smWidth } = props;

  if (size === 'sm') {
    return css`
      @media screen and (max-width: ${ScreenSizes.sm}) {
        width: ${getWidth({ width: smWidth })};
      }
    `;
  }

  return css`
  `;
};
