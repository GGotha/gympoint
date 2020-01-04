import React from 'react';
import { useSelector } from 'react-redux';
import createRouter from './routes';

function App() {
  const signed = useSelector(state => state.Reducers.signed);
  // const signed = false;

  const Routes = createRouter(signed);

  return <Routes />;
}

export default App;
