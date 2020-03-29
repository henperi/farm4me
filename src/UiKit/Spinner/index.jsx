import React from 'react';
import PropsTypes from 'prop-types';
import './Spinner.scss';
import styled from 'styled-components';

const StyledSpinner = styled.span.attrs(() => ({}))`
  position: relative;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  display: flex;
  margin: 0 5px;

  &::before {
    position: absolute;
    border: solid ${(props) => props.size / 10}px #eee;
    border-bottom-color: #747be5;
    border-radius: 50%;
    content: '';
    height: inherit;
    width: inherit;
    animation: 1.35s linear infinite spinner;
    will-change: animation;
  }
`;


export const Spinner = (props) => {
  const { center, text, ...rest } = props;
  return (
    <div
      className={center ? 'col col__mainAxis--center col__crossAxis--center' : ''}
      style={{ height: center ? '100%' : 'none' }}
    >
      <StyledSpinner {...rest} />
      {text && <span>{text}</span>}
    </div>
  );
};

Spinner.propTypes = {
  center: PropsTypes.bool,
  text: PropsTypes.string,
  size: PropsTypes.number,
};

Spinner.defaultProps = {
  center: false,
  text: '',
  size: 20,
};
