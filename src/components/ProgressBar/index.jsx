import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Text } from '../../UiKit/Text';
import { SizedBox } from '../../UiKit/SizedBox';

const StyledProgressBar = styled.div`
  background-color: #fff;
  width: 100%;
  height: 8px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;

  &::after {
    position: absolute;
    content: '';
    background-color: #a9aff0;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${(props) => props.percent};
    border-radius: 12px;
  }

  ${(props) => props.darker
    && css`
      background-color: #bec4d2;

      &::after {
        background-color: #747be5;
      }
    `}
`;

/**
 * AppProgressBar
 * @param {any} props
 * @returns {JSX.Element} AppProgressBar
 */
export function AppProgressBar(props) {
  const { percent } = props;
  return (
    <Fragment>
      <Text className="row row__mainAxis--end" color="white">
        {percent}
      </Text>
      <SizedBox height={2.5} />
      <StyledProgressBar {...props} />
    </Fragment>
  );
}

AppProgressBar.propTypes = {
  percent: PropTypes.string,
  darker: PropTypes.bool,
};

AppProgressBar.defaultProps = {
  percent: '0',
  darker: false,
};
