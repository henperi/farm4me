import styled, { css } from 'styled-components';
import { ScreenSizes } from '../uiHelper/screenSizes';

const getHeight = (props) => {
  const { height } = props;

  if (typeof height === 'number') {
    return `${height}px`;
  }

  return 'fit-content';
};

const getWidth = (props) => {
  const { width } = props;

  if (typeof width === 'number') {
    return `${width}px`;
  }

  if (width && width.substring(width.length - 1) === '%') {
    return width;
  }

  return 'fit-content';
};

const mediaQueryWidth = (props, size) => {
  const { smWidth } = props;

  if (size === 'sm') {
    return css`
      @media screen and (max-width: ${ScreenSizes.sm}) {
        width: ${getWidth({ width: smWidth })};
      }
    `;
  }
};

export const SizedBox = styled.div.attrs(() => ({}))`
  height: ${(props) => getHeight(props)};
  width: ${(props) => getWidth(props)};
  ${(props) => mediaQueryWidth(props, 'sm')};
`;
