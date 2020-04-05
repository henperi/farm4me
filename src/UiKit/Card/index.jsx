import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';

import PropTypes from 'prop-types';
// import { BgColors } from '../theme';
import { ScreenSizes } from '../uiHelper/screenSizes';
import { getBgColor } from '../uiHelper/getBgColor';

export const StyledCard = styled.div.attrs(() => ({}))`
  padding: 30px 35px;
  min-height: 10px;
  height: fit-content;
  border-radius: 20px;
  margin-bottom: 10px;
  
  @media screen and (max-width: ${ScreenSizes.sm}) {
    padding: 30px 15px;
  }

  ${(props) => getBgColor(props)}

  ${(props) => props.elevated
    && css`
      box-shadow: 0px 4px 4px rgba(214.62499290704727, 214.62499290704727, 214.62499290704727, 0.25);
    `}
  ${(props) => props.padding
    && css`
      padding: ${props.padding};
    `}
`;

export const Card = (props) => <StyledCard {...props} />;

Card.propTypes = {
  color: PropTypes.string,
  elevated: PropTypes.bool,
  children: PropTypes.node,
  padding: PropTypes.string,
  className: PropTypes.string,
};

Card.defaultProps = {
  color: 'grey',
  padding: '30px 35px',
  elevated: false,
  children: <Fragment />,
  className: '',
};
