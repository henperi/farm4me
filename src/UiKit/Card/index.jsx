import styled, { css } from 'styled-components';
import { BgColors } from '../theme';
import { ScreenSizes } from '../uiHelper/screenSizes';

export const Card = styled.div.attrs(() => ({}))`
  padding: 30px 35px;
  min-height: 50px;
  height: fit-content;
  border-radius: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: ${BgColors.grey};

  @media screen and (max-width: ${ScreenSizes.sm}) {
    padding: 30px 15px;
  }

  ${(props) => props.elevated
    && css`
      box-shadow: 0px 10px 50px 1px rgba(49, 56, 78, 0.08);
    `}
`;

Card.defaultProps = {};
