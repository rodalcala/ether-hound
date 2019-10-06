import {
  SET_NUMBER_OF_BLOCKS,
  GET_BLOCKS,
  SET_ACTIVE_BLOCK,
  GET_TRANSACTION_RECEIPT
} from './constants';

const setNBlocks = (nBlocks) => ({
  type: SET_NUMBER_OF_BLOCKS,
  nBlocks,
});

const setActiveBlock = (blockNumber) => ({
  type: SET_ACTIVE_BLOCK,
  blockNumber,
});

const getBlocks = (nBlocks) => ({
  type: GET_BLOCKS,
  triggerAsync: true,
  nBlocks,
});

const getTransactionReceipt = (transactionHash) => ({
  type: GET_TRANSACTION_RECEIPT,
  triggerAsync: true,
  transactionHash,
});

export default {
  setNBlocks,
  setActiveBlock,
  getBlocks,
  getTransactionReceipt,
};