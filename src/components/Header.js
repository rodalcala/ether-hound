import React from 'react';
import { Slider } from '@aragon/ui'

const Header = ({ nBlocks, setNBlocks }) => {
  const handleSlider = (value) => {
    console.log(value * 10);
    setNBlocks(value);
  }

  return (
    <div className='Header-container'>
      <p>How many blocks would you like to fetch?</p>
      <Slider
        value={nBlocks}
        onUpdate={(value) => handleSlider(value)}
      />
    </div>
  );
}

export default Header;
