import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DropDown, Text } from '@aragon/ui';

import actions from '../redux/actions';

const BlockDetails = ({ blocks, activeBlock, setActiveTransaction }) => {
  const [ activeTransactionIndex, setActiveTransactionIndex ] = useState(0);
  
  const ethTransactionsFromActiveBlock = blocks
  .filter((block) => block.number === activeBlock)[0].transactions
  .filter((trans) => trans.value !== '0');
  const ethTransactionsByHash = ethTransactionsFromActiveBlock.map((trans) => trans.hash);
  const ethTransactionsBySlicedHash = ethTransactionsByHash.map((hash) => {
    const prefix = hash.slice(0, 12);
    const sufix = hash.slice(56);
    return `${prefix}...${sufix}`;
  });
  
  useEffect(() => {
    setActiveTransaction(ethTransactionsFromActiveBlock[0]);
  }, [setActiveTransaction, ethTransactionsFromActiveBlock]);

  const handleDropDown = (index) => {
    setActiveTransactionIndex(index);
    setActiveTransaction(ethTransactionsFromActiveBlock[index]);
  }

  if (!ethTransactionsFromActiveBlock.length) {
    return (
      <div className="BlockDetails-container">
        <Text size="xlarge" weight="bold">This block has no transactions moving Ether, try with another one!</Text>
      </div>
    );
  } else {
    return (
      <div className="BlockDetails-container">
        <div className="BlockDetails-transaction-selector">
          <Text size="xlarge" weight="bold">
            The selected block (#{activeBlock}) has {ethTransactionsFromActiveBlock.length} transactions moving Ether. Let's inspect one:
          </Text>
          <DropDown items={ethTransactionsBySlicedHash} active={activeTransactionIndex} onChange={handleDropDown} />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  blocks: state.blocks,
  activeBlock: state.activeBlock,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveTransaction: (transaction) => dispatch(actions.setActiveTransaction(transaction)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlockDetails);
