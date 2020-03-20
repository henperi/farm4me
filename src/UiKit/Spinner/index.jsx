import React from 'react';
import PropsTypes from 'prop-types';
import './Spinner.scss';

export const Spinner = ({ center, text }) => (
  <span
    className={center ? 'row row__mainAxis--center row__crossAxis--center' : ''}
    style={{ height: center ? 'inherit' : 'none' }}
  >
    <span className="spinner" />
    <span>{text}</span>
  </span>
);

Spinner.propTypes = {
  center: PropsTypes.bool,
  text: PropsTypes.string,
};

Spinner.defaultProps = {
  center: false,
  text: '',
};
