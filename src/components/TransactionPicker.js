/* ABOUT: Component in charge of determining which is the current active transaction. */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DropDown, Text } from '@aragon/ui';

import actions from '../redux/actions';

const TransactionPicker = ({ blocks, activeBlock, setActiveTransaction }) => {
  const [ activeTransactionIndex, setActiveTransactionIndex ] = useState(0);
  
  const ethTransactionsFromActiveBlock = blocks
    /* NOTE: Filter the array of blocks to get an array of transactions (from the current block) */
    .filter((block) => block.number === activeBlock)[0].transactions
    /* NOTE: Filter transaction to get only the ones moving Ether */
    .filter((trans) => trans.value !== '0');
  const ethTransactionsByHash = ethTransactionsFromActiveBlock.map((trans) => trans.hash);
  const ethTransactionsBySlicedHash = ethTransactionsByHash.map((hash) => {
    const prefix = hash.slice(0, 12);
    const sufix = hash.slice(56);
    return `${prefix}...${sufix}`;
  });
  
  useEffect(() => {
    /* NOTE: Set the active transaction on start-up */
    setActiveTransaction(ethTransactionsFromActiveBlock[0]);
  }, [setActiveTransaction, ethTransactionsFromActiveBlock]);

  const handleDropDown = (index) => {
    setActiveTransactionIndex(index);
    setActiveTransaction(ethTransactionsFromActiveBlock[index]);
  }

  /* NOTE: Conditional rendering to display a note in case the current block has no Ether transactions */
  if (!ethTransactionsFromActiveBlock.length) {
    return (
      <div className="TransactionPicker-container">
        <Text size="xlarge" weight="bold">This block has no transactions moving Ether, try with another one!</Text>
      </div>
    );
  } else {
    return (
      <div className="TransactionPicker-container">
        <div className="TransactionPicker-transaction-selector">
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPicker);
