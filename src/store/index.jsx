import React from 'react';
import PropTypes from 'prop-types';

import { initialState } from './modules';
import { dispatchHelper } from '../helpers/dispatchHelper';

export const GlobalStore = React.createContext({ state: initialState, dispatch: dispatchHelper });

export const Provider = ({ children, state, dispatch }) => (
  <GlobalStore.Provider value={{ state, dispatch }}>{children}</GlobalStore.Provider>
);

Provider.propTypes = {
  children: PropTypes.element.isRequired,
  state: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};


export const useGlobalStore = () => React.useContext(GlobalStore);
