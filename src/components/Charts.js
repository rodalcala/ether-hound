import React from 'react';
import { connect } from 'react-redux';
import { LineChart, theme } from '@aragon/ui';

const Charts = ({ blocks, nBlocks }) => {
  const emptyDataset = new Array(nBlocks).fill(0);

  const transactionsPerBlock = blocks.map((block) => block.transactions.length);
  const biggestBlockByTrans = Math.max(...transactionsPerBlock);
  const relativeTransactionsPerBlock = transactionsPerBlock.map((trans) => trans/biggestBlockByTrans);

  const weiPerBlock = blocks
    /* NOTE: Transform the array of blocks into an array of arrays of value per transaction */
    .map((block) => block.transactions.map((trans) => trans.value))
    /* NOTE: Add all the values per transaction to have an array of wei transfered per block */
    .map((block) => block.reduce((total, num) => parseInt(total) + parseInt(num), 0));
  const biggestBlockByWei = Math.max(...weiPerBlock);
  const relativeWeiPerBlock = weiPerBlock.map((trans) => trans/biggestBlockByWei);


  return (
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
    </div>
  );
}

const mapStateToProps = state => ({
  blocks: state.blocks,
});

export default connect(mapStateToProps)(Charts);
