import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DropDown, Table, TableRow, TableHeader, TableCell, Text, IdentityBadge, TransactionBadge } from '@aragon/ui';

const BlockDetails = ({ blocks, activeBlock, web3 }) => {
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

  const handleDropDown = (index) => setActiveTransactionIndex(index);
  console.log(ethTransactionsFromActiveBlock.length);
  console.log('Active transaction', ethTransactionsByHash[activeTransactionIndex]);

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
            <Text>To be checked</Text>
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
            <Text>To be checked</Text>
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
            <Text>To be determine</Text>
          </TableCell>
        </TableRow>
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  blocks: state.blocks,
  activeBlock: state.activeBlock,
  web3: state.web3,
});

export default connect(mapStateToProps)(BlockDetails);
