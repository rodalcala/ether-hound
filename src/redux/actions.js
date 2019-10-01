import {
  GET_BLOCKS,
} from './constants';

const getBlocks = (nBlocks) => ({
  type: GET_BLOCKS,
  nBlocks,
});

export default {
  getBlocks,
};