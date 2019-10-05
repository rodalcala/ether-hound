import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Main, theme } from '@aragon/ui';
import { PropagateLoader } from 'react-spinners';

import './App.css';
import actions from './redux/actions';
import Header from './components/Header';
import Charts from './components/Charts';

const App = ({ getBlocks, isAppReady }) => {
  const [nBlocks, setNBlocks] = useState(10);

  useEffect(() => {
    getBlocks(nBlocks)
  }, [getBlocks, nBlocks])

  if (isAppReady) {
    return (
      <Main className='main'>
        <Header nBlocks={ nBlocks } setNBlocks={ setNBlocks } />
        <Charts nBlocks={ nBlocks } />
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

const mapStateToProps = state => ({
  isAppReady: state.isAppReady
})

const mapDispatchToProps = dispatch => ({
  getBlocks: (nBlocks) => dispatch(actions.getBlocks(nBlocks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
