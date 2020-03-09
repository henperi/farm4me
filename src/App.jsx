import React from 'react';
import { Routes } from './routes';

import './styles/reset.scss';
import './styles/responsive.scss';
import './styles/typography.scss';

/**
 * The App Component
 *
 * @returns {JSX.Element} Jsx Element
 */
function App() {
  return (
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  );
}

export default App;
