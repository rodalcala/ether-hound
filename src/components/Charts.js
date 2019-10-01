import React from 'react';
import { LineChart } from '@aragon/ui';

const Charts = ({ blocks }) => {
  console.log('blocks.length', blocks.length)
  let transactionsPerBlock;

  blocks.forEach(() => console.log('tuvieja'))

  console.log('transactionsPerBlock', transactionsPerBlock)

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

export default Charts;
