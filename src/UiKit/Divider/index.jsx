import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import { getBgColor } from '../uiHelper/getBgColor';

export const StyledDivider = styled.div.attrs(() => ({}))`
  min-height: 1px;
  border-radius: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
  background-color: #A3A3A3;

  ${(props) => getBgColor(props)}
`;

export const Divider = (props) => <StyledDivider {...props} />;

Divider.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

Divider.defaultProps = {
  color: 'accent',
  className: '',
};
