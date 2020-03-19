import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from '../../UiKit/Button';
import { useGlobalStore } from '../../store';
import { setNetworkError } from '../../store/modules/init/actions';
import { Text } from '../../UiKit/Text';

export const StyledNetworkError = styled.div.attrs(() => ({}))`
  height: fit-content;
  top: 20px;
  position: fixed;
  z-index: 101;
  display: flex;
  border-radius: 15px;
  padding: 10px 2%;
  background-color: #FF5353;
  margin: 5px;

  .close {
    position: fixed;
    top: 0;
    right: 0;
    margin: 5px;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: unset;
  }
`;

/**
 * This is a react modal component
 * @param {any} props
 * @returns {JSX.Element} a modal component
 */
export function NetworkError(props) {
  const { className } = props;
  const { state, dispatch } = useGlobalStore();

  return state.app.noNetwork ? (
    <StyledNetworkError
      className={`row__mainAxis--spaceBetween row__crossAxis--center ${className}`}
    >
      <Text color="#ffffff">
        A network error occured, please check to make sure you have network before tring again
      </Text>
      <Button
        type="button"
        color="primary"
        className="close"
        onClick={() => dispatch(setNetworkError(false))}
      >
        x
      </Button>
    </StyledNetworkError>
  ) : (
    <Fragment />
  );
}

NetworkError.propTypes = {
  className: PropTypes.string,
};

NetworkError.defaultProps = {
  className: '',
};
