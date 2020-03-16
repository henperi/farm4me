import React, { useEffect } from 'react';
import { Routes } from './routes';

import { rootReducer, initialState } from './store/modules';

import { dispatchHelper } from './helpers/dispatchHelper';
import { initialiseStore } from './store/modules/init/actions';
import { Provider } from './store';

import './styles/reset.scss';
import './styles/responsive.scss';
import './styles/typography.scss';
import { Spinner } from './UiKit/Spinner';

/**
 * The App Component
 *
 * @returns {JSX.Element} Jsx Element
 */
function App() {
  const [state, dispatchBase] = React.useReducer(rootReducer, initialState);
  const dispatch = React.useCallback(dispatchHelper(dispatchBase, state), [dispatchBase]);

  useEffect(() => {
    initialiseStore(dispatch);
  }, [dispatch]);

  return (
    <Provider state={state} dispatch={dispatch}>
      <React.StrictMode>
        {state.app.isReady ? <Routes /> : <div className="col"><Spinner center /></div>}
      </React.StrictMode>
    </Provider>
  );
}

export default App;
