import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ScreenSizes } from '../uiHelper/screenSizes';

const StyledScrollable = styled.div.attrs((props) => ({
  ...props.styledProps,
}))`
  display: flex;
  scroll-snap-type: x mandatory;
  scroll-padding: 50px;
  // background-color: #e8e8e838;

  ${(props) => props.styledProps.direction === 'vertical'
    && css`
      overflow-y: auto;
      flex-flow: column nowrap;
      height: 100%;
    `}

    ${(props) => props.styledProps.direction === 'horizontal'
      && css`
        overflow-x: auto;
        flex-flow: row nowrap;
        width: 100%;
        width: calc(100% + 7.4%);
        margin-left: -3.7%;

        @media screen and (max-width: ${ScreenSizes.sm}) {
          width: calc(100% + 4%);
          margin-left: -2%;
        }
      `}

    ${(props) => props.styledProps.hideScrollBar
      && css`
        ::-webkit-scrollbar {
          width: 0;
        }
      `}
`;

/**
 * Scrollable
 * @param {any} props
 * @returns {JSX.Element} Scrollable
 */
export function Scrollable(props) {
  const { children, ...rest } = props;

  return <StyledScrollable styledProps={rest}>{children}</StyledScrollable>;
}

Scrollable.propTypes = {
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  hideScrollBar: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

Scrollable.defaultProps = {
  direction: 'horizontal',
  hideScrollBar: false,
  children: <Fragment />,
  className: '',
};
