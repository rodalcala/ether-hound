import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DropDown, Table, TableRow, TableHeader, TableCell, Text, IdentityBadge, TransactionBadge, Button } from '@aragon/ui';

import actions from '../redux/actions';

const BlockDetails = ({ blocks, activeBlock, web3, getTransactionReceipt, activeTransactionReceipt }) => {
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
  const activeTransaction = ethTransactionsFromActiveBlock[activeTransactionIndex];

  useEffect(() => {
    if (activeTransaction) {
      getTransactionReceipt(activeTransaction.hash)
    }
  },[getTransactionReceipt, activeTransaction]);

  const handleDropDown = (index) => setActiveTransactionIndex(index);

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
        <Table
          header={
            <TableRow>
              <TableHeader title="Transaction details" />
            </TableRow>
          }
        >
          <TableRow>
            <TableCell>
              <Text>Transaction hash:</Text>
            </TableCell>
            <TableCell>
              <TransactionBadge transaction={activeTransaction.hash} />
            </TableCell>
            <TableCell>
              <Text>Nonce:</Text>
            </TableCell>
            <TableCell>
              <Text>{activeTransaction.nonce}</Text>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text>Sender:</Text>
            </TableCell>
            <TableCell>
              <IdentityBadge entity={activeTransaction.from} />
            </TableCell>
            <TableCell>
              <Text>Reciever:</Text>
            </TableCell>
            <TableCell>
              <IdentityBadge entity={activeTransaction.to} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text>Transaction status:</Text>
            </TableCell>
            <TableCell>
              {
                  activeTransactionReceipt.gasUsed ?
                    activeTransactionReceipt.status ?
                      <Button emphasis="positive" size="small" disabled={true}>Success</Button> :
                      <Button emphasis="negative" size="small" disabled={true}>Reverted</Button> :
                    'Checking...'
                }
            </TableCell>
            <TableCell>
              <Text>Ether transfered:</Text>
            </TableCell>
            <TableCell>
              <Text>{web3.utils.fromWei(activeTransaction.value)}</Text>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text>Gas limit:</Text>
            </TableCell>
            <TableCell>
              <Text>{activeTransaction.gas}</Text>
            </TableCell>
            <TableCell>
              <Text>Gas used:</Text>
            </TableCell>
            <TableCell>
              <Text>
                {
                  activeTransactionReceipt.gasUsed ?
                    `${activeTransactionReceipt.gasUsed} (${activeTransactionReceipt.gasUsed/activeTransaction.gas*100}%)` :
                    'Checking...'
                }
              </Text>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Text>Gas price:</Text>
            </TableCell>
            <TableCell>
              <Text>{web3.utils.fromWei(activeTransaction.gasPrice, 'Gwei')} Gwei</Text>
            </TableCell>
            <TableCell>
              <Text>Transaction fee:</Text>
            </TableCell>
            <TableCell>
            <Text>
                {
                  activeTransactionReceipt.gasUsed ?
                    `${web3.utils.fromWei(activeTransaction.gasPrice) * activeTransactionReceipt.gasUsed} Ether` :
                    'Checking...'
                }
              </Text>
            </TableCell>
          </TableRow>
        </Table>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  blocks: state.blocks,
  activeBlock: state.activeBlock,
  web3: state.web3,
  activeTransactionReceipt: state.activeTransactionReceipt,
});

const mapDispatchToProps = dispatch => ({
  getTransactionReceipt: (transactionHash) => dispatch(actions.getTransactionReceipt(transactionHash)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlockDetails);
