import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from '../../UiKit/Button';
import { useGlobalStore } from '../../store';
import { setNetworkError } from '../../store/modules/init/actions';
import { Text } from '../../UiKit/Text';
import { ScreenSizes } from '../../UiKit/uiHelper/screenSizes';

// ScreenSizes

export const StyledNetworkError = styled.div.attrs(() => ({}))`
  min-width: 80%;
  height: fit-content;
  border-radius: 15px;
  padding: 10px 5%;
  background-color: #FF5353;
  margin-top: 20px;
  position: relative;

  @media screen and (max-width: ${ScreenSizes.sm}) {
    min-width: unset;
    max-width: unset;
    right: unset;
  }

  .close {
    position: absolute;
    top: -20px;
    right: 2%;
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
    <div className="row row__mainAxis--end">
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

    </div>
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
