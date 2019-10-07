import Web3 from 'web3';
import {
  SET_NUMBER_OF_BLOCKS,
  GET_BLOCKS_PENDING,
  GET_BLOCKS_SUCCESS,
  SET_ACTIVE_BLOCK,
  SET_ACTIVE_TRANSACTION,
  GET_TRANSACTION_RECEIPT_PENDING,
  GET_TRANSACTION_RECEIPT_SUCCESS,
} from './constants';

const web3 = new Web3(Web3.givenProvider);

const initialState = {
  web3,
  nBlocks: 10,
  blocks: [],
  activeBlock: undefined,
  activeTransaction: undefined,
  activeTransactionReceipt: {},
  isAppReady: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NUMBER_OF_BLOCKS:
      return { ...state, nBlocks: action.nBlocks }
    case GET_BLOCKS_PENDING:
      return { ...state, isAppReady: false }
    case GET_BLOCKS_SUCCESS:
      return { ...state, blocks: action.response, isAppReady: true, activeBlock: action.response[0].number }
    case SET_ACTIVE_BLOCK:
      return { ...state, activeBlock: action.blockNumber }
    case SET_ACTIVE_TRANSACTION:
      return { ...state, activeTransaction: action.transaction }
    case GET_TRANSACTION_RECEIPT_PENDING:
      return { ...state, activeTransactionReceipt: {} }
    case GET_TRANSACTION_RECEIPT_SUCCESS:
      return { ...state, activeTransactionReceipt: action.response }
    default:
      return state;
  }
};

export default reducer;