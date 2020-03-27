import React, { Fragment } from 'react';
import styled from 'styled-components';
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
      <Text className="row row__mainAxis--end" color="white">{percent}</Text>
      <SizedBox height={2.5} />
      <StyledProgressBar {...props} />
    </Fragment>
  );
}

AppProgressBar.propTypes = {
  percent: PropTypes.string,
};

AppProgressBar.defaultProps = {
  percent: '0',
};
