import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from '../../UiKit/Button';
import { Text } from '../../UiKit/Text';
import { ScreenSizes } from '../../UiKit/uiHelper/screenSizes';
import { BgColors } from '../../UiKit/theme';
import { NetworkError } from '../NetworkError';
import { useGlobalStore } from '../../store';
import { removeToaster } from '../../store/modules/toaster/actions';


export const StyledToastContainer = styled.div.attrs(() => ({}))`
  min-width: 40%;
  max-width: 40%;
  max-height: 100vh;
  overflow: scroll;
  top: 0;
  right: 0;
  position: fixed;
  z-index: 102;
  display: flex;
  flex-direction: column;
  border-radius: none;
  padding: 5px 1%;
  background-color: transparent;
  background: none;

  @media screen and (max-width: ${ScreenSizes.sm}) {
    min-width: 80%;
    max-width: unset;
  }
`;

export const StyledToaster = styled.div.attrs(() => ({}))`
  min-width: 80%;
  height: fit-content;
  border-radius: 15px;
  padding: 25px 5%;
  background-color: ${BgColors.primary};
  margin-top: 20px;
  position: relative;
  transition: 4s ease-in-out all;

  @media screen and (max-width: ${ScreenSizes.sm}) {
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
export function Toaster(props) {
  const { className } = props;
  const { state, dispatch } = useGlobalStore();

  return (
    <StyledToastContainer>
      <NetworkError />
      {
        state.toaster.map((toast) => {
          setTimeout(() => dispatch(removeToaster(toast.id)), toast.timeOut);

          return (
            <StyledToaster
              className={`row__mainAxis--spaceBetween row__crossAxis--center ${className}`}
              key={toast.id}
            >
              <Text color="#ffffff" size={18}>{toast.message}</Text>
              <Button
                type="button"
                color="grey"
                className="close"
                onClick={() => dispatch(removeToaster(toast.id))}
              >
                x
              </Button>
            </StyledToaster>
          );
        })
      }
    </StyledToastContainer>
  );
}

Toaster.propTypes = {
  className: PropTypes.string,
};

Toaster.defaultProps = {
  className: '',
};
