import React, { useEffect, useState } from 'react';
import { Main } from '@aragon/ui';
import Web3 from 'web3';

import './App.css';
import Header from './components/Header';
import Charts from './components/Charts';

const web3 = new Web3(Web3.givenProvider || null /* TO-DO: add a fallback here */ );

const App = () => {
  const [blocks, setBlocks] = useState([]);
  const [nBlocks, setNBlocks] = useState(10);

  useEffect(() => {
    (async (n) => {
      const latestBlock = await web3.eth.getBlockNumber();
      const allBlocks = [];

      const blockToRetrieve = [];
      for (let i = 0; i < n; i++) {
        blockToRetrieve.push(latestBlock - i);
      };

      const batch = new web3.eth.BatchRequest();
      blockToRetrieve.forEach(blockNumber => batch.add(
          web3.eth.getBlock.request(blockNumber, (_, block) => allBlocks.push(block))
      ));

      console.log('allBlocks', allBlocks.map((e) => console.log(e)))
      batch.execute()
      setBlocks(allBlocks);
    })(nBlocks);
  }, [setBlocks, nBlocks])

  console.log(blocks);

  return (
    <Main>
      <Header nBlocks={nBlocks} setNBlocks={setNBlocks} />
      <Charts blocks={blocks} />
    </Main>
  )
}

export default App;
