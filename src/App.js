/* ABOUT: Main component of this SPA. Handles blocks retrieval and loading status. */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Main, theme } from '@aragon/ui';
import { PropagateLoader } from 'react-spinners';

import './App.css';
import actions from './redux/actions';
import Header from './components/Header';
import BlockPicker from './components/BlockPicker';
import SeparationLine from './components/SeparationLine';
import TransactionPicker from './components/TransactionPicker';
import TransactionDetails from './components/TransactionDetails';
import Charts from './components/Charts';

const App = ({ getBlocks, isAppReady, nBlocks }) => {
  useEffect(() => {
    getBlocks(nBlocks)
  }, [getBlocks, nBlocks])

  if (isAppReady) {
    return (
      <Main className='main'>
        <Header />
        <BlockPicker />
        <TransactionPicker />
        <TransactionDetails />
        <SeparationLine />
        <Charts />
        <SeparationLine />
      </Main>
    )
  } else {
    return (
      <div className='loading'>
        <PropagateLoader size={ 20 } color={ theme.gradientEndActive } />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAppReady: state.isAppReady,
  nBlocks: state.nBlocks,
})

const mapDispatchToProps = (dispatch) => ({
  getBlocks: (nBlocks) => dispatch(actions.getBlocks(nBlocks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
