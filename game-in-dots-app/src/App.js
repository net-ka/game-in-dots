import React, { Fragment } from 'react';
import './styles/reset.scss';
import './App.scss';

import Header from './components/header/header';
import Game from './pages/main';

function App() {
  return (
    <Fragment>
      <Header />
      <Game />
    </Fragment>
  );
}

export default App;
