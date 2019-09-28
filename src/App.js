import React, { useEffect, useState } from 'react';
import './App.css';
import { Main } from '@aragon/ui';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || null /* TO-DO: add a fallback here */ );

const App = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const getNLatestBlocks = async (n) => {
      const latestBlock = await web3.eth.getBlockNumber();
      const nBlocks = [];

      const blockToRetrieve = [];
      for (let i = 0; i < n; i++) {
        blockToRetrieve.push(latestBlock - i);
      };

      const batch = new web3.eth.BatchRequest();

      blockToRetrieve.forEach(blockNumber => batch.add(
          web3.eth.getBlock.request(blockNumber, (_, block) => nBlocks.push(block))
      ));

      setBlocks(nBlocks);

      batch.execute()
    };
    getNLatestBlocks(10);

  }, [setBlocks])

  console.log(blocks);

  return <Main>{/* Your app goes here */}</Main>;
}

export default App;
