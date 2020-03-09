import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledScrollable = styled.div.attrs((props) => ({
  ...props.styledProps,
}))`
  display: flex;
  scroll-snap-type: x mandatory;
  scroll-padding: 50px;
  background-color: #e8e8e838;

  ${(props) => props.styledProps.direction === 'vertical'
    && css`
      overflow-y: auto;
      flex-flow: column nowrap;
      height: 100%;
    `}

    ${(props) => props.styledProps.direction === 'horizontal'
      && css`
        overflow-y: auto;
        flex-flow: row nowrap;
        width: 100%;
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
};

Scrollable.defaultProps = {
  direction: 'horizontal',
  hideScrollBar: false,
  children: <Fragment />,
};
