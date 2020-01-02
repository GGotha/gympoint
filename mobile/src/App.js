import React from 'react';
import { useSelector } from 'react-redux';
import createRouter from './routes';

function App() {
  const signed = true;

  const Routes = createRouter(signed);

  return <Routes />;
}

export default App;
