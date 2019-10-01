import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Main } from '@aragon/ui';

import './App.css';
import actions from './redux/actions';
import Header from './components/Header';
import Charts from './components/Charts';


const App = ({ getBlocks }) => {
  const [nBlocks, setNBlocks] = useState(10);

  useEffect(() => {
    getBlocks(10) /* NOTE: hardcoded until implementing throtle to setNBlocks */
  }, [getBlocks])

  return (
    <Main>
      <Header nBlocks={nBlocks} setNBlocks={setNBlocks} />
      <Charts />
    </Main>
  )
}
const mapDispatchToProps = dispatch => ({
  getBlocks: (nBlocks) => dispatch(actions.getBlocks(nBlocks)),
});

export default connect(null, mapDispatchToProps)(App);
