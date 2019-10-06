import React from 'react';
import { connect } from 'react-redux';
import { LineChart, Info, PartitionBar, Text, theme } from '@aragon/ui';

import SeparationLine from './SeparationLine';

const Charts = ({ blocks, nBlocks }) => {
  const emptyDataset = new Array(nBlocks).fill(0);

  const transactionsPerBlock = blocks.map((block) => block.transactions.length);
  const biggestBlockByTrans = Math.max(...transactionsPerBlock);
  const relativeTransactionsPerBlock = transactionsPerBlock.map((trans) => trans/biggestBlockByTrans);

  /* NOTE: Transform the array of blocks into an array of arrays of value per transaction */
  const weiPerTransaction = blocks.map((block) => block.transactions.map((trans) => trans.value));
  /* NOTE: Add all the values per transaction to have an array of wei transfered per block */
  const weiPerBlock = weiPerTransaction.map((block) => block.reduce((total, num) => parseInt(total) + parseInt(num), 0));
  const biggestBlockByWei = Math.max(...weiPerBlock);
  const relativeWeiPerBlock = weiPerBlock.map((trans) => trans/biggestBlockByWei);

  let transactionsWithEth = 0;
  let transactionsWithoutEth = 0;

  weiPerTransaction.forEach((block) => block.forEach((transValue) => {
    if (transValue === '0') transactionsWithoutEth++;
    else transactionsWithEth++
  }))

  const getPartitionBarData = () => {
    const totalTransactions = transactionsWithEth + transactionsWithoutEth;
    const data = [
      {
        name: 'Transactions sending ETH',
        percentage: transactionsWithEth / totalTransactions * 100,
      },
      {
        name: 'Transactions not sending ETH',
        percentage: transactionsWithoutEth / totalTransactions * 100,
      },
    ];

    return data;
  }

  return (
    <div>
      <Text size="xlarge" weight="bold" className="Charts-header">
        Here's a little overview information about the selected dataset:
      </Text>
      <div className='Charts-container'>
        <LineChart
          lines={[
            { id: 1, values: transactionsPerBlock.length ? relativeTransactionsPerBlock : emptyDataset, color: theme.gradientStartActive },
            { id: 2, values: weiPerBlock.length ? relativeWeiPerBlock : emptyDataset, color: theme.gradientEndActive }
          ]}
          springConfig={{ mass: 1, tension: 120, friction: 80 }}
          label={index => index + 1}
          width={1100}
          height={550}
        />
        <div className='Charts-info'>
          <Info background={ theme.gradientStartActive }><p className='Charts-info-white'>Relative amount of transactions per block in the dataset</p></Info>
          <Info background={ theme.gradientEndActive }><p>Relative amount of ETH moved per block in the dataset</p></Info>
        </div>
        <SeparationLine internal={true} />
        <PartitionBar data={ getPartitionBarData() } colors={[theme.accent, theme.disabled]} />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  blocks: state.blocks,
  nBlocks: state.nBlocks,
});

export default connect(mapStateToProps)(Charts);
