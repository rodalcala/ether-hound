import React, { useState } from 'react'
import { connect } from 'react-redux';
import { TabBar } from '@aragon/ui'

import actions from '../redux/actions';

const BlockPicker = ({ blocks, setActiveBlock }) => {
  const [selected, setSelected] = useState(0)
  const items = blocks.map((block) => block.number)

  const handleActiveBlockChange = (index) => {
    setSelected(index);
    setActiveBlock(items[index]);
  }

  return (
    <div className='BlockPicker-container'>
      <TabBar
        items={items}
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
