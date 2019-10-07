import {
  SET_NUMBER_OF_BLOCKS,
  GET_BLOCKS,
  SET_ACTIVE_BLOCK,
  SET_ACTIVE_TRANSACTION,
  GET_TRANSACTION_RECEIPT
} from './constants';

const setNBlocks = (nBlocks) => ({
  type: SET_NUMBER_OF_BLOCKS,
  nBlocks,
});

const getBlocks = (nBlocks) => ({
  type: GET_BLOCKS,
  triggerAsync: true,
  nBlocks,
});

const setActiveBlock = (blockNumber) => ({
  type: SET_ACTIVE_BLOCK,
  blockNumber,
});

const setActiveTransaction = (transaction) => ({
  type: SET_ACTIVE_TRANSACTION,
  transaction,
})

const getTransactionReceipt = (transactionHash) => ({
  type: GET_TRANSACTION_RECEIPT,
  triggerAsync: true,
  transactionHash,
});

export default {
  setNBlocks,
  getBlocks,
  setActiveBlock,
  setActiveTransaction,
  getTransactionReceipt,
};