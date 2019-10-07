/* ABOUT: Component displaying the current transaction details. */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, TableRow, TableHeader, TableCell, Text, IdentityBadge, TransactionBadge, Button } from '@aragon/ui';

import actions from '../redux/actions';

const TransactionDetails = ({ web3, getTransactionReceipt, activeTransaction, activeTransactionReceipt }) => {
  useEffect(() => {
    if (activeTransaction) getTransactionReceipt(activeTransaction.hash);
  },[getTransactionReceipt, activeTransaction]);

  if (!activeTransaction) return <Text>Transaction's details are loading...</Text>
  return (
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
  );
};

const mapStateToProps = (state) => ({
  web3: state.web3,
  activeTransaction: state.activeTransaction,
  activeTransactionReceipt: state.activeTransactionReceipt,
});

const mapDispatchToProps = dispatch => ({
  getTransactionReceipt: (transactionHash) => dispatch(actions.getTransactionReceipt(transactionHash)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetails);
