import {
  SET_NUMBER_OF_BLOCKS,
  GET_BLOCKS,
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

export default {
  setNBlocks,
  getBlocks,
};