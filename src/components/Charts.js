import React from 'react';
import { connect } from 'react-redux';
import { LineChart } from '@aragon/ui';

const Charts = ({ blocks }) => {
  const getTransactionsPerBlock = () => blocks.map((block) => block.transactions.length);

  console.log('getTransactionsPerBlock', getTransactionsPerBlock());

  return (
    <div className='Charts-container'>
      <LineChart
        lines={[[0.2, 0.3, 0.2], [0.1, 0.4, 0.5]]}
        springConfig={{ mass: 1, tension: 120, friction: 80 }}
        // label={index => index}
        height={90}
        color={() => `#21aae7`}
      />
    </div>
  );
}

const mapStateToProps = state => ({
  blocks: state.blocks,
});

export default connect(mapStateToProps)(Charts);
