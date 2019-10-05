import Web3 from 'web3';
import { GET_BLOCKS_PENDING, GET_BLOCKS_SUCCESS } from './constants';

const web3 = new Web3(Web3.givenProvider || null /* TO-DO: add a fallback here */ );

const initialState = {
  web3,
  blocks: [],
  activeBlock: undefined,
  isAppReady: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOCKS_PENDING:
      return { ...state, isAppReady: false }
    case GET_BLOCKS_SUCCESS:
      return { ...state, blocks: action.blocks, isAppReady: true }
    default:
      return state;
  }
};

export default reducer;