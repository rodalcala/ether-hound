import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, DropDown } from '@aragon/ui';

import actions from '../redux/actions';
import AboutModal from './AboutModal';

const Header = ({ nBlocks, setNBlocks }) => {
  const [opened, setOpened] = useState(false);
  const items = [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ];

  const handleDropDown = (value, item) => {
    setNBlocks(item[value])
  };

  return (
    <div className="Header-container">
      <Button mode="strong" size="small" onClick={ () => setOpened(true) }>
        <p>About</p>
      </Button>

      <AboutModal opened={ opened } setOpened={ setOpened } />

      <div className="Header-slider-container">
        <p>How many blocks would you like to fetch?</p>
        <DropDown items={ items } active={ nBlocks - 2 } onChange={ handleDropDown } />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  nBlocks: state.nBlocks,
})

const mapDispatchToProps = dispatch => ({
  setNBlocks: (nBlocks) => dispatch(actions.setNBlocks(nBlocks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
