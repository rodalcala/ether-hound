import Web3 from 'web3';
import { SET_NUMBER_OF_BLOCKS, GET_BLOCKS_PENDING, GET_BLOCKS_SUCCESS } from './constants';

const web3 = new Web3(Web3.givenProvider || null /* TO-DO: add a fallback here */ );

const initialState = {
  web3,
  nBlocks: 10,
  blocks: [],
  activeBlock: undefined,
  isAppReady: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NUMBER_OF_BLOCKS:
      return { ...state, nBlocks: action.nBlocks }
    case GET_BLOCKS_PENDING:
      return { ...state, isAppReady: false }
    case GET_BLOCKS_SUCCESS:
      return { ...state, blocks: action.blocks, isAppReady: true }
    default:
      return state;
  }
};

export default reducer;