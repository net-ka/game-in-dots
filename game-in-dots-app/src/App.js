import React, { Fragment } from 'react';
import './styles/reset.scss';
import './App.scss';

import Header from './components/header/header';
// import Game from './pages/main';
import Home from './pages/home';

function App() {
  return (
    <Fragment>
      <Header />
      <Home />
    </Fragment>
  );
}

export default App;
