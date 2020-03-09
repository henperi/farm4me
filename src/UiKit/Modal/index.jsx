import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ScreenSizes } from '../uiHelper/screenSizes';
import { Button } from '../Button';
import { mediaQueryWidth } from '../uiHelper/widthHelper';


export const StyledModal = styled.div.attrs((props) => ({
  ...props.styledProps,
}))`
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 100;
  display: flex;

  .backdrop {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #747be5;
    z-index: -1;
    opacity: 0.4;
  }

  .child {
    width: ${(props) => (props.width ? props.width : '50%')};
    min-height: 100px;
    max-height: 90vh;
    overflow-y: scroll;
    height: fit-content;
    background-color: #fff;
    padding: ${(props) => (props.noPadding ? '20px 0px' : '20px')};
    position: relative;
    border-radius: 15px;
    transform: translate(0);

    @media screen and (max-width: ${ScreenSizes.sm}) {
      width: 90%;
    }

    ${(props) => mediaQueryWidth(props, 'sm')};

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
  }
`;

/**
 * This is a react modal component
 * @param {any} props
 * @returns {JSX.Element} a modal component
 */
export function Modal(props) {
  const {
    onClose, isVisible, className, children, ...rest
  } = props;

  const [state, setstate] = useState({
    isVisible,
  });

  useEffect(() => {
    setstate({
      isVisible,
    });
  }, [isVisible]);

  const closeModal = () => {
    if (onClose) {
      onClose();

      return setstate({
        ...state,
        isVisible: false,
      });
    }
    return setstate({
      ...state,
      isVisible: false,
    });
  };

  return state.isVisible ? (
    <StyledModal
      styledProps={rest}
      className={`row__mainAxis--center row__crossAxis--center ${className}`}
    >
      <div
        className="backdrop"
        role="menu"
        tabIndex={0}
        onKeyPress={() => closeModal()}
        onClick={() => closeModal()}
      />
      <div className="child">
        {children}
        <Button type="button" color="primary" className="close" onClick={() => closeModal()}>
          x
        </Button>
      </div>
    </StyledModal>
  ) : (
    <Fragment />
  );
}

Modal.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  isVisible: PropTypes.bool,
  children: PropTypes.node,
  width: PropTypes.string,
  noPadding: PropTypes.bool,
  smWidth: PropTypes.string,
};

Modal.defaultProps = {
  className: '',
  width: '50%',
  onClose: () => {},
  isVisible: false,
  children: PropTypes.objectOf,
  noPadding: false,
  smWidth: '50%',
};
