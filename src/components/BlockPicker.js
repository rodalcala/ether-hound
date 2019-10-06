import React, { useState } from 'react'
import { connect } from 'react-redux';
import { TabBar } from '@aragon/ui'

import actions from '../redux/actions';

const BlockPicker = ({ blocks, setActiveBlock }) => {
  const [selected, setSelected] = useState(0);
  const blockNumbers = blocks.map((block) => `#${block.number}`);

  const handleActiveBlockChange = (index) => {
    setSelected(index);
    setActiveBlock(blocks[index].number);
  }

  return (
    <div className='BlockPicker-container'>
      <TabBar
        items={blockNumbers}
        selected={selected}
        onChange={handleActiveBlockChange}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  blocks: state.blocks,
});

const mapDispatchToProps = dispatch => ({
  setActiveBlock: (blockNumber) => dispatch(actions.setActiveBlock(blockNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlockPicker);
